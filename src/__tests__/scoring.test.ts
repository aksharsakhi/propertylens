import { generatePropertyReport } from '../lib/scoring/score-engine';
import { PropertyDetails, UserPreferences } from '../types';

describe('Deterministic Score Engine Unit Tests', () => {
  test('should generate 10 categories with evidence and deterministic overall score', async () => {
    const property: PropertyDetails = {
      id: 'test-prop-1',
      address: 'Velachery Main Road, Chennai',
      locality: 'Velachery',
      city: 'Chennai',
      coordinates: { lat: 12.9782, lng: 80.2180 }
    };

    const preferences: UserPreferences = {
      workplaceAddress: 'Tidel Park, Chennai',
      workplaceCoordinates: { lat: 12.9863, lng: 80.2432 },
      preferredCommuteMode: 'CAR',
      priorityWeights: {
        flood: 0.25,
        commute: 0.30,
        water: 0.15,
        healthcare: 0.10,
        education: 0.10,
        transport: 0.10,
        environment: 0.10,
        infrastructure: 0.10,
        neighbourhood: 0.10,
        price: 0.00
      }
    };

    const report = await generatePropertyReport(property, preferences);

    expect(report.categories.length).toBe(10);
    expect(report.overallScore).toBeGreaterThan(0);
    expect(report.overallScore).toBeLessThanOrEqual(100);
    expect(report.personalizedScore).toBeGreaterThan(0);
    expect(report.overallConfidence).toBeDefined();

    // Check that every category contains verifiable evidence metadata
    report.categories.forEach(cat => {
      expect(cat.evidence.length).toBeGreaterThan(0);
      expect(cat.evidence[0].sourceName).toBeDefined();
      expect(cat.evidence[0].methodology).toBeDefined();
      expect(cat.evidence[0].limitation).toBeDefined();
    });
  });
});
