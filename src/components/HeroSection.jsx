import React from 'react';
import DynamicText from './DynamicText';
import '../styles/hero.css';

const HeroSection = () => {
  return (
    <div className="hero-section">
      {/* Фоновое видео */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="hero-video"
        onError={(e) => console.error('Ошибка загрузки видео:', e)}
      >
        <source src="/assets/output.webm" type="video/webm" />
        <source src="/assets/output.mp4" type="video/mp4" />
        Ваш браузер не поддерживает видео.
      </video>

      {/* Оверлей для затемнения видео */}
      <div className="hero-overlay"></div>

      {/* Текст поверх видео */}
      <div className="hero-content">
        <DynamicText />
      </div>
    </div>
  );
};

export default HeroSection;