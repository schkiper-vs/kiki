import { useState, useEffect } from 'react';

export const useTimer = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [timeLeft, setTimeLeft] = useState(hours * 3600 + minutes * 60 + seconds);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);

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

  return {
    hours,
    minutes,
    seconds,
    timeLeft,
    isActive,
    isPaused,
    setHours,
    setMinutes,
    setSeconds,
    handleStartPause,
    handleResetTimer,
  };
};