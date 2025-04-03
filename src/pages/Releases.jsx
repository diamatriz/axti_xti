// src/pages/Releases.jsx
import React, { useState } from 'react';
import '../styles/releases.css'; // Стили для раздела "Релизы"

const Releases = () => {
  const [activeRelease, setActiveRelease] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const releases = [
    {
      title: 'axti-xti (2020)',
      iframe: (
        <iframe
          style={{ border: 0, width: '100%', height: '500px' }}
          src="https://bandcamp.com/EmbeddedPlayer/album=4051840592/size=large/bgcol=ffffff/linkcol=0687f5/transparent=true/"
        ></iframe>
      ),
    },
    {
      title: 'кастор/шамиль (2020)',
      iframe: (
        <iframe
          style={{ border: 0, width: '100%', height: '500px' }}
          src="https://bandcamp.com/EmbeddedPlayer/album=1352573240/size=large/bgcol=ffffff/linkcol=0687f5/transparent=true/"
        ></iframe>
      ),
    },
    {
      title: 'город пермь (2021)',
      iframe: (
        <iframe
          style={{ border: 0, width: '100%', height: '500px' }}
          src="https://bandcamp.com/EmbeddedPlayer/album=2870844002/size=large/bgcol=ffffff/linkcol=0687f5/transparent=true/"
        ></iframe>
      ),
    },
    {
      title: 'знак налицо (2021)',
      iframe: (
        <iframe
          style={{ border: 0, width: '100%', height: '500px' }}
          src="https://bandcamp.com/EmbeddedPlayer/album=2724301580/size=large/bgcol=ffffff/linkcol=0687f5/transparent=true/"
        ></iframe>
      ),
    },
    {
      title: 'вселенский собор (2022)',
      iframe: (
        <iframe
          style={{ border: 0, width: '100%', height: '500px' }}
          src="https://bandcamp.com/EmbeddedPlayer/album=3841542184/size=large/bgcol=ffffff/linkcol=0687f5/transparent=true/"
        ></iframe>
      ),
    },
    {
      title: 'вериги feat. узница совести (2023)',
      iframe: (
        <iframe
          style={{ border: 0, width: '100%', height: '500px' }}
          src="https://bandcamp.com/EmbeddedPlayer/album=3822946170/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/transparent=true/"
        ></iframe>
      ),
    },
    {
      title: 'попробуй чем-нибудь сняться (2023)',
      iframe: (
        <iframe
          style={{ border: 0, width: '100%', height: '500px' }}
          src="https://bandcamp.com/EmbeddedPlayer/album=1739533838/size=large/bgcol=ffffff/linkcol=0687f5/transparent=true/"
        ></iframe>
      ),
    },
    {
      title: 'аптека (2025)СВЕЖАК!!!',
      iframe: (
        <iframe
          style={{ border: 0, width: '100%', height: '500px' }}
          src="https://bandcamp.com/EmbeddedPlayer/album=2875574963/size=large/bgcol=ffffff/linkcol=0687f5/transparent=true/"
        ></iframe>
      ),
    },
    {
      title: 'секс грибница (2025)СВЕЖАК!!!' ,
      iframe: (
        <iframe
          style={{ border: 0, width: '100%', height: '500px' }}
          src="https://bandcamp.com/EmbeddedPlayer/album=685147066/size=large/bgcol=ffffff/linkcol=0687f5/transparent=true/"
        ></iframe>
      ),
    },
  ];

  return (
    <section className="releases-section">
      {/* Левая колонка с текстовыми ссылками */}
      <div className="release-links">
        {releases.map((release, index) => (
          <div
            key={index}
            className={`release-link ${activeRelease === index ? 'active' : ''}`}
            onClick={() => setActiveRelease(index)}
          >
            {release.title}
          </div>
        ))}
      </div>

      {/* Правая колонка с iframe */}
      <div className="release-player">
        {activeRelease !== null && releases[activeRelease].iframe}
      </div>
    </section>
  );
};

export default Releases;