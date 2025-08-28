import type { PotholeReport, Zone } from '@/lib/types';

// This file is now used for static zone definitions.
// Pothole reports will be fetched from Firestore.

export const zones: Zone[] = [
  { name: 'Teynampet', center: { lat: 13.047, lng: 80.252 }, potholes: { reported: 0, filled: 0 } },
  { name: 'Adyar', center: { lat: 13.004, lng: 80.254 }, potholes: { reported: 0, filled: 0 } },
  { name: 'Anna Nagar', center: { lat: 13.085, lng: 80.210 }, potholes: { reported: 0, filled: 0 } },
  { name: 'Tondiarpet', center: { lat: 13.125, lng: 80.297 }, potholes: { reported: 0, filled: 0 } },
  { name: 'Royapuram', center: { lat: 13.116, lng: 80.299 }, potholes: { reported: 0, filled: 0 } },
  { name: 'Thiru-Vi-Ka Nagar', center: { lat: 13.115, lng: 80.239 }, potholes: { reported: 0, filled: 0 } },
  { name: 'Ambattur', center: { lat: 13.114, lng: 80.155 }, potholes: { reported: 0, filled: 0 } },
  { name: 'Valasaravakkam', center: { lat: 13.050, lng: 80.174 }, potholes: { reported: 0, filled: 0 } },
  { name: 'Alandur', center: { lat: 12.997, lng: 80.201 }, potholes: { reported: 0, filled: 0 } },
  { name: 'Perungudi', center: { lat: 12.964, lng: 80.245 }, potholes: { reported: 0, filled: 0 } },
];

export const reports: PotholeReport[] = [];
