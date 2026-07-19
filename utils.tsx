export async function reverseGeocode(lat: number, lng: number): Promise<string> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
      {
        headers: {
          'User-Agent': 'weather-mini-project',
        },
      }
    );
    const data = await res.json();

    const place =
      data.address?.city ||
      data.address?.town ||
      data.address?.village ||
      data.address?.country ||
      data.display_name;
    return place ?? 'Current Location';
  }
  catch (err) {
    console.error('Reverse geocoding failed:', err);
    return 'Current Location';
  }
}
