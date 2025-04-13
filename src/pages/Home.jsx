import React from 'react';
import AuthForm from '../components/AuthForm';
import '../styles/home.css';
import '../styles/auth.css';

const Home = () => {
  return (
    <div className="home-container">
      <AuthForm />
    </div>
  );
};

export default Home;