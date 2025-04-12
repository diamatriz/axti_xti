// src/pages/News.jsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import '../styles/news.css';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedNews, setSelectedNews] = useState(null);

  useEffect(() => {
    console.log('Компонент News монтируется');
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      console.log('Начинаем загрузку новостей...');
      console.log('Supabase клиент:', supabase);
      
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false });

      console.log('Результат запроса:', { data, error });
      console.log('Первая новость:', data?.[0]);

      if (error) {
        console.error('Ошибка при загрузке новостей:', error);
        setError(error.message);
      } else {
        console.log('Получено новостей:', data.length);
        setNews(data);
      }
    } catch (err) {
      console.error('Ошибка при загрузке новостей:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNewsClick = (newsItem) => {
    setSelectedNews(newsItem);
  };

  const handleCloseModal = () => {
    setSelectedNews(null);
  };

  const handleDownloadImage = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `news-image-${Date.now()}.jpg`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Ошибка при скачивании изображения:', err);
    }
  };

  if (loading) return <div className="loading">Загрузка новостей...</div>;
  if (error) return <div className="error">Ошибка: {error}</div>;
  if (!news.length) return <div className="error">Новостей пока нет</div>;

  return (
    <section className="news-section">
      <div className="news-background"></div>
      <div className="news-grid">
        {news.map((item) => (
          <article 
            key={item.id} 
            className="news-card"
            onClick={() => handleNewsClick(item)}
          >
            {item.image_url && (
              <img 
                src={item.image_url} 
                alt={item.title} 
                className="news-image"
                onError={(e) => {
                  console.error('Ошибка загрузки изображения:', e);
                  e.target.style.display = 'none';
                }}
              />
            )}
            <div className="news-content">
              <h2 className="news-item-title">{item.title}</h2>
              <p className="news-item-text">{item.content}</p>
              <div className="news-date">
                {new Date(item.created_at).toLocaleDateString()}
              </div>
            </div>
          </article>
        ))}
      </div>

      {selectedNews && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={handleCloseModal}>×</button>
            {selectedNews.image_url && (
              <>
                <img 
                  src={selectedNews.image_url} 
                  alt={selectedNews.title} 
                  className="modal-image"
                />
                <button 
                  className="download-button"
                  onClick={() => handleDownloadImage(selectedNews.image_url)}
                >
                  Скачать изображение
                </button>
              </>
            )}
            <h2 className="modal-title">{selectedNews.title}</h2>
            <p className="modal-text">{selectedNews.content}</p>
            <div className="modal-date">
              {new Date(selectedNews.created_at).toLocaleDateString()}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default News;