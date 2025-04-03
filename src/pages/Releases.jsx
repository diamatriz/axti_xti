import React, { useState } from 'react';
import '../styles/releases.css'; // Стили для раздела "Релизы"

const Releases = () => {
  const releases = [
    {
      title: 'axti-xti (2020)',
      iframe: (
        <iframe
          src="https://bandcamp.com/EmbeddedPlayer/album=4051840592/size=large/bgcol=ffffff/linkcol=0687f5/transparent=true/"
          allow="autoplay"
        ></iframe>
      ),
    },
    {
      title: 'кастор/шамиль (2020)',
      iframe: (
        <iframe
          src="https://bandcamp.com/EmbeddedPlayer/album=1352573240/size=large/bgcol=ffffff/linkcol=0687f5/transparent=true/"
          allow="autoplay"
          tracklist
        ></iframe>
      ),
    },
    {
      title: 'знак налицо (2021)',
      iframe: (
        <iframe
          src="https://bandcamp.com/EmbeddedPlayer/album=2724301580/size=large/bgcol=ffffff/linkcol=0687f5/transparent=true/"
          allow="autoplay"
        ></iframe>
      ),
    },
    {
      title: 'сласти mix (2021)',
      iframe: (
        <iframe
          src="https://bandcamp.com/EmbeddedPlayer/album=2518820979/size=large/bgcol=ffffff/linkcol=0687f5/transparent=true/"
          allow="autoplay"
        ></iframe>
      ),
    },
    {
      title: 'да (2021)',
      iframe: (
        <iframe
          src="https://bandcamp.com/EmbeddedPlayer/track=2322998066/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=true/transparent=true/"
          allow="autoplay"
        ></iframe>
      ),
    },
    {
      title: 'город пермь (2021)',
      iframe: (
        <iframe
          src="https://bandcamp.com/EmbeddedPlayer/album=2870844002/size=large/bgcol=ffffff/linkcol=0687f5/transparent=true/"
          allow="autoplay"
        ></iframe>
      ),
    },
    {
      title: 'музыка для танцев (re-mixed) (2021)',
      iframe: (
        <iframe
          src="https://bandcamp.com/EmbeddedPlayer/album=3905639076/size=large/bgcol=ffffff/linkcol=0687f5/transparent=true/"
          allow="autoplay"
        ></iframe>
      ),
    },
    {
      title: 'вселенский собор (2022)',
      iframe: (
        <iframe
          src="https://bandcamp.com/EmbeddedPlayer/album=3841542184/size=large/bgcol=ffffff/linkcol=0687f5/transparent=true/"
          allow="autoplay"
        ></iframe>
      ),
    },
    {
      title: 'попробуй чем-нибудь сняться (2023)',
      iframe: (
        <iframe
          src="https://bandcamp.com/EmbeddedPlayer/album=1739533838/size=large/bgcol=ffffff/linkcol=0687f5/transparent=true/"
          allow="autoplay"
        ></iframe>
      ),
    },
    {
      title: 'вериги feat. узница совести (2023)',
      iframe: (
        <iframe
          src="https://bandcamp.com/EmbeddedPlayer/album=3822946170/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=true/transparent=true/"
          allow="autoplay"
        ></iframe>
      ),
    },
    {
      title: 'uno style (axti-xti remix)(2024)',
      iframe: (
        <iframe
          src="https://bandcamp.com/EmbeddedPlayer/album=1252795117/size=large/bgcol=ffffff/linkcol=0687f5/transparent=true/"
          allow="autoplay"
        ></iframe>
      ),
    },
    {
      title: 'вживую @ обычная галерея (2024)',
      iframe: (
        <iframe
          src="https://bandcamp.com/EmbeddedPlayer/album=673295955/size=large/bgcol=ffffff/linkcol=0687f5/transparent=true/"
          allow="autoplay"
        ></iframe>
      ),
    },
    {
      title: 'основы ножевого боя remixes (2025)',
      iframe: (
        <iframe
          src="https://bandcamp.com/EmbeddedPlayer/album=2815117716/size=large/bgcol=ffffff/linkcol=0687f5/transparent=true/"
          allow="autoplay"
        ></iframe>
      ),
    },
    {
      title: 'аптека (2025)СВЕЖАК!!!',
      iframe: (
        <iframe
          src="https://bandcamp.com/EmbeddedPlayer/album=2875574963/size=large/bgcol=ffffff/linkcol=0687f5/transparent=true/"
          allow="autoplay"
        ></iframe>
      ),
    },
    {
      title: 'секс грибница (2025)СВЕЖАК!!!',
      iframe: (
        <iframe
          src="https://bandcamp.com/EmbeddedPlayer/album=685147066/size=large/bgcol=ffffff/linkcol=0687f5/transparent=true/"
          allow="autoplay"
        ></iframe>
      ),
    },
  ];

  // Находим индекс релиза "секс грибница"
  const defaultReleaseIndex = releases.findIndex(
    (release) => release.title === 'секс грибница (2025)СВЕЖАК!!!'
  );

  // Устанавливаем начальное состояние activeRelease
  const [activeRelease, setActiveRelease] = useState(defaultReleaseIndex);

  // Функция для промотки до плеера с задержкой
  const scrollToPlayer = () => {
    setTimeout(() => {
      const playerElement = document.getElementById('release-player');
      if (playerElement) {
        playerElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1000); // Задержка 1000 мс (1 секунды)
  };

  return (
    <section className="releases-section">
      {/* Левая колонка с текстовыми ссылками */}
      <div className="release-links">
        {releases.map((release, index) => (
          <div
            key={index}
            className={`release-link ${activeRelease === index ? 'active' : ''}`}
            onClick={() => {
              setActiveRelease(index); // Устанавливаем активный релиз
              scrollToPlayer(); // Проматываем до плеера с задержкой
            }}
          >
            {release.title}
          </div>
        ))}
      </div>

      {/* Правая колонка с iframe */}
      <div id="release-player" className="release-player">
        {activeRelease !== null && releases[activeRelease].iframe}
      </div>
    </section>
  );
};

export default Releases;