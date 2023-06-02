"use client"
import { useState } from 'react';
import { format, getDaysInMonth, startOfMonth, addDays } from 'date-fns';
import classNames from 'classnames';
const Calendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateClick = (day: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(day);
    setSelectedDate(newDate);
  };
  const monthStart = startOfMonth(selectedDate);
  const daysInMonth = getDaysInMonth(monthStart);
  const monthName = format(monthStart, 'MMMM yyyy');
  const days = [];
  let day = 1;
  while (day <= daysInMonth) {
    days.push(day);
    day++;
  }
  const dayClassNames = (day: number): string => {
    const dayDate = new Date(selectedDate);
    dayDate.setDate(day);
    return classNames('p-2 text-center', {
      'text-gray-400': dayDate.getMonth() !== monthStart.getMonth(),
      'bg-blue-500 text-white rounded-full': dayDate.getTime() === selectedDate.getTime(),
    });
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-4xl font-bold mb-8">{monthName}</div>
      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center font-bold">
            {day}
          </div>
        ))}
        {Array.from({ length: monthStart.getDay() }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {days.map((day) => (
          <div key={day} className={dayClassNames(day)} onClick={() => handleDateClick(day)}>
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Calendar;