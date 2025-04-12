// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

console.log('Инициализация Supabase клиента...');
console.log('URL:', supabaseUrl);
console.log('Key:', supabaseKey ? '***' : 'отсутствует');

if (!supabaseUrl || !supabaseKey) {
  console.error('Ошибка: отсутствуют необходимые переменные окружения');
  throw new Error('Необходимо указать VITE_SUPABASE_URL и VITE_SUPABASE_KEY в .env файле');
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Проверяем подключение
supabase
  .from('news')
  .select('*', { count: 'exact', head: true })
  .then(({ count, error }) => {
    if (error) {
      console.error('Ошибка при проверке подключения:', error);
    } else {
      console.log('Подключение к Supabase успешно установлено');
      console.log(`В таблице news найдено ${count} записей`);
    }
  })
  .catch(error => {
    console.error('Ошибка при проверке подключения:', error);
  });