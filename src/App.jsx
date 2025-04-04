// src/App.jsx
import { Routes, Route, Navigate, useRouteError } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import About from './pages/About';
import Releases from './pages/Releases';
import Video from './pages/Video';
import Concerts from './pages/Concerts';
import News from './pages/News';
import Merch from './pages/Merch';
import Contacts from './pages/Contacts';
import Admin from './pages/Admin';
import Dashboard from './pages/Dashboard';
import { useAuth } from './context/AuthContext';

// Компонент для защиты маршрутов
const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
};

// Компонент для защиты маршрута администратора
const AdminRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user || user.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return children;
};

// Обработчик ошибок для React Router
const ErrorBoundary = () => {
  const error = useRouteError();
  console.error('Ошибка в маршруте:', error);

  return (
    <div>
      <h2>Произошла ошибка</h2>
      <p>Пожалуйста, попробуйте позже.</p>
    </div>
  );
};

export default function App() {
  return (
    <>
      <Navigation />
      <div className="page-content">
        <Routes>
          {/* Главная страница */}
          <Route path="/" element={<Home />} />

          {/* Остальные страницы */}
          <Route path="/about" element={<About />} />
          <Route path="/releases" element={<Releases />} />
          <Route path="/video" element={<Video />} />
          <Route path="/concerts" element={<Concerts />} />
          <Route path="/news" element={<News />} />
          <Route path="/merch" element={<Merch />} />
          <Route path="/contacts" element={<Contacts />} />

          {/* Защищенный маршрут */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          {/* Маршрут для администратора */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            }
          />

          {/* Обработчик ошибок */}
          <Route path="*" element={<ErrorBoundary />} />
        </Routes>
      </div>
    </>
  );
}