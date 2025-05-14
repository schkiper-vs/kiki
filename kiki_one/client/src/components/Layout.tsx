// src/components/Layout.tsx
import { Outlet, Link } from 'react-router-dom';

export const Layout = () => {
  return (
    <>
      <header className="bg-blue-600 p-4 text-white">
        <nav className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">Моё Приложение</Link>
          <div className="flex gap-4">
            <Link to="/" className="hover:underline">Главная</Link>
            <Link to="/auth" className="hover:underline">Вход</Link>
          </div>
        </nav>
      </header>
      <main className="container mx-auto p-4">
        <Outlet /> {/* Здесь будут встраиваться страницы */}
      </main>
    </>
  );
};