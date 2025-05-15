// src/components/Layout.tsx
import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { SettingsMenu } from '../components/SettingsMenu';

export const Layout = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <>
      <header className="bg-blue-600 p-4 text-white">
        <nav className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">Моё Приложение</Link>
          <div className="flex gap-4 items-center">
            <Link to="/" className="hover:underline">Главная</Link>
            <Link to="/auth" className="hover:underline">Вход</Link>
            
            {/* Кнопка настроек */}
            <button 
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              className="p-2 hover:bg-blue-700 rounded-full transition"
              aria-label="Настройки"
            >
              ⚙️
            </button>
          </div>
        </nav>
      </header>

      {/* Меню настроек */}
      {isSettingsOpen && (
        <SettingsMenu onClose={() => setIsSettingsOpen(false)} />
      )}

      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </>
  );
};