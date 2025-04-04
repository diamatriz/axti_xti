// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Releases from './pages/Releases';
import Video from './pages/Video';
import Concerts from './pages/Concerts';
import News from './pages/News';
import Merch from './pages/Merch';
import Contacts from './pages/Contacts';
import Dashboard from './pages/Dashboard'; // Импортируем Dashboard
import Admin from './pages/Admin'; // Импортируем Admin
import PrivateRoute from './components/PrivateRoute'; // Защищенный маршрут
import AdminRoute from './components/AdminRoute'; // Маршрут для администратора
import { AuthProvider } from './context/AuthContext';
import './styles/global.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // Основной макет с навигацией
    children: [
      { index: true, element: <Home /> }, // Главная страница по умолчанию
      { path: 'about', element: <About /> },
      { path: 'releases', element: <Releases /> },
      { path: 'video', element: <Video /> },
      { path: 'concerts', element: <Concerts /> },
      { path: 'news', element: <News /> },
      { path: 'merch', element: <Merch /> },
      { path: 'contacts', element: <Contacts /> },
      {
        path: 'dashboard',
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: 'admin',
        element: (
          <AdminRoute>
            <Admin />
          </AdminRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
