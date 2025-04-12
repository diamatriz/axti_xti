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

// Инициализация бота
const bot = new Telegraf(process.env.BOT_TOKEN);

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

// Состояние бота
const botState = {
  awaitingTitle: false,
  awaitingText: false,
  awaitingImage: false,
  currentNews: null,
  currentStep: null
};

// Функция для форматирования новости
const formatNews = (news) => {
  return `📰 *${news.title}*\n\n${news.text}\n\n🕒 ${new Date(news.created_at).toLocaleString()}`;
};

// Функция для форматирования предпросмотра новости
const formatPreview = (news) => {
  let preview = `📰 *Предпросмотр новости*\n\n`;
  preview += `*Заголовок:* ${news.title || '❌ Не указан'}\n\n`;
  preview += `*Текст:* ${news.content || '❌ Не указан'}\n\n`;
  preview += `*Изображение:* ${news.image_url ? '✅ Добавлено' : '❌ Отсутствует'}\n\n`;
  preview += `_Используйте кнопки ниже для навигации_`;
  return preview;
};

// Функция для создания клавиатуры предпросмотра
const createPreviewKeyboard = (news) => {
  return {
    reply_markup: {
      inline_keyboard: [
        [
          { text: '✏️ Заголовок', callback_data: 'edit_title' },
          { text: '✏️ Текст', callback_data: 'edit_content' }
        ],
        [
          { text: '✏️ Изображение', callback_data: 'edit_image' }
        ],
        [
          { text: '✅ Опубликовать', callback_data: 'publish' }
        ]
      ]
    }
  };
};

// Функция для получения списка новостей
const getNewsList = async () => {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Ошибка при получении новостей:', error);
    return null;
  }
  return data;
};

// Функция для удаления новости
const deleteNews = async (newsId) => {
  const { error } = await supabase
    .from('news')
    .delete()
    .eq('id', newsId);

  if (error) {
    console.error('Ошибка при удалении новости:', error);
    return false;
  }
  return true;
};

// Функция для создания клавиатуры навигации
const createNavigationKeyboard = (step) => {
  const keyboard = {
    reply_markup: {
      inline_keyboard: []
    }
  };

  switch (step) {
    case 'title':
      keyboard.reply_markup.inline_keyboard.push([
        { text: '➡️ Далее', callback_data: 'next_step' }
      ]);
      break;
    case 'content':
      keyboard.reply_markup.inline_keyboard.push([
        { text: '⬅️ Назад', callback_data: 'prev_step' },
        { text: '➡️ Далее', callback_data: 'next_step' }
      ]);
      break;
    case 'image':
      keyboard.reply_markup.inline_keyboard.push([
        { text: '⬅️ Назад', callback_data: 'prev_step' },
        { text: '➡️ Пропустить', callback_data: 'skip_image' }
      ]);
      break;
    case 'preview':
      keyboard.reply_markup.inline_keyboard.push([
        { text: '⬅️ Назад', callback_data: 'prev_step' },
        { text: '✅ Опубликовать', callback_data: 'publish' }
      ]);
      break;
  }

  return keyboard;
};

// Обработчик команды /start
bot.command('start', async (ctx) => {
  const keyboard = {
    reply_markup: {
      keyboard: [
        ['📝 Добавить новость'],
        ['📋 Список новостей'],
        ['❌ Удалить новость']
      ],
      resize_keyboard: true
    }
  };

  await ctx.reply(
    '👋 Добро пожаловать в панель управления новостями!\n\n' +
    'Выберите действие:',
    keyboard
  );
});

// Обработчик кнопки "Добавить новость"
bot.hears('📝 Добавить новость', (ctx) => {
  botState.currentNews = {};
  botState.currentStep = 'title';
  botState.awaitingTitle = true;
  
  const keyboard = createNavigationKeyboard('title');
  ctx.reply('Введите заголовок новости:', keyboard);
});

// Обработчик кнопки "Список новостей"
bot.hears('📋 Список новостей', async (ctx) => {
  const newsList = await getNewsList();
  
  if (!newsList || newsList.length === 0) {
    return ctx.reply('Новостей пока нет.');
  }

  // Отправляем первую новость
  const firstNews = newsList[0];
  const keyboard = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: '⬅️ Предыдущая', callback_data: 'prev_news' },
          { text: '➡️ Следующая', callback_data: 'next_news' }
        ],
        [
          { text: '❌ Удалить', callback_data: `delete_${firstNews.id}` }
        ]
      ]
    }
  };

  await ctx.replyWithMarkdown(formatNews(firstNews), keyboard);
  botState.currentNewsIndex = 0;
  botState.newsList = newsList;
});

// Обработчик кнопки "Удалить новость"
bot.hears('❌ Удалить новость', async (ctx) => {
  const newsList = await getNewsList();
  
  if (!newsList || newsList.length === 0) {
    return ctx.reply('Новостей пока нет.');
  }

  const keyboard = {
    reply_markup: {
      inline_keyboard: newsList.map(news => [
        { text: news.title, callback_data: `delete_${news.id}` }
      ])
    }
  };

  await ctx.reply('Выберите новость для удаления:', keyboard);
});

// Обработчик текстовых сообщений
bot.on('text', async (ctx) => {
  if (botState.awaitingTitle) {
    if (botState.currentStep === 'edit_title') {
      botState.currentNews.title = ctx.message.text;
      const preview = formatPreview(botState.currentNews);
      const keyboard = createPreviewKeyboard(botState.currentNews);
      await ctx.replyWithMarkdown(preview, keyboard);
    } else {
      botState.currentNews.title = ctx.message.text;
      botState.awaitingTitle = false;
      botState.awaitingText = true;
      botState.currentStep = 'content';
      const keyboard = createNavigationKeyboard('content');
      ctx.reply('Введите текст новости:', keyboard);
    }
  } else if (botState.awaitingText) {
    if (botState.currentStep === 'edit_content') {
      botState.currentNews.content = ctx.message.text;
      const preview = formatPreview(botState.currentNews);
      const keyboard = createPreviewKeyboard(botState.currentNews);
      await ctx.replyWithMarkdown(preview, keyboard);
    } else {
      botState.currentNews.content = ctx.message.text;
      botState.awaitingText = false;
      botState.awaitingImage = true;
      botState.currentStep = 'image';
      const keyboard = createNavigationKeyboard('image');
      ctx.reply('Отправьте изображение для новости:', keyboard);
    }
  }
});

// Обработчик изображений
bot.on('photo', async (ctx) => {
  if (botState.awaitingImage) {
    const photo = ctx.message.photo[ctx.message.photo.length - 1];
    const file = await ctx.telegram.getFile(photo.file_id);
    const fileUrl = `https://api.telegram.org/file/bot${process.env.BOT_TOKEN}/${file.file_path}`;
    
    botState.currentNews.image_url = fileUrl;
    
    if (botState.currentStep === 'edit_image') {
      const preview = formatPreview(botState.currentNews);
      const keyboard = createPreviewKeyboard(botState.currentNews);
      await ctx.replyWithMarkdown(preview, keyboard);
    } else {
      botState.awaitingImage = false;
      botState.currentStep = 'preview';
      const preview = formatPreview(botState.currentNews);
      const keyboard = createPreviewKeyboard(botState.currentNews);
      await ctx.replyWithMarkdown(preview, keyboard);
    }
  }
});

// Обработчик команды /skip
bot.command('skip', async (ctx) => {
  if (botState.awaitingImage) {
    await saveNews(ctx);
  }
});

// Обработчик callback-запросов
bot.on('callback_query', async (ctx) => {
  const data = ctx.callbackQuery.data;
  
  if (data === 'next_news' || data === 'prev_news') {
    const newsList = botState.newsList;
    if (!newsList) return;

    if (data === 'prev_news') {
      botState.currentNewsIndex = (botState.currentNewsIndex - 1 + newsList.length) % newsList.length;
    } else {
      botState.currentNewsIndex = (botState.currentNewsIndex + 1) % newsList.length;
    }

    const currentNews = newsList[botState.currentNewsIndex];
  const keyboard = {
    reply_markup: {
      inline_keyboard: [
          [
            { text: '⬅️ Предыдущая', callback_data: 'prev_news' },
            { text: '➡️ Следующая', callback_data: 'next_news' }
          ],
          [
            { text: '❌ Удалить', callback_data: `delete_${currentNews.id}` }
          ]
        ]
      }
    };

    await ctx.editMessageText(formatNews(currentNews), { ...keyboard, parse_mode: 'Markdown' });
    await ctx.answerCbQuery();
  } else if (data.startsWith('delete_')) {
    const newsId = data.split('_')[1];
    const success = await deleteNews(newsId);
    
    if (success) {
      await ctx.answerCbQuery('Новость успешно удалена!');
      await ctx.deleteMessage();
    } else {
      await ctx.answerCbQuery('Ошибка при удалении новости');
    }
  } else if (data === 'edit_title') {
    botState.currentStep = 'edit_title';
    botState.awaitingTitle = true;
    await ctx.editMessageText('Введите новый заголовок:');
  } else if (data === 'edit_content') {
    botState.currentStep = 'edit_content';
    botState.awaitingText = true;
    await ctx.editMessageText('Введите новый текст:');
  } else if (data === 'edit_image') {
    botState.currentStep = 'edit_image';
    botState.awaitingImage = true;
    await ctx.editMessageText('Отправьте новое изображение:');
  } else if (data === 'publish') {
    await saveNews(ctx);
  }
  
  await ctx.answerCbQuery();
});

// Функция сохранения новости
const saveNews = async (ctx) => {
  const { title, content, image_url } = botState.currentNews;
  
      const { data, error } = await supabase
        .from('news')
    .insert([{ title, content, image_url }]);

  if (error) {
    console.error('Ошибка при сохранении новости:', error);
    ctx.reply('Произошла ошибка при сохранении новости');
        } else {
    ctx.reply('Новость успешно добавлена!');
  }

  // Сброс состояния
  botState.awaitingImage = false;
  botState.currentNews = null;
};

// Запуск бота
bot.launch().then(() => {
  console.log('Бот запущен');
}).catch((error) => {
  console.error('Ошибка при запуске бота:', error);
});

// Обработка завершения работы
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

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