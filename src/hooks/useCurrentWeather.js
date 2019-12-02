import { useEffect, useState } from 'react';
import { Avatar } from 'antd';

const API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

function convertTempFromKelvinToFahr(kelvin) {
  const fahr = (kelvin - 273) * 1.8 + 32;
  return Math.round(fahr);
}

const useCurrentWeather = () => {
  const [currentWeather, setCurrentWeather] = useState(null);

  useEffect(() => {
    const ac = new AbortController();
    const { signal } = ac;
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        // Get the user's current weather from Open Weather API
        const WEATHER_API = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}`;
        const res = await fetch(WEATHER_API, { signal });
        const data = await res.json();
        const temp = convertTempFromKelvinToFahr(data.main.temp);
        const description = data.weather[0].main;
        setCurrentWeather(`${description} ${temp}°`);
      });
    }

    return () => ac.abort();
  }, []);
  return currentWeather;
};

export default useCurrentWeather;
