// src/pages/News.jsx
import React, { useEffect, useState } from 'react';
import '../styles/news.css';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Загрузка новостей из Supabase
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('https://pgaypklckjbiozsgboil.supabase.co/rest/v1/news?select=*', {
          headers: {
            apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBnYXlwa2xja2piaW96c2dib2lsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3NzQ4ODksImV4cCI6MjA1OTM1MDg4OX0.t87SHdkWm9sot2L-fFi-WUULKRvx9S-GhoIHDquj-4o',
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBnYXlwa2xja2piaW96c2dib2lsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3NzQ4ODksImV4cCI6MjA1OTM1MDg4OX0.t87SHdkWm9sot2L-fFi-WUULKRvx9S-GhoIHDquj-4o`,
          },
        });
        if (!response.ok) throw new Error('Ошибка при загрузке новостей');

        const data = await response.json();
        setNews(data.reverse()); // Отображаем новости в обратном порядке (новые сверху)
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <div className="news-page">
      <h1>Лента новостей</h1>
      <div className="news-feed">
        {news.length === 0 ? (
          <p>Нет новостей.</p>
        ) : (
          news.map((item) => (
            <div key={item.id} className="news-item">
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              {item.link && (
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="news-link">
                  Подробнее
                </a>
              )}
              {item.image_url && (
                <img src={item.image_url} alt={item.title} className="news-image" />
              )}
              <small>{new Date(item.created_at).toLocaleDateString()}</small>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default News;