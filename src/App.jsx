// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
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
import NotFound from './pages/NotFound'; // Страница 404
import { useAuth } from './context/AuthContext';

// Компонент для защиты маршрутов
const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// Компонент для защиты маршрута администратора
const AdminRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
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

          {/* Страница 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}