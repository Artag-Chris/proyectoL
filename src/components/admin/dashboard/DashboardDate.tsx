import React, { useEffect, useState } from 'react';

function DashboardDate() {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (timeZone: string, militaryTime: boolean = true): string => {
    const options: Intl.DateTimeFormatOptions = {
      timeZone: timeZone,
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: !militaryTime,
    };

    return new Intl.DateTimeFormat('es-ES', options).format(currentTime);
  };

  return (
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold text-[var(--color-text)]">
        Dashboard
      </h1>
      <div className="backdrop-blur-md bg-white/10 rounded-lg px-4 py-2 text-[var(--color-text)]">
        <div className="flex flex-col items-end">
          <span>
            {formatTime('America/Bogota')} (Bogotá) -{' '}
            {formatTime('America/Bogota', false).split(', ')[1]}
          </span>
        </div>
      </div>
    </div>
  );
}

export default DashboardDate;