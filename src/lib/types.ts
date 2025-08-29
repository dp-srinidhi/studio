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
  filledAt?: Date;
  imageUrl?: string;
};

export type Zone = {
  name: string;
  wards: string;
  center: { lat: number, lng: number };
  potholes: {
    reported: number;
    filled: number;
  },
  color: string;
};

export type Ward = {
  id: number;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
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

export type TrafficData = {
  flowSegmentData: {
    frc: string;
    currentSpeed: number;
    freeFlowSpeed: number;
    currentTravelTime: number;
    freeFlowTravelTime: number;
    confidence: number;
    roadClosure: boolean;
  };
};
