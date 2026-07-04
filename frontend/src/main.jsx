import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import { DarkModeProvider } from './context/DarkModeContext.jsx';
import { ErrorBoundary } from './components/ErrorBoundary.jsx';
import { router } from './router.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <DarkModeProvider>
        <RouterProvider router={router} />
        <Toaster position="top-right" toastOptions={{ duration: 3500 }} />
      </DarkModeProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
