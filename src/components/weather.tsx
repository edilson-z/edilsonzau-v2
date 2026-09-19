import { useState, useEffect } from "react";

interface WeatherData {
  weather: { id: number; main: string; description: string; icon: string }[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  wind: { speed: number; deg: number };
  sys: { country: string; sunrise: number; sunset: number };
  name: string;
}

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY; 

export default function Weather() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=-8.83&lon=13.24&appid=${API_KEY}&units=metric`
    )
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json: WeatherData) => setWeatherData(json))
      .catch((err) => {
        console.log("Error loading data", err);
        setError("Could not load weather data");
      });
  }, []);

  if (error) return <div>{error}</div>;
  if (!weatherData) return <div>Loading weather details...</div>;

  console.log(weatherData)

  return (
    <div>
      <h2>{weatherData.name}</h2>
      <p>{weatherData.main.temp}°C (feels like {weatherData.main.feels_like}°C)</p>
      <p>{weatherData.weather[0].description}</p>
      <p>Humidity: {weatherData.main.humidity}%</p>
    </div>
  );
}