// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import supabase from '../supabaseClient';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Подписываемся на изменения состояния аутентификации
    const session = supabase.auth.getSession();
    if (session) {
      loadUserData(session.user?.id); // Загружаем данные пользователя
    }

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log(`Auth state changed: ${event}`);
      if (session?.user) {
        await loadUserData(session.user.id); // Загружаем данные при изменении состояния
      } else {
        setUser(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const loadUserData = async (userId) => {
    if (!userId) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;

      setUser({ ...data }); // Сохраняем данные пользователя
    } catch (err) {
      console.error('Ошибка при загрузке данных пользователя:', err.message);
      setUser(null);
    }
  };

  const login = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      await loadUserData(data.user.id); // Загружаем данные после входа
    } catch (err) {
      console.error('Ошибка при входе:', err.message);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      console.log('Пользователь вышел');
    } catch (err) {
      console.error('Ошибка при выходе:', err.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};