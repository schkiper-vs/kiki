// src/components/Layout.tsx
import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { SettingsMenu } from '../components/SettingsMenu';

export const Layout = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <>
      <header className="header-style p-4 text-white fixed w-full z-10">
        <nav className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold theme-text">Моё Приложение</Link>
          <div className="flex gap-4 items-center">
            <Link to="/" className="hover:underline theme-text">Главная</Link>
            <Link to="/auth" className="hhover:underline theme-text">Вход</Link>
            
            {/* Кнопка настроек */}
            <button 
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              className="p-2 hover:bg-opacity-30 rounded-full transition theme-text"
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

      <main className="container mx-auto pt-20 pb-4 px-4">
        <Outlet />
      </main>
    </>
  );
};