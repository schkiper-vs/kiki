import { useState, useRef, useEffect } from 'react';

export const useAudioPlayer = () => {
  const [sounds, setSounds] = useState([
    { name: 'rain', label: '🌧️ Дождь', src: '/audio/rain.mp3', volume: 0.5, playing: false },
    { name: 'thunder', label: '🌬️ Ветер', src: '/audio/thunder.mp3', volume: 0.5, playing: false },
    { name: 'storm', label: '🌩️ Шторм', src: '/audio/storm.mp3', volume: 0.5, playing: false },
  ]);
  const audioElements = useRef({});

  // Останавливаем все звуки при выходе из компонента
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

  return {
    sounds,
    toggleSound,
    setVolume,
    toggleAllSounds,
  };
};