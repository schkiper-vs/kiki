import React, { createContext, useState } from 'react';

type Theme = 'light' | 'dark-green';
type ThemeContextType = { theme: Theme; toggleTheme: () => void };

export const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('light');
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark-green' : 'light');
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme}>{children}</div>
    </ThemeContext.Provider>
  );
};