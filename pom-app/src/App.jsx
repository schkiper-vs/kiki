import React, { useState, useEffect, useRef } from 'react';

export default function App() {
  // === Состояния ===
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // --- Погода ---
  const [weather, setWeather] = useState(null);
  const [loadingWeather, setLoadingWeather] = useState(false);

  // --- Фоновые звуки ---
  const [sounds, setSounds] = useState([
    { name: 'rain', label: '🌧️ Дождь', src: '/audio/rain.mp3', volume: 0.5, playing: false },
    { name: 'thunder', label: '🌬️ Ветер', src: '/audio/thunder.mp3', volume: 0.5, playing: false },
    { name: 'storm', label: '🌩️ Шторм', src: '/audio/storm.mp3', volume: 0.5, playing: false },
  ]);
  const audioElements = useRef({});

  // --- Таймер ---
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [timeLeft, setTimeLeft] = useState(hours * 3600 + minutes * 60 + seconds);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);

  // --- Размер модулей ---
  const [noteSize, setNoteSize] = useState({ width: 300, height: 400 });
  const [taskSize, setTaskSize] = useState({ width: 300, height: 400 });

  // --- Фон экрана ---
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [showBackgroundMenu, setShowBackgroundMenu] = useState(false);
  const [customImageUrl, setCustomImageUrl] = useState('');
  const fileInputRef = useRef(null);

  // === Логика ===

  // --- Получение погоды ---
  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    setLoadingWeather(true);
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
    setLoadingWeather(false);
  };

  const getWeatherIcon = (weathercode) => {
    switch (weathercode) {
      case 0:
        return '☀️'; // Ясное небо
      case 1:
      case 2:
        return '🌤️'; // Переменная облачность
      case 3:
        return '☁️'; // Облачно
      case 45:
      case 48:
        return '🌫️'; // Туман
      case 51:
      case 53:
      case 55:
        return '🌧️'; // Мелкий дождь
      case 61:
      case 63:
      case 65:
        return '🌦️'; // Дождь
      case 71:
      case 73:
      case 75:
        return '🌨️'; // Снег
      case 80:
      case 81:
      case 82:
        return '🌧️'; // Ливень
      default:
        return '🌀'; // Неизвестно
    }
  };

  // --- Управление аудио ---
  useEffect(() => {
    return () => {
      Object.values(audioElements.current).forEach((audio) => {
        audio.pause();
        audio.src = '';
      });
      audioElements.current = {};
    };
  }, []);

  const toggleSound = (index) => {
    const updatedSounds = [...sounds];
    const sound = updatedSounds[index];

    if (!sound.playing) {
      const audio = new Audio(sound.src);
      audio.loop = true;
      audio.volume = sound.volume;
      audio.play();
      audioElements.current[sound.name] = audio;
    } else {
      const audio = audioElements.current[sound.name];
      if (audio) {
        audio.pause();
        delete audioElements.current[sound.name];
      }
    }

    updatedSounds[index].playing = !sound.playing;
    setSounds(updatedSounds);
  };

  const setVolume = (index, value) => {
    const updatedSounds = [...sounds];
    const sound = updatedSounds[index];
    const volume = parseFloat(value);

    updatedSounds[index].volume = volume;

    const audio = audioElements.current[sound.name];
    if (audio) {
      audio.volume = volume;
    }

    setSounds(updatedSounds);
  };

  const toggleAllSounds = () => {
    const anyPlaying = sounds.some((s) => s.playing);
    const updatedSounds = sounds.map((sound) => ({ ...sound, playing: !anyPlaying }));

    sounds.forEach((sound) => {
      const audio = audioElements.current[sound.name];
      if (audio) {
        audio.pause();
        delete audioElements.current[sound.name];
      }
    });

    if (!anyPlaying) {
      sounds.forEach((sound) => {
        const audio = new Audio(sound.src);
        audio.loop = true;
        audio.volume = sound.volume;
        audio.play();
        audioElements.current[sound.name] = audio;
      });
    }

    setSounds(updatedSounds);
  };

  // --- Таймер ---
  useEffect(() => {
    setTimeLeft(hours * 3600 + minutes * 60 + seconds);
  }, [hours, minutes, seconds]);

  useEffect(() => {
    let interval = null;

    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(interval);
            setIsActive(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, isPaused]);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleResetTimer = () => {
    setTimeLeft(hours * 3600 + minutes * 60 + seconds);
    setIsActive(false);
    setIsPaused(true);
  };

  const handleStartPause = () => {
    if (!isActive) {
      setIsActive(true);
      setIsPaused(false);
    } else {
      setIsPaused(!isPaused);
    }
  };

  // --- Заметки ---
  const addNote = () => {
    if (newNote.trim()) {
      setNotes([...notes, newNote.trim()]);
      setNewNote('');
    }
  };

  const deleteNote = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  // --- Задачи ---
  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask.trim(), completed: false }]);
      setNewTask('');
    }
  };

  const toggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  // --- Ресайз окон ---
  const startResizingNote = (e) => {
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = noteSize.width;
    const startHeight = noteSize.height;

    const handleMouseMove = (moveEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;
      setNoteSize({
        width: Math.max(200, startWidth - dx),
        height: Math.max(200, startHeight + dy),
      });
    };

    const stopResizing = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', stopResizing);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', stopResizing);
  };

  const startResizingTask = (e) => {
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = taskSize.width;
    const startHeight = taskSize.height;

    const handleMouseMove = (moveEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;
      setTaskSize({
        width: Math.max(200, startWidth + dx),
        height: Math.max(200, startHeight + dy),
      });
    };

    const stopResizing = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', stopResizing);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', stopResizing);
  };

  // --- Управление фоном ---
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setBackgroundImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // === JSX разметка ===

  return (
    <div className="relative h-screen w-full overflow-hidden font-sans bg-gray-900 text-white">
      {/* Фон */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out"
        style={{
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'linear-gradient(45deg, #1a1a2e, #16213e, #0f3460)',
        }}
      />
      <div className="absolute inset-0 bg-black opacity-50" />

      {/* Кнопка "Загрузить фон" с меню */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30">
        <div className="relative inline-block text-left">
          <button
            onClick={() => setShowBackgroundMenu(!showBackgroundMenu)}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded transition-transform transform hover:scale-105"
            type="button"
          >
            Загрузить фон
          </button>

          {/* Выпадающее меню */}
          {showBackgroundMenu && (
            <div className="origin-top-right absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 z-50">
              <div className="py-1" role="menu" aria-orientation="vertical">
                <div
                  onClick={() => {
                    fileInputRef.current.click();
                    setShowBackgroundMenu(false);
                  }}
                  className="block px-4 py-2 text-sm text-white text-center rounded bg-purple-600 hover:bg-purple-700 cursor-pointer"
                  role="menuitem"
                >
                  Выбрать файл
                </div>
                <div className="block px-4 py-2 text-sm text-white">
                  <input
                    type="text"
                    placeholder="Введите URL изображения"
                    value={customImageUrl}
                    onChange={(e) => setCustomImageUrl(e.target.value)}
                    className="w-full px-2 py-1 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                  />
                  <button
                    onClick={(e) => {
                      setBackgroundImage(customImageUrl);
                      setShowBackgroundMenu(false);
                      e.stopPropagation();
                    }}
                    className="mt-1 w-full text-center text-xs px-2 py-1 bg-purple-600 hover:bg-purple-700 rounded"
                  >
                    Применить
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <input ref={fileInputRef} type="file" onChange={handleFileChange} accept="image/*" className="hidden" />
      </div>

      {/* Блок: Погода */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-[25rem] bg-gray-800 bg-opacity-30 backdrop-blur-md rounded-xl p-4">
        <div className="flex items-center justify-between">
          {loadingWeather ? (
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
            disabled={loadingWeather}
            className="px-3 py-1 text-xs bg-blue-600 hover:bg-blue-700 rounded transition-opacity disabled:opacity-50"
          >
            Обновить
          </button>
        </div>
      </div>

      {/* Блок: Аудиофон */}
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

      {/* Блок: Заметки */}
      <div
        className="absolute top-24 right-4 z-20 bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-xl p-4 overflow-auto"
        style={{ width: noteSize.width, height: noteSize.height }}
      >
        <h2 className="text-lg font-bold mb-2 border-b pb-1 border-gray-600">Заметки</h2>
        <div className="mb-3">
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Новая заметка..."
            rows={3}
            className="w-full px-3 py-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none overflow-hidden"
            onInput={(e) => {
              e.target.style.height = 'auto';
              e.target.style.height = e.target.scrollHeight + 'px';
            }}
          />
          <button
            onClick={addNote}
            className="mt-2 px-3 py-2 bg-purple-600 hover:bg-purple-700 rounded transition-transform hover:scale-105"
          >
            +
          </button>
        </div>
        <ul className="space-y-2 max-h-[calc(100%-100px)] overflow-y-auto custom-scrollbar">
          {notes.map((note, index) => (
            <li key={index} className="p-2 bg-gray-700 rounded break-words group">
              <pre className="whitespace-pre-wrap font-normal">{note}</pre>
              <button
                onClick={() => deleteNote(index)}
                className="text-red-400 opacity-0 group-hover:opacity-100 float-right mt-1 transition-opacity"
              >
                &times;
              </button>
            </li>
          ))}
        </ul>
        <div
          className="absolute bottom-0 left-0 w-4 h-4 cursor-nwse-resize bg-transparent hover:bg-blue-500"
          onMouseDown={startResizingNote}
        />
      </div>

      {/* Блок: Список дел */}
      <div
        className="absolute top-24 left-4 z-20 bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-xl p-4 overflow-auto"
        style={{ width: taskSize.width, height: taskSize.height }}
      >
        <h2 className="text-lg font-bold mb-2 border-b pb-1 border-gray-600">Список дел</h2>
        <div className="flex gap-2 mb-3">
          <input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Новая задача..."
            className="flex-grow px-3 py-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={addTask}
            className="px-3 py-2 bg-purple-600 hover:bg-purple-700 rounded transition-transform hover:scale-105"
          >
            +
          </button>
        </div>
        <ul className="space-y-2 max-h-[calc(100%-100px)] overflow-y-auto custom-scrollbar">
          {tasks.map((task, index) => (
            <li key={index} className="p-2 bg-gray-700 rounded flex justify-between items-center group">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(index)}
                  className="form-checkbox h-5 w-5 text-purple-500"
                />
                <span className={task.completed ? 'line-through text-gray-400' : ''}>{task.text}</span>
              </label>
              <button
                onClick={() => deleteTask(index)}
                className="text-red-400 opacity-0 group-hover:opacity-105 transition-opacity"
              >
                &times;
              </button>
            </li>
          ))}
        </ul>
        <div
          className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize bg-transparent hover:bg-blue-500"
          onMouseDown={startResizingTask}
        />
      </div>

      {/* Блок: Таймер */}
      <div className="absolute bottom-4 right-4 z-20 w-72 bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-xl shadow-2xl p-4 text-center">
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
            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded transition-transform hover:scale-105"
          >
            {isPaused ? 'Старт' : 'Пауза'}
          </button>
          <button
            onClick={handleResetTimer}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded transition-transform hover:scale-105"
          >
            Сброс
          </button>
        </div>
      </div>
    </div>
  );
}