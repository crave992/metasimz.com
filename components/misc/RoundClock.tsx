"use client"

import { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import axios from 'axios';

interface City {
  name: string;
  timezone: string;
}

const cities: City[] = [
  { name: 'New York', timezone: 'America/New_York' },
  { name: 'London', timezone: 'Europe/London' },
  { name: 'Tokyo', timezone: 'Asia/Tokyo' },
];

interface Time {
  city: string;
  time: string;
}

const RoundClock = () => {
  const [times, setTimes] = useState<Time[]>([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      axios.get('https://worldtimeapi.org/api/ip').then((response) => {
        const datetime = response.data.datetime;
        const newTimes = cities.map((city) => {
          const time = moment.tz(datetime, city.timezone).format('h:mm:ss A z');
          return { city: city.name, time };
        });
        setTimes(newTimes);
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h1 className="text-3xl">World Clock</h1>
      <ul>
        {times.map((time, index) => (
          <li key={index} className="py-2">
            {time.city}: {time.time}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoundClock;