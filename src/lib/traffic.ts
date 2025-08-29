'use server';

import type { TrafficData } from './types';

const API_KEY = process.env.NEXT_PUBLIC_TOMTOM_API_KEY;
const TRAFFIC_API_URL = 'https://api.tomtom.com/traffic/services/4/flowSegmentData/relative/10/json';

export async function fetchTrafficForZone(lat: number, lon: number): Promise<TrafficData | null> {
  if (!API_KEY) {
    throw new Error('TomTom API key is not configured.');
  }

  const url = new URL(TRAFFIC_API_URL);
  url.searchParams.append('point', `${lat},${lon}`);
  url.searchParams.append('unit', 'KMPH');
  url.searchParams.append('key', API_KEY);

  try {
    const response = await fetch(url.toString());

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Failed to fetch traffic data: ${response.statusText}. Details: ${errorText}`);
      return null;
    }

    const data = await response.json();
    return data as TrafficData;
  } catch (error) {
    console.error('Network error while fetching traffic data:', error);
    return null;
  }
}
