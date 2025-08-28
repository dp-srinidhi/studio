'use server';

import type { WeatherData } from './types';

const API_KEY = process.env.OPEN_WEATHER_API_KEY;
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';

export async function fetchWeatherForZone(lat: number, lon: number): Promise<WeatherData> {
  if (!API_KEY) {
    throw new Error('OpenWeather API key is not configured.');
  }

  const url = new URL(WEATHER_API_URL);
  url.searchParams.append('lat', lat.toString());
  url.searchParams.append('lon', lon.toString());
  url.searchParams.append('appid', API_KEY);
  url.searchParams.append('units', 'metric');

  const response = await fetch(url.toString());

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch weather data: ${response.statusText}. Details: ${errorText}`);
  }

  const data = await response.json();
  return data as WeatherData;
}
