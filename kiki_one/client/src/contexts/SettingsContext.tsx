import { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react'; 

type Settings = {
  background: string | null;
};

type SettingsContextType = {
  settings: Settings;
  setBackground: (image: string) => void;
};

export const SettingsContext = createContext<SettingsContextType>({
  settings: { background: null },
  setBackground: () => {},
});

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<Settings>(() => {
    // Загрузка из LocalStorage при инициализации
    const saved = localStorage.getItem('appSettings');
    return saved ? JSON.parse(saved) : { background: null };
  });

  // Сохраняем настройки при изменении
  useEffect(() => {
    localStorage.setItem('appSettings', JSON.stringify(settings));
    document.body.style.backgroundImage = settings.background 
      ? `url(${settings.background})` 
      : '';
  }, [settings]);

  const setBackground = (image: string) => {
    setSettings({ ...settings, background: image });
  };

  return (
    <SettingsContext.Provider value={{ settings, setBackground }}>
      {children}
    </SettingsContext.Provider>
  );
};