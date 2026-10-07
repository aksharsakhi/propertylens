import { geocodeLocation, findNearestChennaiLocality, calculateHaversineDistanceKm } from '../lib/geocoding';

describe('Geocoding & Location Resolver Unit Tests', () => {
  test('should resolve Lat/Lng coordinates string accurately', async () => {
    const result = await geocodeLocation('12.9782, 80.2180');
    expect(result.locality).toBe('Velachery');
    expect(result.coordinates.lat).toBeCloseTo(12.9782);
    expect(result.coordinates.lng).toBeCloseTo(80.2180);
  });

  test('should match Chennai locality names correctly', async () => {
    const result = await geocodeLocation('Adyar, Chennai');
    expect(result.locality).toBe('Adyar');
    expect(result.matchedLocalityData.gccZone).toBe('Zone 13 (Adyar)');
  });

  test('should calculate Haversine distance in kilometers accurately', () => {
    // Velachery (12.9782, 80.2180) to Taramani (12.9863, 80.2432) ~ 2.9 km
    const dist = calculateHaversineDistanceKm(12.9782, 80.2180, 12.9863, 80.2432);
    expect(dist).toBeGreaterThan(2.0);
    expect(dist).toBeLessThan(4.0);
  });
});
