// src/components/ThemeSelector.tsx
import { useState } from 'react';

type Theme = 'dark-gray' | 'green' | 'blue' | 'magenta';

const themes: Record<Theme, { gradient: string; textColor: string }> = {
  'dark-gray': {
    gradient: 'bg-gradient-to-b from-gray-800 to-gray-300',
    textColor: 'text-white',
  },
  green: {
    gradient: 'bg-gradient-to-b from-green-800 to-green-300',
    textColor: 'text-white',
  },
  blue: {
    gradient: 'bg-gradient-to-b from-blue-800 to-blue-300',
    textColor: 'text-white',
  },
  magenta: {
    gradient: 'bg-gradient-to-b from-pink-800 to-pink-300',
    textColor: 'text-white',
  },
};

interface ThemeSelectorProps {
  currentTheme: Theme;
  onChange: (theme: Theme) => void;
}

const ThemeSelector = ({ currentTheme, onChange }: ThemeSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
      >
        Выбрать тему
      </button>

      {isOpen && (
        <ul className="absolute left-48 top-0 bg-white/90 backdrop-blur-sm border border-gray-300 rounded shadow-lg text-black p-2 space-y-1 min-w-[120px] z-20">
          {Object.keys(themes).map((themeKey) => (
            <li key={themeKey}>
              <button
                onClick={() => onChange(themeKey as Theme)}
                className={`w-full text-left px-3 py-1 rounded ${
                  currentTheme === themeKey ? 'bg-blue-100' : 'hover:bg-gray-100'
                }`}
              >
                {themeKey}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ThemeSelector;