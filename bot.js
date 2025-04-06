// bot.js
import TelegramBot from 'node-telegram-bot-api';
import axios from 'axios';
import sharp from 'sharp';
import { createClient } from '@supabase/supabase-js';

// Токен вашего бота
const TELEGRAM_BOT_TOKEN = '7795378511:AAGQ0PVNNM-Bl2eQnx1CguLKiJuXUL0ghsc';

// Создаем экземпляр бота
const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

// Настройка Supabase
const SUPABASE_URL = 'https://pgaypklckjbiozsgboil.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBnYXlwa2xja2piaW96c2dib2lsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3NzQ4ODksImV4cCI6MjA1OTM1MDg4OX0.t87SHdkWm9sot2L-fFi-WUULKRvx9S-GhoIHDquj-4o';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// URL вашего API
const API_URL = 'http://localhost:5000/api/add-news'; // Замените на реальный URL

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
  const text = msg.text; // Текст сообщения
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
    state.step = 'description';
    bot.sendMessage(chatId, 'Заголовок сохранён. Введите текст новости:');
  } else if (state.step === 'description') {
    // Сохраняем текст новости
    state.description = text;

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
        .from('news-images') // Убедитесь, что bucket существует
        .upload(fileName, imageBuffer, {
          contentType: 'image/jpeg',
        });

      if (error) {
        console.error('[ERROR] Failed to upload image to Supabase:', error.message);
        bot.sendMessage(chatId, 'Ошибка при загрузке изображения. Попробуйте снова.');
        return;
      }

      // Сохраняем публичную ссылку на изображение
      state.image = `${SUPABASE_URL}/storage/v1/object/public/news-images/${fileName}`;

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
  let previewText = `Заголовок: ${state.title}\n\nТекст: ${state.description}`;
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
      // Отправляем данные на сервер
      const response = await axios.post(API_URL, {
        title: state.title,
        description: state.description,
        image_url: state.image || null,
      });

      if (response.status === 201) {
        bot.sendMessage(chatId, 'Пост успешно опубликован!');
        clearPostState(chatId);
      } else {
        bot.sendMessage(chatId, 'Ошибка при публикации.');
      }
    } catch (err) {
      console.error('Ошибка при отправке запроса:', err.message);
      bot.sendMessage(chatId, 'Произошла ошибка при публикации.');
    }
  } else if (data === 'cancel') {
    clearPostState(chatId);
    bot.sendMessage(chatId, 'Создание поста отменено.');
  }
});