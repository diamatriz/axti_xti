import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/homeButton.css';

const HomeButton = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  // Проверяем, находится ли пользователь на домашней странице
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    if (!isHomePage) {
      setIsVisible(true); // Показываем кнопку с задержкой для анимации
    } else {
      setIsVisible(false);
    }
  }, [isHomePage]);

  if (isHomePage) return null;

  return (
    <button
      className={`home-button ${isVisible ? 'show' : ''}`}
      onClick={() => navigate('/')}
      aria-label="Перейти на главную страницу"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="home-icon"
      >
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </svg>
    </button>
  );
};

export default HomeButton;