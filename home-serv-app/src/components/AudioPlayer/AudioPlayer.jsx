import React from 'react';

const AudioPlayer = ({ sounds, toggleSound, setVolume, toggleAllSounds }) => {
  return (
    <div className="absolute bottom-4 left-4 z-20 w-64 bg-gray-800 bg-opacity-80 backdrop-blur-md rounded-xl shadow-2xl p-4">
      <h2 className="text-lg font-bold mb-3">Фоновые шумы</h2>
      {sounds.map((sound, index) => (
        <div key={sound.name} className="flex items-center gap-2 mb-2">
          <button
            onClick={() => toggleSound(index)}
            className={`w-8 h-8 flex items-center justify-center rounded-full ${
              sound.playing ? 'bg-green-600' : 'bg-gray-700'
            }`}
          >
            {sound.playing ? '⏸️' : '▶️'}
          </button>
          <span>{sound.label}</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={sound.volume}
            onChange={(e) => setVolume(index, e.target.value)}
            className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-purple-500"
          />
        </div>
      ))}
      <div className="mt-4 pt-2 border-t border-gray-700 text-center">
        <button
          onClick={toggleAllSounds}
          className="px-4 py-1 text-sm bg-purple-600 hover:bg-purple-700 rounded transition-transform hover:scale-105"
        >
          {sounds.some((s) => s.playing) ? 'Пауза всё' : 'Запустить всё'}
        </button>
      </div>
    </div>
  );
};

export default AudioPlayer;