import React from 'react';
import '../styles/contacts.css';

const Contacts = () => {
  const sections = [
    {
      title: 'слушать:',
      color: 'red',
      items: [
        {
          title: 'яндекс.музыка',
          link: 'https://music.yandex.ru/artist/9677192'
        },
        {
          title: 'вк.мьюзик',
          link: 'https://vk.com/artist/axti_xti'
        },
        {
          title: 'спотифай',
          link: 'https://open.spotify.com/artist/25zqOSe1olscQQfFUNZ0ES'
        },
        {
          title: 'эпл.мьюзик',
          link: 'https://music.apple.com/ru/artist/axti-xti/1523615909'
        },
        {
          title: 'бэндкемп',
          link: 'https://axti-xti.bandcamp.com/'
        }
      ]
    },
    {
      title: 'следить:',
      color: 'blue',
      items: [
        {
          title: 'телеграм',
          link: 'https://t.me/axtixti'
        },
        {
          title: 'вконтакте',
          link: 'https://vk.com/axtixti'
        },
        {
          title: 'ютуб',
          link: 'https://youtube.com/@axti-xti5018'
        },
        {
          title: 'инстаграм',
          link: 'https://instagram.com/axtixti'
        }
      ]
    },
    {
      title: 'поддержать:',
      color: 'red',
      items: [
        {
          title: 'Донат',
          link: 'https://tips.yandex.ru/guest/payment/5470100'
        }
      ]
    },
    {
      title: 'написать:',
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