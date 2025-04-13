import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      console.log('Attempting to:', isLogin ? 'login' : 'register');
      console.log('Email:', email);
      
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) {
          console.error('Login error:', error);
          throw error;
        }
        
        console.log('Login successful:', data);
        setSuccess('Успешный вход!');
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });
        
        if (error) {
          console.error('Registration error:', error);
          throw error;
        }
        
        console.log('Registration successful:', data);
        setSuccess('Регистрация успешна! Проверьте почту для подтверждения.');
      }
    } catch (error) {
      console.error('Auth error details:', error);
      setError(error.message || 'Произошла ошибка при авторизации');
    }
  };

  return (
    <div className="auth-form-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>{isLogin ? 'Вход' : 'Регистрация'}</h2>
        {error && <div className="auth-error">{error}</div>}
        {success && <div className="auth-success">{success}</div>}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Пароль"
          required
          minLength={6}
        />
        <button type="submit">{isLogin ? 'Войти' : 'Зарегистрироваться'}</button>
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="auth-toggle"
        >
          {isLogin ? 'Нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
        </button>
      </form>
    </div>
  );
};

export default AuthForm; 