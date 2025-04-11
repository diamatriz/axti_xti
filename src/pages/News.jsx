// src/pages/News.jsx
import React, { useEffect, useState } from 'react';
import '../styles/news.css';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/news');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setNews(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <div className="loading">Загрузка новостей...</div>;
  if (error) return <div className="error">Ошибка: {error}</div>;

  return (
    <section className="news-section">
      <div className="news-background"></div>
      <div className="news-container">
        <h1 className="news-title">Новости</h1>
        <div className="news-grid">
          {news.map((item) => (
            <div key={item.id} className="news-card">
              {item.image_url && (
                <img src={item.image_url} alt={item.title} className="news-image" />
              )}
              <div className="news-content">
                <h2 className="news-item-title">{item.title}</h2>
                <p className="news-item-text">{item.content}</p>
                <div className="news-date">
                  {new Date(item.created_at).toLocaleDateString('ru-RU', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default News;