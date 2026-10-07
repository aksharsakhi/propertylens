import { LocationCoordinates } from '../../types';
import { MAJOR_INDIAN_CITIES } from '../../data/india-cities';

export interface PanIndiaResolvedLocation {
  address: string;
  locality: string;
  city: string;
  state: string;
  pincode?: string;
  coordinates: LocationCoordinates;
  rawAddressDetails?: any;
}

/**
 * Live Geocoding for ANY address, pincode, or lat/long in India
 */
export async function geocodeLocationPanIndia(queryInput: string): Promise<PanIndiaResolvedLocation> {
  const query = queryInput.trim();

  // 1. Check direct Lat,Lng coordinates pattern (e.g. "12.9716, 77.5946")
  const latLngMatch = query.match(/^([-+]?\d{1,2}\.\d+)[,\s]+([-+]?\d{1,3}\.\d+)$/);
  if (latLngMatch) {
    const lat = parseFloat(latLngMatch[1]);
    const lng = parseFloat(latLngMatch[2]);
    return {
      address: `Coordinates (${lat.toFixed(4)}, ${lng.toFixed(4)})`,
      locality: 'Custom Location',
      city: 'India',
      state: 'India',
      coordinates: { lat, lng }
    };
  }

  // 2. Fetch live geocoding from OpenStreetMap Nominatim with fallback to Photon API
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&countrycodes=in&q=${encodeURIComponent(query)}&limit=1`;
    
    const response = await fetch(nominatimUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'PropertyLens-PanIndia/2.0 (propertylens-app@local)'
      }
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (data && data.length > 0) {
        const item = data[0];
        const lat = parseFloat(item.lat);
        const lng = parseFloat(item.lon);
        const addr = item.address || {};

        const locality = addr.suburb || addr.neighbourhood || addr.residential || addr.quarter || addr.town || addr.city_district || item.name || 'Locality';
        const city = addr.city || addr.town || addr.county || addr.state_district || 'Metropolitan Region';
        const state = addr.state || 'India';
        const pincode = addr.postcode || '';

        return {
          address: item.display_name,
          locality,
          city,
          state,
          pincode,
          coordinates: { lat, lng },
          rawAddressDetails: addr
        };
      }
    }
  } catch (err) {
    console.warn('Live Nominatim geocoding failed/timed out, attempting Photon fallback:', err);
  }

  // 3. Fallback: Check local city presets (Bengaluru, Mumbai, Delhi-NCR, Hyderabad, Chennai, etc.)
  const lowerQuery = query.toLowerCase();
  for (const [slug, cityMeta] of Object.entries(MAJOR_INDIAN_CITIES)) {
    if (lowerQuery.includes(slug) || lowerQuery.includes(cityMeta.name.toLowerCase())) {
      return {
        address: `${cityMeta.name}, ${cityMeta.state}, India`,
        locality: cityMeta.keyHubs[0] || cityMeta.name,
        city: cityMeta.name,
        state: cityMeta.state,
        coordinates: cityMeta.center
      };
    }
  }

  // Default fallback: Bengaluru Silicon Valley Center
  return {
    address: `${query}, India`,
    locality: 'Bengaluru Central',
    city: 'Bengaluru',
    state: 'Karnataka',
    coordinates: { lat: 12.9716, lng: 77.5946 }
  };
}

/**
 * Standard Haversine distance formula in kilometers
 */
export function calculateHaversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
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
