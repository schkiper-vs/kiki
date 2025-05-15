// src/contexts/SettingsContext.tsx
import { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Settings, SettingsContextType, ThemeColor, OpacityLevel } from '../types/settings';

export const SettingsContext = createContext<SettingsContextType>({
  settings: { 
    background: null, 
    themeColor: 'dark-blue',
    opacity: '50'
  },
  setBackground: () => {},
  setThemeColor: () => {},
  setOpacity: () => {},
});

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<Settings>(() => {
    const saved = localStorage.getItem('appSettings');
    return saved ? JSON.parse(saved) : { 
      background: null, 
      themeColor: 'dark-blue',
      opacity: '50'
    };
  });

  useEffect(() => {
    localStorage.setItem('appSettings', JSON.stringify(settings));
    applyThemeStyles(settings);
  }, [settings]);

  const applyThemeStyles = (settings: Settings) => {
    // Применяем цвет темы как CSS-переменную
    document.documentElement.style.setProperty(
      '--theme-color', 
      getColorValue(settings.themeColor)
    );
    // Применяем прозрачность
    document.documentElement.style.setProperty(
      '--header-opacity',
      `${settings.opacity}%`
    );
  };

  const getColorValue = (color: ThemeColor): string => {
    const colors = {
      'dark-blue': '#1e3a8a',
      'dark-purple': '#5b21b6',
      'dark-green': '#065f46'
    };
    return colors[color];
  };

  const setBackground = (image: string) => {
    setSettings({ ...settings, background: image });
  };

  const setThemeColor = (color: ThemeColor) => {
    setSettings({ ...settings, themeColor: color });
  };

  const setOpacity = (opacity: OpacityLevel) => {
    setSettings({ ...settings, opacity });
  };

  return (
    <SettingsContext.Provider 
      value={{ 
        settings, 
        setBackground,
        setThemeColor,
        setOpacity
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};