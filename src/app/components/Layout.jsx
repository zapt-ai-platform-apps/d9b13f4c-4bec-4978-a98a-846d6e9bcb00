import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <div className="fixed bottom-4 right-4 z-50">
        <a 
          href="https://www.zapt.ai" 
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-blue-300 hover:text-blue-100 transition"
        >
          Made on ZAPT
        </a>
      </div>
    </div>
  );
}