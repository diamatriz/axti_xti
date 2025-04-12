// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import About from './pages/About';
import Releases from './pages/Releases';
import Video from './pages/Video';
import Concerts from './pages/Concerts';
import News from './pages/News';
import Merch from './pages/Merch';
import Contacts from './pages/Contacts';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <>
      <Navigation />
      <div className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/releases" element={<Releases />} />
          <Route path="/video" element={<Video />} />
          <Route path="/concerts" element={<Concerts />} />
          <Route path="/news" element={<News />} />
          <Route path="/merch" element={<Merch />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}