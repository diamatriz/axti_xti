// src/App.jsx
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Releases from './pages/Releases';
import Videos from './pages/Videos';
import News from './pages/News';
import Contacts from './pages/Contacts';
import NotFound from './pages/NotFound';
import './App.css';
import './styles/homeButton.css';
import { Link } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/releases" element={<Releases />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/news" element={<News />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Link to="/" className="home-button">
        <span className="home-icon">🏠</span>
      </Link>
    </Router>
  );
};

export default App;

.home-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all 0.3s ease;
  z-index: 1000;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.home-button:hover {
  background: rgba(255, 255, 255, 0.8);
  transform: scale(1.1);
}

.home-icon {
  font-size: 20px;
  color: #000;
}

@media (max-width: 768px) {
  .home-button {
    width: 35px;
    height: 35px;
    bottom: 15px;
    right: 15px;
  }

  .home-icon {
    font-size: 18px;
  }
}

@media (max-width: 480px) {
  .home-button {
    width: 30px;
    height: 30px;
    bottom: 10px;
    right: 10px;
  }

  .home-icon {
    font-size: 16px;
  }
}