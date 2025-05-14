import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Слушаем все сетевые интерфейсы
    port: 5173,
    strictPort: true, // Не пытаться использовать другой порт, если 5173 занят
    open: true // Автоматически открывать браузер при запуске
  }
});