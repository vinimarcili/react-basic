
import { useState, useEffect } from 'react';
import { Button } from '../Button/Button';
import './Clock.css';

// Componente de Relógio Digital
export function Clock() {
  const [time, setTime] = useState(new Date());
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let interval: number | undefined;

    if (!isPaused) {
      interval = setInterval(() => {
        setTime(new Date());
      }, 1000);
    }

    // Limpa o intervalo quando o componente é desmontado ou quando está pausado
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isPaused]);

  const handlePauseToggle = () => {
    setIsPaused(!isPaused);
  };

  return (
    <div className="clock-container">
      <h1 className="clock-title">Relógio Digital</h1>
      <div className="clock-display">{time.toLocaleTimeString('pt-BR', { hour12: false })}</div>
      <Button onClick={handlePauseToggle}>{isPaused ? 'Retomar' : 'Pausar'}</Button>
    </div>
  );
}
