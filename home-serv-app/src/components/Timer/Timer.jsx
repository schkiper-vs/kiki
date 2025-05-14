import React from 'react';

const Timer = ({ hours, minutes, seconds, timeLeft, isActive, isPaused, setHours, setMinutes, setSeconds, handleStartPause, handleResetTimer, formatTime }) => {
  return (
    <div className="absolute bottom-4 right-4 z-20 w-72 bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-xl p-4 text-center">
      <h2 className="text-lg font-bold mb-2">Помидорный таймер</h2>
      <div className="grid grid-cols-3 gap-2 mb-3">
        <input
          type="number"
          min="0"
          value={hours}
          onChange={(e) => setHours(parseInt(e.target.value) || 0)}
          className="w-full px-2 py-1 text-center bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Часы"
        />
        <input
          type="number"
          min="0"
          value={minutes}
          onChange={(e) => setMinutes(parseInt(e.target.value) || 0)}
          className="w-full px-2 py-1 text-center bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Минуты"
        />
        <input
          type="number"
          min="0"
          value={seconds}
          onChange={(e) => setSeconds(parseInt(e.target.value) || 0)}
          className="w-full px-2 py-1 text-center bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Секунды"
        />
      </div>
      <div className="text-4xl font-mono mb-4">{formatTime(timeLeft)}</div>
      <div className="flex justify-center gap-3">
        <button
          onClick={handleStartPause}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded transition-transform transform hover:scale-105"
        >
          {isPaused ? 'Старт' : 'Пауза'}
        </button>
        <button
          onClick={handleResetTimer}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded transition-transform transform hover:scale-105"
        >
          Сброс
        </button>
      </div>
    </div>
  );
};

export default Timer;