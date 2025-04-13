import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/AuthCallback.css';

const AuthCallback = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Проверяем, что пользователь авторизован
        if (user) {
          setStatus('success');
          // Перенаправляем на главную страницу через 3 секунды
          setTimeout(() => {
            navigate('/');
          }, 3000);
        } else {
          setStatus('error');
        }
      } catch (error) {
        console.error('Auth callback error:', error);
        setStatus('error');
      }
    };

    handleCallback();
  }, [user, navigate]);

  return (
    <div className="auth-callback">
      <div className="auth-callback-content">
        {status === 'loading' && (
          <>
            <div className="spinner"></div>
            <h2>Подтверждение email...</h2>
          </>
        )}
        {status === 'success' && (
          <>
            <div className="success-icon">✓</div>
            <h2>Email успешно подтвержден!</h2>
            <p>Вы будете перенаправлены на главную страницу...</p>
            <button 
              className="home-button"
              onClick={() => navigate('/')}
            >
              Перейти на главную
            </button>
          </>
        )}
        {status === 'error' && (
          <>
            <div className="error-icon">✕</div>
            <h2>Ошибка подтверждения email</h2>
            <p>Пожалуйста, попробуйте еще раз или обратитесь в поддержку.</p>
            <button 
              className="home-button"
              onClick={() => navigate('/')}
            >
              Вернуться на главную
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthCallback; 