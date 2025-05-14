// src/pages/Auth/Login.tsx
import { Link } from 'react-router-dom';

export const Login = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-80">
        <h1 className="text-2xl font-bold mb-6 text-center">Вход</h1>
        <input 
          type="email" 
          placeholder="Email" 
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input 
          type="password" 
          placeholder="Пароль" 
          className="w-full p-2 mb-6 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">
          Войти
        </button>
        <p className="mt-4 text-center text-sm">
          Нет аккаунта? <Link to="/" className="text-blue-500 hover:underline">На главную</Link>
        </p>
      </div>
    </div>
  );
};