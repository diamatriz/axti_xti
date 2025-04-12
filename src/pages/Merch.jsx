import React, { useState, useEffect } from 'react';
import '../styles/merch.css';

const Merch = () => {
  // Состояние для активной вкладки (свежак/архив)
  const [activeTab, setActiveTab] = useState('archive');
  // Состояние для выбранного товара в модальном окне
  const [selectedItem, setSelectedItem] = useState(null);
  // Состояние для текущего индекса изображения в карусели
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // Состояние для анимации табов
  const [tabAnimation, setTabAnimation] = useState({
    fresh: false,
    archive: false
  });

  // Данные о товарах
  // Для добавления новых товаров:
  // 1. Скопируйте структуру объекта в нужный массив (fresh или archive)
  // 2. Замените id на уникальный номер
  // 3. Обновите title, price и description
  // 4. Добавьте пути к изображениям в массив images
  const merchData = {
    fresh: [], // Товары в разделе "Свежак"
    archive: [ // Товары в разделе "Архив"
      {
        id: 1,
        title: 'CD #1',
        price: 'Бесценно',
        images: [
          {
            src: '/assets/merch/cd.gif',
            type: 'gif' // или 'gif'
          },
          {
            src: '/assets/merch/cd1.jpg',
            type: 'image'
          },
          {
            src: '/assets/merch/cd2.jpg',
            type: 'image'
          },
          {
            src: '/assets/merch/cd3.jpg',
            type: 'image'
          },
          {
            src: '/assets/merch/cd4.jpg',
            type: 'image'
          },
          {
            src: '/assets/merch/cd5.jpg',
            type: 'image'
          },
        ],
        description: 'CD, изготовленный в коллаборации с Ильей Кабатовым (стртгм, pink bong)'
      },
      {
        id: 2,
        title: 'Футболка #1',
        price: 'Бесценно',
        images: [
          {
            src: '/assets/merch/tshirt1.jpg',
            type: 'image'
          },
          {
            src: '/assets/merch/tshirt2.jpg',
            type: 'image'
          }
        ],
        description: 'Футболка, изготовленная в коллаборации с вашими бессовестными мыслями'
      },
      {
        id: 3,
        title: 'Катя и наш CD',
        price: 'Бесценно',
        images: [
          {
            src: '/assets/merch/katya1.jpg',
            type: 'image'
          },
          {
            src: '/assets/merch/katya2.jpg',
            type: 'image'
          },
          {
            src: '/assets/merch/katya3.jpg',
            type: 'image'
          },
          {
            src: '/assets/merch/katya4.jpg',
            type: 'image'
          },
          {
            src: '/assets/merch/katya5.jpg',
            type: 'image'
          },
          {
            src: '/assets/merch/katya6.jpg',
            type: 'image'
          }
        ],
        description: 'Катя, наш CD и ваши бессовестные мысли'
      }
    ]
  };

  // Обработчик переключения табов
  const handleTabChange = (tab) => {
    setTabAnimation(prev => ({
      ...prev,
      [tab]: true
    }));
    
    setTimeout(() => {
      setActiveTab(tab);
      setTabAnimation(prev => ({
        ...prev,
        [tab]: false
      }));
    }, 300);
  };

  // Обработчики карусели
  const handlePrevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === 0 ? selectedItem.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === selectedItem.images.length - 1 ? 0 : prev + 1
    );
  };

  // Обработчик закрытия модального окна
  const handleModalClick = (e) => {
    if (e.target === e.currentTarget) {
      setSelectedItem(null);
    }
  };

  return (
    <section className="merch-section">
      {/* Навигационные табы */}
      <div className="merch-tabs">
        <div 
          className={`merch-tab ${activeTab === 'fresh' ? 'active' : ''} ${tabAnimation.fresh ? 'animating' : ''}`}
          onClick={() => handleTabChange('fresh')}
        >
          Свежак
        </div>
        <div 
          className={`merch-tab ${activeTab === 'archive' ? 'active' : ''} ${tabAnimation.archive ? 'animating' : ''}`}
          onClick={() => handleTabChange('archive')}
        >
          Архив
        </div>
      </div>

      {/* Сетка товаров */}
      <div className="merch-grid">
        {merchData[activeTab].map((item) => (
          <div 
            key={item.id} 
            className="merch-card"
            onClick={() => {
              setSelectedItem(item);
              setCurrentImageIndex(0);
            }}
          >
            <div className="merch-image-container">
              <img 
                src={item.images[0].src} 
                alt={item.title} 
                className={`merch-image ${item.images[0].type === 'gif' ? 'gif' : ''}`}
              />
            </div>
            <div className="merch-info">
              <h3 className="merch-title">{item.title}</h3>
              <p className="merch-price">{item.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Модальное окно с деталями товара */}
      {selectedItem && (
        <div className="modal-overlay" onClick={handleModalClick}>
          <div className="modal-content">
            <div className="carousel">
              <img 
                src={selectedItem.images[currentImageIndex].src} 
                alt={selectedItem.title}
                className={`carousel-image ${selectedItem.images[currentImageIndex].type === 'gif' ? 'gif' : ''}`}
              />
              <button 
                className="carousel-button prev"
                onClick={handlePrevImage}
              >
                <svg viewBox="0 0 24 24">
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                </svg>
              </button>
              <button 
                className="carousel-button next"
                onClick={handleNextImage}
              >
                <svg viewBox="0 0 24 24">
                  <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
                </svg>
              </button>
            </div>
            <div className="modal-info">
              <h2 className="modal-title">{selectedItem.title}</h2>
              <p className="modal-price">{selectedItem.price}</p>
              <p className="modal-description">{selectedItem.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Merch;