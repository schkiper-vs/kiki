// src/components/SettingsMenu.tsx
import { useContext } from 'react';
import { SettingsContext } from '../contexts/SettingsContext';
import type {ThemeColor, OpacityLevel, SettingsMenuProps } from '../types/settings';// Импортируем все типы из общего файла



export function SettingsMenu({ onClose }: SettingsMenuProps) {
  // Получаем настройки и методы их изменения из контекста
  const { 
    settings, 
    setBackground,
    setThemeColor,
    setOpacity
  } = useContext(SettingsContext);

  // Обработчик изменения фонового изображения
  const handleBackgroundChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Валидация типа файла
    const validTypes = [
      'image/jpeg', 
      'image/png', 
      'image/webp', 
      'image/jpg', 
      'image/gif'
    ];
    
    if (!validTypes.includes(file.type)) {
      alert('Пожалуйста, выберите изображение в формате JPEG, PNG, WEBP или GIF');
      return;
    }

    // Валидация размера (не больше 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('Изображение должно быть не больше 10MB');
      return;
    }

    // Чтение файла и установка фона
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setBackground(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed top-20 right-4 bg-white p-4 rounded-lg shadow-xl z-50 w-64">
      {/* Заголовок и кнопка закрытия */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold">Настройки</h3>
        <button 
          onClick={onClose} 
          className="text-gray-500 hover:text-black transition"
          aria-label="Закрыть настройки"
        >
          ✕
        </button>
      </div>

      <div className="space-y-3">
        {/* Блок выбора фона */}
        <div>
          <label className="block text-sm font-medium mb-1">Фон сайта</label>
          {/* Скрытый input для выбора файла */}
          <input
            type="file"
            accept="image/jpeg, image/png, image/webp"
            onChange={handleBackgroundChange}
            className="hidden"
            id="background-input"
          />
          {/* Кнопка, которая триггерит выбор файла */}
          <button
            onClick={() => document.getElementById('background-input')?.click()}
            className="w-full bg-gray-100 hover:bg-gray-200 p-2 rounded text-sm transition"
          >
            Выбрать изображение
          </button>
        </div>
        
        {/* Подсказка о поддерживаемых форматах */}
        <div className="pt-2 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Поддерживаются: JPEG, PNG, WEBP, GIF (до 10MB)
          </p>
        </div>

        {/* Блок выбора цвета темы */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Цвет темы
          </label>
          <select
            value={settings.themeColor}
            onChange={(e) => setThemeColor(e.target.value as ThemeColor)}
            className="w-full bg-gray-100 p-2 rounded text-sm"
          >
            <option value="dark-blue">Тёмно-синий</option>
            <option value="dark-purple">Тёмно-пурпурный</option>
            <option value="dark-green">Тёмно-зелёный</option>
          </select>
        </div>

        {/* Блок выбора прозрачности шапки */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Прозрачность шапки
          </label>
          <div className="flex gap-2">
            {['30', '50', '80'].map((opacity) => (
              <button
                key={opacity}
                onClick={() => setOpacity(opacity as OpacityLevel)}
                className={`px-3 py-1 rounded ${
                  settings.opacity === opacity 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200'
                }`}
              >
                {opacity}%
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}