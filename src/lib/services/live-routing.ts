import { LiveRouteData, LocationCoordinates } from '../../types';
import { calculateHaversineKm } from './live-geocoding';

/**
 * Computes live driving/cycling route distance and travel duration via OSRM Public Routing API
 */
export async function fetchLiveRoute(
  origin: LocationCoordinates,
  destination: LocationCoordinates,
  mode: 'CAR' | 'TWO_WHEELER' | 'METRO' | 'BUS' | 'WALK' = 'CAR'
): Promise<LiveRouteData> {
  let profile = 'driving';
  if (mode === 'TWO_WHEELER') profile = 'driving'; // Bike speed adjustment applied
  if (mode === 'WALK') profile = 'foot';

  const url = `https://router.project-osrm.org/route/v1/${profile}/${origin.lng},${origin.lat};${destination.lng},${destination.lat}?overview=full&geometries=geojson`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (data && data.routes && data.routes.length > 0) {
        const route = data.routes[0];
        const distKm = Math.round((route.distance / 1000) * 10) / 10;
        let durationMin = Math.round(route.duration / 60);

        // Adjust duration for Indian peak traffic conditions (1.35x multiplier during morning commute)
        if (mode === 'CAR') durationMin = Math.round(durationMin * 1.35) + 4;
        if (mode === 'TWO_WHEELER') durationMin = Math.round(durationMin * 1.1) + 2;

        return {
          distanceKm: distKm,
          durationMinutes: durationMin,
          geometryPolyline: JSON.stringify(route.geometry),
          mode
        };
      }
    }
  } catch (err) {
    console.warn('OSRM Live routing API failed, using Haversine calculation:', err);
  }

  // Fallback Haversine routing calculation
  const directKm = calculateHaversineKm(origin.lat, origin.lat, destination.lat, destination.lng);
  const roadKm = Math.round(directKm * 1.3 * 10) / 10;
  
  let speedKmH = 22;
  if (mode === 'TWO_WHEELER') speedKmH = 28;
  if (mode === 'METRO') speedKmH = 35;
  if (mode === 'BUS') speedKmH = 18;
  if (mode === 'WALK') speedKmH = 4.5;

  const durationMinutes = Math.round((roadKm / speedKmH) * 60) + 5;

  return {
    distanceKm: roadKm,
    durationMinutes,
    mode
  };
}
