"use client"
import React from 'react';
import { format } from 'date-fns';
const Clock: React.FC = () => {
  const [time, setTime] = React.useState(new Date());
  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);
  return (
    <div className="text-4xl font-bold text-center">
      {format(time, 'HH:mm:ss')}
    </div>
  );
};
export default Clock;