import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './modules/auth/AuthProvider';
import AppRoutes from './app/routes';
import { Toaster } from 'react-hot-toast';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
        <Toaster 
          position="top-right"
          toastOptions={{
            style: {
              background: '#374151',
              color: '#fff',
            },
            success: {
              iconTheme: {
                primary: '#60a5fa',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  );
}