// server.js
import express from 'express';
import { createClient } from '@supabase/supabase-js';

const app = express();
const PORT = 5000;

// Middleware для парсинга JSON
app.use(express.json());

// Настройка Supabase
const SUPABASE_URL = 'https://pgaypklckjbiozsgboil.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBnYXlwa2xja2piaW96c2dib2lsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3NzQ4ODksImV4cCI6MjA1OTM1MDg4OX0.t87SHdkWm9sot2L-fFi-WUULKRvx9S-GhoIHDquj-4o';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Корневой маршрут
app.get('/', (req, res) => {
  res.send('Добро пожаловать на сервер новостей!');
});

// Эндпоинт для добавления новости
app.post('/api/add-news', async (req, res) => {
  const { title, description, link, image_url } = req.body;

  if (!title || !description) {
    console.error('Некорректные данные:', req.body);
    return res.status(400).json({ error: 'Необходимо указать заголовок и описание' });
  }

  try {
    console.log('Попытка добавить новость:', { title, description, link, image_url });

    const { data, error } = await supabase
      .from('news')
      .insert([{ title, description, link, image_url }])
      .select();

    if (error) {
      console.error('Ошибка Supabase:', error.message);
      throw error;
    }

    console.log('Новость успешно добавлена:', data);
    res.status(201).json({ message: 'Новость успешно добавлена', data });
  } catch (err) {
    console.error('Ошибка при добавлении новости:', err.message);
    res.status(500).json({ error: 'Ошибка при добавлении новости', details: err.message });
  }
});

// Эндпоинт для обновления новости (добавление изображения)
app.put('/api/add-news/:id', async (req, res) => {
  const { id } = req.params;
  const { image_url } = req.body;

  if (!image_url) {
    return res.status(400).json({ error: 'Необходимо указать URL изображения' });
  }

  try {
    const { data, error } = await supabase
      .from('news')
      .update({ image_url })
      .eq('id', id)
      .select();

    if (error) {
      console.error('Ошибка Supabase:', error.message);
      throw error;
    }

    console.log('Изображение успешно добавлено:', data);
    res.status(200).json({ message: 'Изображение успешно добавлено', data });
  } catch (err) {
    console.error('Ошибка при обновлении новости:', err.message);
    res.status(500).json({ error: 'Ошибка при обновлении новости', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});