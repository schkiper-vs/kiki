// src/components/Header.tsx
import  { useState } from 'react';
import BackgroundUploader from './BackgroundUploader';
import ThemeSelector from './ThemeSelector';

interface HeaderProps {
  theme: 'dark-gray' | 'green' | 'blue' | 'magenta';
  onBackgroundChange: (url: string) => void;
  onThemeChange: (theme: 'dark-gray' | 'green' | 'blue' | 'magenta') => void;
}

const Header = ({
  theme,
  onBackgroundChange,
  onThemeChange,
}: HeaderProps) => {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 h-16 flex justify-end items-center px-4 z-20 bg-black/50 backdrop-blur-sm">
      {/* Кнопка "Настройки" */}
      <div className="relative">
        <button
          onClick={() => setSettingsOpen(!settingsOpen)}
          className="px-4 py-2 text-white hover:bg-white/10 rounded transition"
        >
          Настройки
        </button>

        {/* Выпадающее меню */}
        {settingsOpen && (
          <div className="absolute top-10 right-0 mt-2 w-48 bg-white/90 backdrop-blur-sm border border-gray-300 rounded shadow-lg text-black z-20">
            <BackgroundUploader onBackgroundChange={onBackgroundChange} />
            <ThemeSelector currentTheme={theme} onChange={onThemeChange} />
          </div>
        )}
      </div>

      {/* Кнопка "Войти" */}
      <button className="ml-4 px-4 py-2 text-white hover:bg-white/10 rounded transition">
        Войти
      </button>
    </header>
  );
};

export default Header;