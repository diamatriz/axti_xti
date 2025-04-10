// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';
import bot from './bot.js';

// Загружаем переменные окружения из .env
dotenv.config();

// Проверяем наличие необходимых переменных окружения
const requiredEnvVars = ['SUPABASE_URL', 'SUPABASE_KEY', 'PORT', 'TELEGRAM_BOT_TOKEN', 'TELEGRAM_CHAT_ID'];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`Отсутствует необходимая переменная окружения: ${envVar}`);
    process.exit(1);
  }
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from dist directory
app.use(express.static(join(__dirname, 'dist')));

// Настройка Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Маршрут для вебхуков
app.post('/api/webhook', (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Корневой маршрут
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

// Эндпоинт для получения новостей
app.get('/api/news', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Ошибка при получении новостей:', error);
    res.status(500).json({ error: 'Ошибка при получении новостей' });
  }
});

// Эндпоинт для добавления новости через бота
app.post('/api', async (req, res) => {
  try {
    const { title, description, image_url } = req.body;
    
    if (!title || !description) {
      return res.status(400).json({ error: 'Заголовок и описание обязательны' });
    }

    const { data, error } = await supabase
      .from('news')
      .insert([{ 
        title, 
        description,
        image_url 
      }])
      .select();

    if (error) throw error;

    // Отправляем уведомление в Telegram
    try {
      const chatId = process.env.TELEGRAM_CHAT_ID;
      
      if (!chatId) {
        console.error('TELEGRAM_CHAT_ID не установлен');
        return;
      }

      if (isNaN(chatId)) {
        console.error('TELEGRAM_CHAT_ID должен быть числом');
        return;
      }

      try {
        await bot.sendMessage(
          chatId,
          `📢 Новая новость!\n\n${title}\n\n${description}`
        );
      } catch (telegramError) {
        if (telegramError.response?.body?.parameters?.migrate_to_chat_id) {
          const newChatId = telegramError.response.body.parameters.migrate_to_chat_id;
          console.log(`Группа была преобразована в супергруппу. Новый chat_id: ${newChatId}`);
          process.env.TELEGRAM_CHAT_ID = newChatId;
          await bot.sendMessage(
            newChatId,
            `📢 Новая новость!\n\n${title}\n\n${description}`
          );
        } else {
          console.error('Ошибка при отправке в Telegram:', telegramError);
        }
      }
    } catch (telegramError) {
      console.error('Ошибка при отправке в Telegram:', telegramError);
    }

    res.json(data[0]);
  } catch (error) {
    console.error('Ошибка при добавлении новости:', error);
    res.status(500).json({ error: 'Ошибка при добавлении новости' });
  }
});

// Эндпоинт для обновления новости
app.put('/api/news/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { image_url } = req.body;

    if (!image_url) {
      return res.status(400).json({ error: 'URL изображения обязателен' });
    }

    const { data, error } = await supabase
      .from('news')
      .update({ image_url })
      .eq('id', id)
      .select();

    if (error) throw error;

    res.json(data[0]);
  } catch (error) {
    console.error('Ошибка при обновлении новости:', error);
    res.status(500).json({ error: 'Ошибка при обновлении новости' });
  }
});

// Handle client-side routing
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Что-то пошло не так!' });
});

// Запускаем сервер локально только в режиме разработки
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
  });
}

// Экспортируем сервер для Vercel
export default app;