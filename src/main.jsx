// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Releases from './pages/Releases';
import Video from './pages/Video';
import Concerts from './pages/Concerts';
import News from './pages/News';
import Merch from './pages/Merch';
import Contacts from './pages/Contacts';
import AuthForm from './components/AuthForm';
import ConfirmEmail from './pages/ConfirmEmail';
import AuthCallback from './pages/AuthCallback';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import './styles/global.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'releases', element: <Releases /> },
      { path: 'video', element: <Video /> },
      { path: 'concerts', element: <Concerts /> },
      { path: 'news', element: <News /> },
      { path: 'merch', element: <Merch /> },
      { path: 'contacts', element: <Contacts /> },
      { path: 'auth', element: <AuthForm /> },
      { path: 'auth/callback', element: <AuthCallback /> },
      { path: 'auth/confirm', element: <ConfirmEmail /> },
      { path: 'profile', element: <Profile /> },
      { path: '*', element: <NotFound /> }
    ]
  }
], {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
