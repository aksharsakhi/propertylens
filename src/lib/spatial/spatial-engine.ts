import { LocationCoordinates } from '../../types';
import { CHENNAI_LOCALITIES, ChennaiLocalityData } from '../../data/chennai-spatial';
import { calculateHaversineDistanceKm, findNearestChennaiLocality } from '../geocoding';

export interface SpatialAnalysisResult {
  coordinates: LocationCoordinates;
  matchedLocality: ChennaiLocalityData;
  elevationMeters: number;
  nearestWaterbodyKm: number;
  nearestCanalKm: number;
  nearestMetro: {
    name: string;
    distanceKm: number;
    status: 'ACTIVE' | 'UNDER_CONSTRUCTION' | 'PROPOSED';
    line: string;
  };
  nearestHospital: {
    name: string;
    distanceKm: number;
  };
  schoolCountWithin3km: number;
  aqiEstimate: number;
  commuteEstimateToWorkplace?: {
    distanceKm: number;
    travelTimeMinutes: number;
    mode: string;
  };
}

/**
 * Analyzes location coordinates against Chennai spatial datasets
 */
export function analyzeLocationSpatial(
  coords: LocationCoordinates,
  workplaceCoords?: LocationCoordinates,
  travelMode: 'CAR' | 'TWO_WHEELER' | 'METRO' | 'BUS' | 'WALK' = 'CAR'
): SpatialAnalysisResult {
  const matchedLocality = findNearestChennaiLocality(coords.lat, coords.lng);

  // Compute elevation estimate with minor perturbation based on distance from locality centroid
  const distFromCentroid = calculateHaversineDistanceKm(
    coords.lat,
    coords.lng,
    matchedLocality.center.lat,
    matchedLocality.center.lng
  );
  
  const elevationMeters = Math.max(1.5, Math.round((matchedLocality.elevationMeters + (distFromCentroid * 0.2)) * 10) / 10);

  // Distances to key waterbodies (Adyar River: 13.00, 80.25; Buckingham Canal: 12.98, 80.24; Velachery Lake: 12.97, 80.21)
  const nearestWaterbodyKm = Math.min(
    calculateHaversineDistanceKm(coords.lat, coords.lng, 13.0012, 80.2565),
    calculateHaversineDistanceKm(coords.lat, coords.lng, 12.9782, 80.2180),
    calculateHaversineDistanceKm(coords.lat, coords.lng, 13.0382, 80.1565)
  );

  const nearestCanalKm = Math.min(
    calculateHaversineDistanceKm(coords.lat, coords.lng, 12.9863, 80.2432), // Buckingham Canal
    calculateHaversineDistanceKm(coords.lat, coords.lng, 13.0213, 80.2231)  // Adyar Canal stretch
  );

  // Commute calculation to workplace if provided
  let commuteEstimateToWorkplace;
  if (workplaceCoords) {
    const distKm = calculateHaversineDistanceKm(
      coords.lat,
      coords.lng,
      workplaceCoords.lat,
      workplaceCoords.lng
    );

    // Speed multiplier by commute mode in Chennai traffic conditions
    let speedKmH = 22; // Default Car peak traffic
    if (travelMode === 'TWO_WHEELER') speedKmH = 28;
    if (travelMode === 'METRO') speedKmH = 35;
    if (travelMode === 'BUS') speedKmH = 18;
    if (travelMode === 'WALK') speedKmH = 4.5;

    const timeMin = Math.round((distKm / speedKmH) * 60) + 5; // +5 mins buffer

    commuteEstimateToWorkplace = {
      distanceKm: distKm,
      travelTimeMinutes: timeMin,
      mode: travelMode
    };
  }

  return {
    coordinates: coords,
    matchedLocality,
    elevationMeters,
    nearestWaterbodyKm,
    nearestCanalKm,
    nearestMetro: {
      name: matchedLocality.nearestMetroStation.name,
      distanceKm: Math.round((matchedLocality.nearestMetroStation.distanceKm + distFromCentroid) * 10) / 10,
      status: matchedLocality.nearestMetroStation.status,
      line: matchedLocality.nearestMetroStation.line
    },
    nearestHospital: {
      name: matchedLocality.nearestMajorHospital.name,
      distanceKm: Math.round((matchedLocality.nearestMajorHospital.distanceKm + distFromCentroid * 0.5) * 10) / 10
    },
    schoolCountWithin3km: matchedLocality.schoolDensity3km,
    aqiEstimate: matchedLocality.aqiBaseline,
    commuteEstimateToWorkplace
  };
}
