import { LocationCoordinates } from '../types';
import { CHENNAI_LOCALITIES, ChennaiLocalityData } from '../data/chennai-spatial';

export interface ResolvedLocation {
  address: string;
  locality: string;
  city: 'Chennai';
  coordinates: LocationCoordinates;
  matchedLocalityData: ChennaiLocalityData;
}

/**
 * Parses user input string (Address, Lat/Lng, or Locality Name) and resolves to standardized Chennai location coordinates & locality metadata.
 */
export async function geocodeLocation(inputQuery: string): Promise<ResolvedLocation> {
  const query = inputQuery.trim().toLowerCase();

  // 1. Check for direct Lat,Lng coordinates pattern (e.g. "12.9782, 80.2180" or "12.9782 80.2180")
  const latLngMatch = query.match(/^([-+]?\d{1,2}\.\d+)[,\s]+([-+]?\d{1,3}\.\d+)$/);
  if (latLngMatch) {
    const lat = parseFloat(latLngMatch[1]);
    const lng = parseFloat(latLngMatch[2]);
    const nearest = findNearestChennaiLocality(lat, lng);
    return {
      address: `Custom Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`,
      locality: nearest.name,
      city: 'Chennai',
      coordinates: { lat, lng },
      matchedLocalityData: nearest
    };
  }

  // 2. Check for exact or partial slug / name match in our pre-indexed Chennai localities
  for (const [slug, locality] of Object.entries(CHENNAI_LOCALITIES)) {
    if (query.includes(slug) || query.includes(locality.name.toLowerCase())) {
      return {
        address: `${locality.name}, Chennai, Tamil Nadu, India`,
        locality: locality.name,
        city: 'Chennai',
        coordinates: locality.center,
        matchedLocalityData: locality
      };
    }
  }

  // 3. Optional online geocoding via OpenStreetMap Nominatim with 3s timeout
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(inputQuery + ', Chennai')}&limit=1`,
      { signal: controller.signal, headers: { 'User-Agent': 'PropertyLens-App' } }
    );
    clearTimeout(timeoutId);
    if (response.ok) {
      const data = await response.json();
      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lng = parseFloat(data[0].lon);
        const nearest = findNearestChennaiLocality(lat, lng);
        return {
          address: data[0].display_name || `${inputQuery}, Chennai`,
          locality: nearest.name,
          city: 'Chennai',
          coordinates: { lat, lng },
          matchedLocalityData: nearest
        };
      }
    }
  } catch (err) {
    // Fall back to nearest default Chennai central locality if offline/timeout
  }

  // 4. Default fallback: Velachery / Central Chennai
  const defaultLocality = CHENNAI_LOCALITIES['velachery'];
  return {
    address: `${inputQuery} (Near ${defaultLocality.name}), Chennai`,
    locality: defaultLocality.name,
    city: 'Chennai',
    coordinates: defaultLocality.center,
    matchedLocalityData: defaultLocality
  };
}

/**
 * Finds the nearest known Chennai locality based on Haversine distance
 */
export function findNearestChennaiLocality(lat: number, lng: number): ChennaiLocalityData {
  let closest: ChennaiLocalityData = CHENNAI_LOCALITIES['velachery'];
  let minDistance = Infinity;

  for (const locality of Object.values(CHENNAI_LOCALITIES)) {
    const d = calculateHaversineDistanceKm(lat, lng, locality.center.lat, locality.center.lng);
    if (d < minDistance) {
      minDistance = d;
      closest = locality;
    }
  }

  return closest;
}

/**
 * Standard Haversine formula for distance in kilometers
 */
export function calculateHaversineDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}
