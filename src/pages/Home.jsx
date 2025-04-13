import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AuthForm from '../components/AuthForm';
import '../styles/home.css';
import '../styles/auth.css';

const Home = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="home-container">
        <div className="loading-spinner">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="home-container">
      {user && (
        <button 
          className="profile-button"
          onClick={() => navigate('/profile')}
        >
          Перейти в профиль
        </button>
      )}
      <AuthForm />
    </div>
  );
};

export default Home;