"use client";

import { useState } from "react";

interface Weather {
  name: string;
  main: {
    temp: number;
  };
  weather: Array<{
    description: string;
  }>;
}

export default function Home() {
  const [city, setCity] = useState<string>("");
  const [weather, setWeather] = useState<Weather | null>(null);
  const [error, setError] = useState<string>("");

  const fetchWeather = async () => {
    setError("");
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`
      );
      if (!res.ok) {
        throw new Error("Shahar topilmadi");
      }
      const data = await res.json();
      setWeather(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('https://wallpapercave.com/wp/wp2506840.jpg')`,
      }}
    >
      <div className="bg-white/30 backdrop-blur-md p-6 rounded-md shadow-lg w-96">
        <h1 className="text-2xl font-bold mb-4 text-white text-center px-4 py-2 rounded">
          Weather App
        </h1>
        <div className="flex mb-4">
          <input
            type="text"
            className="border p-2 outline-none rounded-l-md text-slate-500 w-full"
            placeholder="Country name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button
            onClick={fetchWeather}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
          >
            Search
          </button>
        </div>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {weather && (
          <div className="bg-white/50 p-4 rounded-md shadow-md text-black mt-4">
            <h2 className="text-xl font-bold text-center">{weather.name}</h2>
            <p className="text-center">Temperature: {weather.main.temp}°C</p>
            <p className="text-center">Air: {weather.weather[0].description}</p>
          </div>
        )}
      </div>
    </div>
  );
}
