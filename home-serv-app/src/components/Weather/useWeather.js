import { useState, useEffect } from 'react';

export const useWeather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=59.93&longitude=30.31&current_weather=true '
      );
      const data = await response.json();
      setWeather({
        temperature: data.current_weather.temperature,
        weathercode: data.current_weather.weathercode,
        windspeed: data.current_weather.windspeed,
      });
    } catch (error) {
      console.error('Ошибка при получении данных о погоде:', error);
      setWeather(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const getWeatherIcon = (weathercode) => {
    switch (weathercode) {
      case 0:
        return '☀️';
      case 1:
      case 2:
        return '🌤️';
      case 3:
        return '☁️';
      case 45:
      case 48:
        return '🌫️';
      case 51:
      case 53:
      case 55:
        return '🌧️';
      case 61:
      case 63:
      case 65:
        return '🌦️';
      case 71:
      case 73:
      case 75:
        return '🌨️';
      case 80:
      case 81:
      case 82:
        return '🌧️';
      default:
        return '🌀';
    }
  };

  return {
    weather,
    loading,
    fetchWeather,
    getWeatherIcon,
  };
};