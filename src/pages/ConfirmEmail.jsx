import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './ConfirmEmail.css';

const ConfirmEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { confirmEmail } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const confirm = async () => {
      try {
        const token = searchParams.get('token');
        const type = searchParams.get('type');
        
        if (token && type === 'email') {
          await confirmEmail(token);
          navigate('/news');
        } else {
          setError('Invalid confirmation link');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    confirm();
  }, [searchParams, confirmEmail, navigate]);

  if (loading) {
    return (
      <div className="confirm-email-container">
        <div className="confirm-email-content">
          <h2>Подтверждение email...</h2>
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="confirm-email-container">
        <div className="confirm-email-content">
          <h2>Ошибка</h2>
          <p>{error}</p>
          <button onClick={() => navigate('/auth')} className="auth-button">
            Вернуться к авторизации
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="confirm-email-container">
      <div className="confirm-email-content">
        <h2>Email подтвержден!</h2>
        <p>Ваш email успешно подтвержден. Перенаправляем вас на страницу новостей...</p>
        <button onClick={() => navigate('/news')} className="auth-button">
          Перейти к новостям
        </button>
      </div>
    </div>
  );
};

export default ConfirmEmail; 