import React from 'react';
import HeroSection from '../components/HeroSection';
import '../styles/home.css';
import AuthForm from '../components/AuthForm';

export default function Home() {
  return (
    <>
      <AuthForm /> 
      <HeroSection />
    </>
  );
}