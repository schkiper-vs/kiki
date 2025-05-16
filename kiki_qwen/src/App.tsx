// src/App.tsx
import  { useState, useEffect } from 'react';
import Header from './components/Header';
import { loadFromDB } from './utils/indexedDB';
import TodoList from './components/TodoList';
import Notes from './components/Notes';

const App = () => {
  const [background, setBackground] = useState<string | null>(null);
  const [theme, setTheme] = useState<'dark-gray' | 'green' | 'blue' | 'magenta'>('dark-gray');

  useEffect(() => {
    const loadSettings = async () => {
      const savedBackground = await loadFromDB('background');
      const savedTheme = await loadFromDB('theme');

      if (savedBackground) setBackground(savedBackground);
      if (savedTheme) setTheme(savedTheme as any); // Можно типизировать позже
    };

    loadSettings();
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden relative">
      {/* Основной фон с градиентом */}
      <div
        className="absolute inset-0 bg-gray-500 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: background ? `url(${background})` : undefined }}
      ></div>

      {/* Градиент поверх фона */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-transparent to-gray-900/90 pointer-events-none"></div>

      {/* Шапка поверх всего */}
      <Header
        theme={theme}
        onBackgroundChange={setBackground}
        onThemeChange={setTheme}
      />

      {/* Центральный текст */}
      <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-xl font-medium bg-black/30 px-4 py-2 rounded-lg backdrop-blur-sm z-10">
        Инструменты будут добавлены позже.
      </p>
      {/* Список дел */}
        <TodoList />
      {/* Заметки */}
      <Notes />

    </div>
  );
};

export default App;