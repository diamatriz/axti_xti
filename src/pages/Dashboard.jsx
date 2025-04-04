// src/pages/Dashboard.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {

  return (
    <div className="dashboard">
      <h1>Добро пожаловать в личный кабинет!</h1>
      <div>
        <p>Email: {user.email}</p>
        <p>ID: {user.id}</p>
        <p>Роль: {user.role || 'Пользователь'}</p>
      </div>
    </div>
  );
};
}
export default Dashboard;