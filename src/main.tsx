
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App.tsx';
import { AuthProvider } from './contexts/AuthProvider';
import { ThemeProvider } from './contexts/ThemeProvider';
import { FavoritesProvider } from './contexts/FavoritesProvider';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
      <AuthProvider>
        <FavoritesProvider>
          <App />
        </FavoritesProvider>
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 4000,
              style: {
                pointerEvents: 'none',
                minWidth: '320px',
                maxWidth: '420px',
                padding: '16px 20px',
                borderRadius: '12px',
                background: '#FFFFFF',
                color: '#121417',
                fontSize: '16px',
                fontWeight: 500,
                lineHeight: 1.5,
                border: '1px solid #E5E7EB',
                boxShadow: '0 8px 24px rgba(18, 20, 23, 0.16)',
              },
              success: {
                iconTheme: {
                  primary: '#2E7D32',
                  secondary: '#FFFFFF',
                },
              },
              error: {
                iconTheme: {
                  primary: '#D32F2F',
                  secondary: '#FFFFFF',
                },
              },
            }}
          />

      </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
