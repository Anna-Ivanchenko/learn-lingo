
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App.tsx';
import { AuthProvider } from './contexts/AuthProvider';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <Toaster
          position="top-center"
          containerStyle={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          toastOptions={{
            style: {
              minWidth: '320px',
              maxWidth: '500px',
            },
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
