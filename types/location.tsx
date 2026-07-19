export type LocationResult = {
  description: string;
  lat: number;
  lng: number;
}

export type GeocodeApiResult = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  admin1?: string;
  country?: string;
}