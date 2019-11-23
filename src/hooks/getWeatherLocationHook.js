import { useEffect, useState } from 'react';
import convertTemp from '../utils/convertTemp';

const useWeather = () => {
  const [finalTemp, setFinalTemp] = useState(null);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        // add a REACT_APP_OPEN_WEATHER_API_KEY to .env
        const API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
        const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}`;
        const response = await fetch(url);
        const res = await response.json();
        // convert the temp from kelvin to fahrenheit
        const temp = convertTemp(res.main.temp);
        setFinalTemp(`${res.weather[0].main} ${temp}°`);
      });
    }
  }, []);
  return { finalTemp };
};

export default useWeather;
