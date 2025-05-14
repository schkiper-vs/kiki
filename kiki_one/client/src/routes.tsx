// src/routes.tsx
import { createBrowserRouter } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { Login } from './pages/Auth/Login';
import { Layout } from './components/Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/auth",
        element: <Login />,
      },
    ],
  },
]);