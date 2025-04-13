// src/pages/News.jsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import Comments from '../components/Comments';
import '../styles/news.css';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedNews, setSelectedNews] = useState(null);
  const [commentCounts, setCommentCounts] = useState({});

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

        // Получаем количество комментариев для каждой новости
        const { data: commentsData, error: commentsError } = await supabase
          .from('comments')
          .select('news_id, count')
          .select('news_id');

        if (!commentsError) {
          const counts = commentsData.reduce((acc, comment) => {
            acc[comment.news_id] = (acc[comment.news_id] || 0) + 1;
            return acc;
          }, {});
          setCommentCounts(counts);
        }
      }
    } catch (err) {
      console.error('Ошибка при загрузке новостей:', err);
      setError(err.message);
    } finally {
      setLoading(false);
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
            onClick={() => setSelectedNews(item)}
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
              <div className="news-footer">
                <span className="news-date">
                  {new Date(item.created_at).toLocaleDateString()}
                </span>
                <span className="comment-count">
                  💬 {commentCounts[item.id] || 0}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
      {selectedNews && (
        <div className="news-modal" onClick={() => setSelectedNews(null)}>
          <div className="news-modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedNews.title}</h2>
            <p>{selectedNews.content}</p>
            <Comments newsId={selectedNews.id} />
            <button
              className="close-modal"
              onClick={() => setSelectedNews(null)}
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default News;