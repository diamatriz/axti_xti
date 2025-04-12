import React from 'react';
import '../styles/contacts.css';

const Contacts = () => {
  const sections = [
    {
      title: 'Слушать',
      color: 'red',
      items: [
        {
          title: 'Яндекс.Музыка.............................',
          link: 'https://music.yandex.ru/artist/9677192'
        },
        {
          title: 'Spotify....................................',
          link: 'https://open.spotify.com/artist/25zqOSe1olscQQfFUNZ0ES'
        },
        {
          title: 'Bandcamp....................................',
          link: 'https://axti-xti.bandcamp.com/'
        }
      ]
    },
    {
      title: 'Следить',
      color: 'blue',
      items: [
        {
          title: 'Telegram....................................',
          link: 'https://t.me/axtixti'
        },
        {
          title: 'YouTube....................................',
          link: 'https://youtube.com/@axti-xti5018'
        }
      ]
    },
    {
      title: 'Поддержать',
      color: 'red',
      items: [
        {
          title: 'Донат....................................',
          link: 'https://tips.yandex.ru/guest/payment/5470100'
        }
      ]
    },
    {
      title: 'Написать',
      color: 'blue',
      items: [
        {
          title: 'axtixti@gmail.com',
          link: 'mailto:axtixti@gmail.com'
        }
      ]
    }
  ];

  return (
    <div className="contacts-container">
      {sections.map((section, index) => (
        <div key={index} className={`contacts-section ${section.color}`}>
          <h2 className="section-title">{section.title}</h2>
          <div className="links-container">
            {section.items.map((item, itemIndex) => (
              <a
                key={itemIndex}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                {item.title}
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Contacts;