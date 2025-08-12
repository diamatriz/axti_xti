// src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
export { default as About } from './pages/About';
export { default as Releases } from './pages/Releases';
export { default as Video } from './pages/Video';
export { default as Concerts } from './pages/Concerts';
export { default as News } from './pages/News';
export { default as Merch } from './pages/Merch';
export { default as Contacts } from './pages/Contacts';
