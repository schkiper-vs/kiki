// src/pages/Home/Home.tsx
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div className="bg-gray-100  p-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-6 ">Добро пожаловать!</h1>
      <p className="mb-4">Это главная страница вашего приложения.</p>
      <Link 
        to="/auth" 
        className="inline-block px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
      >
        Перейти к авторизации
      </Link>
    </div>
  );
};