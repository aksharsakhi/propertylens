import { validateAIReportClaims } from '../lib/ai/claim-validator';
import { AIReportSummary } from '../types';
import { analyzeLocationSpatial } from '../lib/spatial/spatial-engine';

describe('AI Claim Validator & Hallucination Filter Tests', () => {
  test('should strip unsupported 100% flood-proof or legal safety claims', () => {
    const rawReport: AIReportSummary = {
      executiveSummary: 'Test summary',
      keyPositives: [
        '100% guaranteed flood proof property',
        'Guaranteed clear legal title without dispute',
        'Convenient access to hospital'
      ],
      keyConcerns: [],
      unusualFindings: [],
      thingsToVerify: [],
      questionsForBrokerOwner: [],
      personalizedRecommendation: 'Test recommendation',
      confidenceStatement: 'Test confidence',
      validated: false
    };

    const spatial = analyzeLocationSpatial({ lat: 12.9782, lng: 80.2180 });
    const validated = validateAIReportClaims(rawReport, spatial, 75);

    // Unsupported claims must be stripped
    expect(validated.keyPositives).not.toContain('100% guaranteed flood proof property');
    expect(validated.keyPositives).not.toContain('Guaranteed clear legal title without dispute');
    expect(validated.keyPositives).toContain('Convenient access to hospital');
    expect(validated.validated).toBe(true);
    expect(validated.thingsToVerify.length).toBeGreaterThan(0);
  });
});
