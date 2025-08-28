export type PotholeStatus = 'Reported' | 'In Progress' | 'Completed';
export type PotholeSeverity = 'Low' | 'Medium' | 'High';

export type PotholeReport = {
  id: string;
  description: string;
  location: {
    lat: number;
    lng: number;
  };
  address: string;
  zone: string;
  status: PotholeStatus;
  severity: PotholeSeverity;
  reportedAt: Date;
  imageUrl?: string;
  userId: string;
};

export type Zone = {
  name: string;
  center: { lat: number, lng: number };
  potholes: {
    reported: number;
    filled: number;
  }
};

export type WeatherData = {
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
};
