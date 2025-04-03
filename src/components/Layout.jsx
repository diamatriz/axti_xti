import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import HomeButton from './HomeButton';
import '../styles/main.css';

export default function Layout() {
  return (
    <>
      <Navigation />
      <main>
        <Outlet />
      </main>
      <HomeButton />
    </>
  );
}
