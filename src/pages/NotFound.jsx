// src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/notfound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1>404</h1>
      <h2>Страница не найдена</h2>
      <p>Извините, запрашиваемая страница не существует.</p>
      <Link to="/" className="home-link">
        Вернуться на главную
      </Link>
    </div>
  );
};

export default NotFound;