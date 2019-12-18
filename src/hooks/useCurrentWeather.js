import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { getUserIdAndLocation } from '../queries';

const API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

function convertTempFromKelvinToFahr(kelvin) {
  const fahr = (kelvin - 273) * 1.8 + 32;
  return Math.round(fahr);
}

const useCurrentWeather = (user) => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [error, setError] = useState(null);
  const { loading, data } = useQuery(getUserIdAndLocation, {
    variables: { email: user.email },
  });

  useEffect(() => {
    const ac = new AbortController();
    if (!loading) {
      if (data && data.user.isSharingLocation && 'geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          const WEATHER_API = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}`;
          // Get the user's current weather from Open Weather API
          fetch(WEATHER_API, { signal: ac.signal })
            .then((res) => res.json())
            .then((d) => {
              const temperature = convertTempFromKelvinToFahr(d.main.temp);
              const conditions = d.weather[0].main;
              setCurrentWeather(`${conditions} ${temperature}°`);
            })
            .catch((err) => setError(err));
        });
      }
    }
    return () => ac.abort();
  }, [data, loading]);
  return { currentWeather, error };
};

export default useCurrentWeather;
