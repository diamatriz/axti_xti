// src/pages/Video.jsx
import React, { useState } from 'react';
import '../styles/video.css'; // Подключаем стили

const Video = () => {
  const videos = [
    {
      title: 'начало этого трека (2020)',
      iframe: (
        <iframe
          width="720"
          height="405"
          src="https://rutube.ru/play/embed/7f7abc5d2486560f65172c1e56ef474b"
          frameBorder="0"
          allow="clipboard-write; autoplay"
          webkitAllowFullScreen
          mozallowfullscreen
          allowFullScreen
        ></iframe>
      ),
    },
    {
      title: 'znak nalitso (2021)',
      iframe: (
        <iframe
          width="720"
          height="405"
          src="https://rutube.ru/play/embed/318be46e1a94710890afa4a2f4b4ac2c"
          frameBorder="0"
          allow="clipboard-write; autoplay"
          webkitAllowFullScreen
          mozallowfullscreen
          allowFullScreen
        ></iframe>
      ),
    },
    {
      title: 'сласти (mixti-xti)(2021)',
      iframe: (
        <iframe
          width="720"
          height="405"
          src="https://rutube.ru/play/embed/981aaa44c2bf7c412c761ec263adae42"
          frameBorder="0"
          allow="clipboard-write; autoplay"
          webkitAllowFullScreen
          mozallowfullscreen
          allowFullScreen
        ></iframe>
      ),
    },
    {
      title: 'да (2021)',
      iframe: (
        <iframe
          width="720"
          height="405"
          src="https://rutube.ru/play/embed/ca514cc63b7d7107c0b3f0fa3beba2ed"
          frameBorder="0"
          allow="clipboard-write; autoplay"
          webkitAllowFullScreen
          mozallowfullscreen
          allowFullScreen
        ></iframe>
      ),
    },
    {
      title: 'i_got_your_bible_1',
      iframe: (
        <iframe
          width="720"
          height="405"
          src="https://rutube.ru/play/embed/5ed3b81ca02dca81634ab74b1226931c"
          frameBorder="0"
          allow="clipboard-write; autoplay"
          webkitAllowFullScreen
          mozallowfullscreen
          allowFullScreen
        ></iframe>
      ),
    },
    {
      title: 'i_got_your_bible_2',
      iframe: (
        <iframe
          width="720"
          height="405"
          src="https://rutube.ru/play/embed/31e1fb7d48c4f978e20d81da4b1e4f68"
          frameBorder="0"
          allow="clipboard-write; autoplay"
          webkitAllowFullScreen
          mozallowfullscreen
          allowFullScreen
        ></iframe>
      ),
    },
    {
      title: 'женское техно(2023)',
      iframe: (
        <iframe
          width="720"
          height="405"
          src="https://rutube.ru/play/embed/32ced9664c3304932f841a947f3e9d60"
          frameBorder="0"
          allow="clipboard-write; autoplay"
          webkitAllowFullScreen
          mozallowfullscreen
          allowFullScreen
        ></iframe>
      ),
    },
    {
      title: 'данил шафран. сольный ударный перформанс (2023)',
      iframe: (
        <iframe
          width="720"
          height="405"
          src="https://rutube.ru/play/embed/35fcf423a9c1eb46af5080f40d8d68be"
          frameBorder="0"
          allow="clipboard-write; autoplay"
          webkitAllowFullScreen
          mozallowfullscreen
          allowFullScreen
        ></iframe>
      ),
    },
    {
      title: 'тихо (2023)',
      iframe: (
        <iframe
          width="720"
          height="405"
          src="https://rutube.ru/play/embed/94ccc36bf5ac9551aa6032d1a8f9c5c5"
          frameBorder="0"
          allow="clipboard-write; autoplay"
          webkitAllowFullScreen
          mozallowfullscreen
          allowFullScreen
        ></iframe>
      ),
    },
    {
      title: 'молоко (2023)',
      iframe: (
        <iframe
          width="720"
          height="405"
          src="https://rutube.ru/play/embed/43a23e25860d0ff46b48c0ab44da3dd2"
          frameBorder="0"
          allow="clipboard-write; autoplay"
          webkitAllowFullScreen
          mozallowfullscreen
          allowFullScreen
        ></iframe>
      ),
    },
    {
      title: 'горько (2024)',
      iframe: (
        <iframe
          width="720"
          height="405"
          src="https://rutube.ru/play/embed/610f559a23a3e823664e30633dc8d262"
          frameBorder="0"
          allow="clipboard-write; autoplay"
          webkitAllowFullScreen
          mozallowfullscreen
          allowFullScreen
        ></iframe>
      ),
    },
    {
      title: 'ритуал№14',
      iframe: (
        <iframe
          width="720"
          height="405"
          src="https://rutube.ru/play/embed/6222db5e7964579040dcd9278e9066d1"
          frameBorder="0"
          allow="clipboard-write; autoplay"
          webkitAllowFullScreen
          mozallowfullscreen
          allowFullScreen
        ></iframe>
      ),
    },
  ];

  // Устанавливаем начальное состояние activeVideo
  const [activeVideo, setActiveVideo] = useState(0);

  // Функция для промотки до плеера с задержкой
  const scrollToPlayer = () => {
    setTimeout(() => {
      const playerElement = document.getElementById('video-player');
      if (playerElement) {
        playerElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1000); // Задержка 1 секунды
  };

  return (
    <section className="video-section">
      {/* Левая колонка с текстовыми ссылками */}
      <div className="video-links">
        {videos.map((video, index) => (
          <div
            key={index}
            className={`video-link ${activeVideo === index ? 'active' : ''}`}
            onClick={() => {
              setActiveVideo(index); // Устанавливаем активное видео
              scrollToPlayer(); // Проматываем до плеера с задержкой
            }}
          >
            {video.title}
          </div>
        ))}
      </div>

      {/* Правая колонка с iframe */}
      <div id="video-player" className="video-player">
        {videos[activeVideo].iframe}
      </div>
    </section>
  );
};

export default Video;