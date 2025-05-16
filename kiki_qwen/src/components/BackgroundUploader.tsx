// src/components/BackgroundUploader.tsx
import React from 'react';
import { saveToDB } from '../utils/indexedDB';

interface BackgroundUploaderProps {
  onBackgroundChange: (url: string) => void;
}

const BackgroundUploader = ({ onBackgroundChange }: BackgroundUploaderProps) => {
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Проверка формата и размера
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      alert('Неверный формат файла. Поддерживаются JPEG, PNG, WEBP, GIF.');
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      alert('Файл слишком большой. Максимум 15 МБ.');
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const url = reader.result as string;
      onBackgroundChange(url); // <-- передаем сразу
      await saveToDB('background', url);
    };

    reader.readAsDataURL(file);
  };

  return (
    <label className="block px-4 py-2 hover:bg-gray-100 cursor-pointer">
      Выбрать фон
      <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
    </label>
  );
};

export default BackgroundUploader;