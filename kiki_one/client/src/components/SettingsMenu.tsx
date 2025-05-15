// src/components/SettingsMenu.tsx
import { useContext } from 'react';
import { SettingsContext } from '../contexts/SettingsContext';

type SettingsMenuProps = {
  onClose: () => void;
};

export const SettingsMenu = ({ onClose }: SettingsMenuProps) => {
  const { setBackground } = useContext(SettingsContext);

  const handleBackgroundChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Валидация типа файла
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg', 'image/gif',];
    if (!validTypes.includes(file.type)) {
      alert('Пожалуйста, выберите изображение в формате JPEG, PNG, WEBP или GIF');
      return;
    }

    // Валидация размера (не больше 2MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('Изображение должно быть больше 10Mb');
      return;
    }

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
        <div>
          <label className="block text-sm font-medium mb-1">Фон сайта</label>
          <input
            type="file"
            accept="image/jpeg, image/png, image/webp"
            onChange={handleBackgroundChange}
            className="hidden"
            id="background-input"
          />
          <button
            onClick={() => document.getElementById('background-input')?.click()}
            className="w-full bg-gray-100 hover:bg-gray-200 p-2 rounded text-sm transition"
          >
            Выбрать изображение
          </button>
        </div>

        <div className="pt-2 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Поддерживаются: JPEG, PNG, WEBP, GIF (до 10MB)
          </p>
        </div>
      </div>
    </div>
  );
};