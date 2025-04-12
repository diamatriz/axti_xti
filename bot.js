// bot.js
import TelegramBot from 'node-telegram-bot-api';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import axios from 'axios';
import sharp from 'sharp';
import express from 'express';
import cors from 'cors';
import { Telegraf } from 'telegraf';

// Загружаем переменные окружения из .env файла
dotenv.config();

// Проверяем наличие необходимых переменных окружения
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
  console.error('Ошибка: SUPABASE_URL и SUPABASE_KEY должны быть определены в .env файле');
  process.exit(1);
}

// Инициализация бота в режиме long polling
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

// Инициализация Supabase клиента
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false
    }
  }
);

// Хранилище состояний
const postStates = {};

// Функция для получения состояния
function getPostState(chatId) {
  if (!postStates[chatId]) {
    postStates[chatId] = {};
  }
  return postStates[chatId];
}

// Функция для очистки состояния
function clearPostState(chatId) {
  delete postStates[chatId];
}

// Обработчик команды /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Добро пожаловать! Введите команду /create_post, чтобы создать новость.');
});

// Обработчик команды /create_post
bot.onText(/\/create_post/, (msg) => {
  const chatId = msg.chat.id;
  
  // Очищаем старое состояние
  clearPostState(chatId);
  
  // Запрашиваем заголовок
  const state = getPostState(chatId);
  state.step = 'title';
  bot.sendMessage(chatId, 'Введите заголовок новости:');
});

// Обработчик текстовых сообщений
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  const state = getPostState(chatId);

  if (!state.step) {
    bot.sendMessage(chatId, 'Нажмите /create_post, чтобы создать новость.');
    return;
  }

  // Проверяем, что сообщение содержит текст
  if (!text && state.step !== 'image') {
    bot.sendMessage(chatId, 'Пожалуйста, отправьте текстовое сообщение.');
    return;
  }

  if (state.step === 'title') {
    // Сохраняем заголовок
    state.title = text;

    // Переходим к следующему шагу
    state.step = 'content';
    bot.sendMessage(chatId, 'Заголовок сохранён. Введите текст новости:');
  } else if (state.step === 'content') {
    // Сохраняем текст новости
    state.content = text;

    // Запрашиваем изображение
    state.step = 'image';
    bot.sendMessage(chatId, 'Текст сохранён. Отправьте изображение для поста или напишите "пропустить".');
  } else if (state.step === 'image') {
    if (text && text.toLowerCase() === 'пропустить') {
      state.image = null; // Пропускаем изображение
      showPreview(chatId, state);
    } else {
      bot.sendMessage(chatId, 'Пожалуйста, отправьте изображение или напишите "пропустить".');
    }
  }
});

// Обработка изображений
bot.on('photo', async (msg) => {
  const chatId = msg.chat.id;
  const state = getPostState(chatId);

  if (state.step === 'image') {
    try {
      // Получаем самое качественное фото
      const photoFileId = msg.photo[msg.photo.length - 1].file_id;

      // Скачиваем файл с Telegram
      const fileLink = await bot.getFileLink(photoFileId);
      const response = await axios.get(fileLink, { responseType: 'arraybuffer' });
      const imageBuffer = response.data;

      // Генерируем уникальное имя файла
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.jpg`;

      // Загружаем файл в Supabase
      const { data, error } = await supabase.storage
        .from('news-images')
        .upload(fileName, imageBuffer, {
          contentType: 'image/jpeg',
        });

      if (error) {
        console.error('[ERROR] Failed to upload image to Supabase:', error.message);
        bot.sendMessage(chatId, 'Ошибка при загрузке изображения. Попробуйте снова.');
        return;
      }

      // Сохраняем публичную ссылку на изображение
      state.image = `${process.env.SUPABASE_URL}/storage/v1/object/public/news-images/${fileName}`;

      // Показываем предпросмотр
      showPreview(chatId, state);
    } catch (err) {
      console.error('[ERROR] Failed to process image:', err.message);
      bot.sendMessage(chatId, 'Произошла ошибка при обработке изображения.');
    }
  }
});

// Функция для показа предпросмотра
async function showPreview(chatId, state) {
  let previewText = `Заголовок: ${state.title}\n\nТекст: ${state.content}`;
  if (state.image) {
    previewText += '\n\nИзображение: ✅';
  } else {
    previewText += '\n\nИзображение: ❌ (пропущено)';
  }

  // Добавляем кнопки для подтверждения
  const keyboard = {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Опубликовать', callback_data: 'publish' }],
        [{ text: 'Отменить', callback_data: 'cancel' }],
      ],
    },
  };

  bot.sendMessage(chatId, previewText, keyboard);
}

// Обработчик нажатия кнопок
bot.on('callback_query', async (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;
  const state = getPostState(chatId);

  if (data === 'publish') {
    try {
      // Добавляем новость в базу данных
      const { data, error } = await supabase
        .from('news')
        .insert([{ 
          title: state.title,
          content: state.content,
          image_url: state.image || null,
          created_at: new Date().toISOString()
        }])
        .select();

      if (error) throw error;

      // Отправляем сообщение в группу
      try {
        const groupChatId = process.env.TELEGRAM_CHAT_ID;
        let message = `📢 Новая новость!\n\n${state.title}\n\n${state.content}`;
        
        if (state.image) {
          await bot.sendPhoto(groupChatId, state.image, { caption: message });
        } else {
          await bot.sendMessage(groupChatId, message);
        }
      } catch (telegramError) {
        if (telegramError.response?.body?.parameters?.migrate_to_chat_id) {
          // Обновляем chat_id в переменных окружения
          const newChatId = telegramError.response.body.parameters.migrate_to_chat_id;
          console.log(`Группа была преобразована в супергруппу. Новый chat_id: ${newChatId}`);
          process.env.TELEGRAM_CHAT_ID = newChatId;
          
          // Повторяем отправку с новым chat_id
          let message = `📢 Новая новость!\n\n${state.title}\n\n${state.content}`;
          if (state.image) {
            await bot.sendPhoto(newChatId, state.image, { caption: message });
          } else {
            await bot.sendMessage(newChatId, message);
          }
        } else {
          console.error('Ошибка при отправке в Telegram:', telegramError);
        }
      }

      bot.sendMessage(chatId, 'Новость успешно опубликована!');
      clearPostState(chatId);
    } catch (err) {
      console.error('Ошибка при публикации:', err.message);
      bot.sendMessage(chatId, 'Произошла ошибка при публикации.');
    }
  } else if (data === 'cancel') {
    clearPostState(chatId);
    bot.sendMessage(chatId, 'Создание поста отменено.');
  }
});

// Инициализация Express
const app = express();
app.use(cors());
app.use(express.json());

// Middleware для установки заголовков
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

// API для получения новостей
app.get('/api/news', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: 'Database error' });
    }

    if (!data) {
      return res.status(200).json([]);
    }

    // Преобразуем данные в нужный формат
    const formattedData = data.map(item => ({
      id: item.id,
      title: item.title || '',
      content: item.content || '',
      image_url: item.image_url || null,
      created_at: item.created_at || new Date().toISOString()
    }));

    res.json(formattedData);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`API сервер запущен на порту ${PORT}`);
});

// Экспортируем бота
export default bot;

// Функция для публикации новости
async function publishNews(chatId, state) {
  try {
    // Публикуем новость
    const { data, error } = await supabase
      .from('news')
      .insert([{
        title: state.title,
        content: state.content,
        image_url: state.image,
        created_at: new Date().toISOString()
      }])
      .select();

    if (error) throw error;

    // Отправляем сообщение в группу
    const groupChatId = process.env.TELEGRAM_CHAT_ID;
    let message = `📢 Новая новость!\n\n${state.title}\n\n${state.content}`;
    
    if (state.image) {
      await bot.sendPhoto(groupChatId, state.image, { caption: message });
    } else {
      await bot.sendMessage(groupChatId, message);
    }

    bot.sendMessage(chatId, 'Новость успешно опубликована!');
    clearPostState(chatId);
  } catch (err) {
    console.error('Ошибка при публикации:', err);
    bot.sendMessage(chatId, 'Произошла ошибка при публикации. Попробуйте позже.');
  }
}