import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Weather({ location }) {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (location) {
      axios
        .get(`/weather/${encodeURIComponent(location)}`)
        .then((response) => {
          setWeatherData(response.data);
        })
        .catch((err) => {
          console.error('Error: ', err);
          setError(err);
        });
    } else {
      console.warn('Location is not available for API request');
    }
  }, [location]);


  return (
    <div className="p-5 rounded-lg mt-4 bg-gradient-to-r from-blue-500 to-blue-300 shadow-md text-white">
      <h2 className="text-2xl font-bold mb-4">
        Väderinformation
      </h2>
      {error && <p className="text-red-100">Fel vid hämtning av väderdata.</p>}
      {weatherData ? (
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center">
            <img
              src={weatherData.current.condition.icon}
              alt={weatherData.current.condition.text}
              className="h-16 w-16 mb-2"
            />
            <p className="text-lg">{weatherData.current.condition.text}</p>
          </div>
          <div className="space-y-2">
          <h1 className='text-lg font-bold'>{weatherData.location.name + ", " + weatherData.location.region}</h1>
            <p className="text-lg">
              Temperatur: <span className="font-bold">{weatherData.current.temp_c}°C</span>
            </p>
            <p className="text-lg">
              Känns som: <span className="font-bold">{weatherData.current.feelslike_c}°C</span>
            </p>
            <p className="text-lg">
              Vind: <span className="font-bold">{Math.round(weatherData.current.wind_kph / 3.6)} m/s</span>
            </p>
          </div>
        </div>
      ) : (
        <p className="text-white opacity-70">Laddar väderinformation...</p>
      )}
    </div>
  );
}

export default Weather;
