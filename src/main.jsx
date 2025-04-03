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

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> }, // Главная страница по умолчанию
      { path: 'about', element: <About /> },
      { path: 'releases', element: <Releases /> },
      { path: 'video', element: <Video /> },
      { path: 'concerts', element: <Concerts /> },
      { path: 'news', element: <News /> },
      { path: 'merch', element: <Merch /> },
      { path: 'contacts', element: <Contacts /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);