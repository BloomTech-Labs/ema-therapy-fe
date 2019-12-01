import { useEffect, useState } from 'react';

const API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

function convertTempFromKelvinToFahr(kelvin) {
  const fahr = (kelvin - 273) * 1.8 + 32;
  return Math.round(fahr);
}

const useCurrentWeather = () => {
  const [currentWeather, setCurrentWeather] = useState(null);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        // Get the user's current weather from Open Weather API
        const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}`;
        const response = await fetch(url);
        const res = await response.json();
        const temp = convertTempFromKelvinToFahr(res.main.temp);
        const description = res.weather[0].main;
        setCurrentWeather(`${description} ${temp}°`);
      });
    }
  }, []);
  return currentWeather;
};

export default useCurrentWeather;
