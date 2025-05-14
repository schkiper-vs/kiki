import React from 'react';

const Weather = ({ weather, loading, getWeatherIcon, fetchWeather }) => {
  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-[25rem] bg-gray-800 bg-opacity-30 backdrop-blur-md rounded-xl p-4">
      <div className="flex items-center justify-between">
        {loading ? (
          <p>Загрузка...</p>
        ) : weather ? (
          <div className="flex items-center gap-4">
            <span className="font-bold">Санкт-Петербург</span>
            <span>{getWeatherIcon(weather.weathercode)}</span>
            <span className="font-mono">{weather.temperature}°C</span>
            <span>Ветер: {weather.windspeed} км/ч</span>
          </div>
        ) : (
          <p>Не удалось загрузить данные</p>
        )}
        <button
          onClick={fetchWeather}
          disabled={loading}
          className="px-3 py-1 text-xs bg-blue-600 hover:bg-blue-700 rounded transition-opacity disabled:opacity-50"
        >
          Обновить
        </button>
      </div>
    </div>
  );
};

export default Weather;