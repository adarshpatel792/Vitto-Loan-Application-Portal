import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout.jsx';
import { ApplyPage } from './pages/ApplyPage.jsx';
import { DashboardPage } from './pages/DashboardPage.jsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/apply" replace /> },
      { path: 'apply', element: <ApplyPage /> },
      { path: 'dashboard', element: <DashboardPage /> }
    ]
  }
]);
