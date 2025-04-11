-- Удаляем старую таблицу
DROP TABLE IF EXISTS news;

-- Создаем новую таблицу
CREATE TABLE news (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Создаем индексы
CREATE INDEX idx_news_created_at ON news(created_at);

-- Настраиваем политики доступа
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

-- Политика для чтения (все могут читать)
CREATE POLICY "Enable read access for all users" ON news
  FOR SELECT USING (true);

-- Политика для вставки (только аутентифицированные пользователи)
CREATE POLICY "Enable insert for authenticated users only" ON news
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Политика для обновления (только аутентифицированные пользователи)
CREATE POLICY "Enable update for authenticated users only" ON news
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Политика для удаления (только аутентифицированные пользователи)
CREATE POLICY "Enable delete for authenticated users only" ON news
  FOR DELETE USING (auth.role() = 'authenticated'); 