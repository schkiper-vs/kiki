import React, { useState, useRef } from 'react';
import Notes from './components/Notes/Notes';
import {useNotes} from './components/Notes/useNotes';
import Tasks from './components/Tasks/Tasks';
import {useTasks} from './components/Tasks/useTasks';
import Timer from './components/Timer/Timer';
import {useTimer} from './components/Timer/useTimer';
import Weather from './components/Weather/Weather';
import {useWeather} from './components/Weather/useWeather';
import AudioPlayer from './components/AudioPlayer/AudioPlayer';
import { useAudioPlayer } from './components/AudioPlayer/useAudioPlayer';
import { formatTime } from './utils/formatTime';

function App() {
  const { notes, newNote, setNewNote, addNote, deleteNote } = useNotes();
  const { tasks, newTask, setNewTask, addTask, toggleTask, deleteTask } = useTasks();
  const { hours, minutes, seconds, timeLeft, isActive, isPaused, setHours, setMinutes, setSeconds, handleStartPause, handleResetTimer } = useTimer();
  const { weather, loading, fetchWeather } = useWeather();
  const { sounds, toggleSound, setVolume, toggleAllSounds } = useAudioPlayer();

  // Размеры окон
  const [noteSize, setNoteSize] = useState({ width: 300, height: 400 });
  const [taskSize, setTaskSize] = useState({ width: 300, height: 400 });

  // Функция для иконок погоды (добавьте эту функцию)
  const getWeatherIcon = (weathercode) => {
    switch(weathercode) {
      case 0: return '☀️';
      case 1: case 2: return '🌤️';
      case 3: return '☁️';
      case 45: case 48: return '🌫️';
      case 51: case 53: case 55: return '🌧️';
      case 61: case 63: case 65: return '🌦️';
      case 71: case 73: case 75: return '🌨️';
      case 80: case 81: case 82: return '🌧️';
      default: return '🌀';
    }
  };

  // Функции ресайза (оставьте как есть)
  const startResizingNote = (e) => { /* ... */ };
  const startResizingTask = (e) => { /* ... */ };

  return (
    <div className="relative h-screen w-full font-sans bg-gray-900 text-white">
      {/* Фон */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 to-gray-800 z-0"></div>

      {/* Основной контент */}
      <div className="relative z-10 h-full w-full">
        {/* Компоненты с явным позиционированием */}
        <div className="absolute top-4 left-4">
          <Tasks
            tasks={tasks}
            newTask={newTask}
            setNewTask={setNewTask}
            addTask={addTask}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
            taskSize={taskSize}
            startResizingTask={startResizingTask}
          />
        </div>

        <div className="absolute top-4 right-4">
          <Notes
            notes={notes}
            newNote={newNote}
            setNewNote={setNewNote}
            addNote={addNote}
            deleteNote={deleteNote}
            noteSize={noteSize}
            startResizingNote={startResizingNote}
          />
        </div>

        <div className="absolute bottom-4 right-4">
          <Timer
            hours={hours}
            minutes={minutes}
            seconds={seconds}
            timeLeft={timeLeft}
            isActive={isActive}
            isPaused={isPaused}
            setHours={setHours}
            setMinutes={setMinutes}
            setSeconds={setSeconds}
            handleStartPause={handleStartPause}
            handleResetTimer={handleResetTimer}
            formatTime={formatTime}
          />
        </div>

        <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
          <Weather 
            weather={weather} 
            loading={loading} 
            fetchWeather={fetchWeather} 
            getWeatherIcon={getWeatherIcon} 
          />
        </div>

        <div className="absolute bottom-4 left-4">
          <AudioPlayer 
            sounds={sounds} 
            toggleSound={toggleSound} 
            setVolume={setVolume} 
            toggleAllSounds={toggleAllSounds} 
          />
        </div>
      </div>
    </div>
  );
}

export default App;