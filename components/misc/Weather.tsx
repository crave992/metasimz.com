"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';

interface WeatherData {
  weather: {
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    humidity: number;
    pressure: number;
  };
  wind: {
    speed: number;
  };
  name: string;
}

const Weather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  useEffect(() => {
    const getWeather = async () => {
      const response = await axios.get<WeatherData>(
        'https://api.openweathermap.org/data/2.5/weather?q=Toronto&appid=3e60efbfe8998d759ca4d9a8e924e564&units=metric'
      );
      if (response.data) {
        setWeather(response.data);
        setLocation(response.data.name || null);
      } else {
        setWeather(null);
        setLocation(null);
      }
    };
    getWeather();
  }, []);
  return (
    <div className="bg-gray-950 rounded-md p-6">
      <h2 className="text-lg font-bold mb-2">Weather in {location}</h2>
      {weather && (
        <>
          <div className="flex items-center mb-4">
            <img
              src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
              alt={weather.weather[0].description}
              className="w-20 h-20 mr-4"
            />
            <div>
              <h3 className="text-gray-700 font-semibold">
                {weather.weather[0].description}
              </h3>
              <p className="text-gray-600">
                {Math.round(weather.main.temp)}°C
              </p>
            </div>
          </div>
          <div className="flex justify-between text-sm">
            <div>
              <p className="text-gray-700 font-semibold">Wind</p>
              <p className="text-gray-600">{weather.wind.speed} m/s</p>
            </div>
            <div>
              <p className="text-gray-700 font-semibold">Humidity</p>
              <p className="text-gray-600">{weather.main.humidity}%</p>
            </div>
            <div>
              <p className="text-gray-700 font-semibold">Pressure</p>
              <p className="text-gray-600">{weather.main.pressure} hPa</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default Weather;