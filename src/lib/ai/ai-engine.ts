import { GoogleGenerativeAI } from '@google/generative-ai';
import { CategoryScore, AIReportSummary, PropertyDetails } from '../../types';
import { SpatialAnalysisResult } from '../spatial/spatial-engine';
import { validateAIReportClaims } from './claim-validator';

/**
 * Generates an evidence-backed AI executive decision report.
 * Uses Gemini API when GEMINI_API_KEY is available; falls back to deterministic structured synthesis engine otherwise.
 */
export async function generateAIReport(
  property: PropertyDetails,
  spatial: SpatialAnalysisResult,
  categories: CategoryScore[],
  overallScore: number,
  personalizedScore: number
): Promise<AIReportSummary> {
  const loc = spatial.matchedLocality;
  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey) {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const prompt = `
You are PropertyLens AI, a factual, evidence-backed real estate decision advisor for Chennai, India.
Analyze this property spatial dataset and produce a JSON report.

PROPERTY DETAILS:
- Address: ${property.address}
- Locality: ${loc.name} (${loc.gccZone})
- Coordinates: ${property.coordinates.lat}, ${property.coordinates.lng}
- Overall Decision Score: ${overallScore}/100
- Personalized Score: ${personalizedScore}/100

SPATIAL METRICS:
- Elevation: ${spatial.elevationMeters} meters
- Flood Risk Tier: ${loc.floodRiskLevel} (${loc.historicalInundation})
- Water Supply: ${loc.waterSupplyType} (Groundwater ~${loc.groundwaterDepthMeters}m)
- Metro Transit: ${spatial.nearestMetro.name} (${spatial.nearestMetro.distanceKm} km, Status: ${spatial.nearestMetro.status})
- Nearest Hospital: ${spatial.nearestHospital.name} (${spatial.nearestHospital.distanceKm} km)
- Schools within 3km: ${spatial.schoolCountWithin3km}
- AQI Baseline: ${spatial.aqiEstimate}

CRITICAL RULES:
1. Output MUST be valid JSON only with keys: executiveSummary, keyPositives, keyConcerns, unusualFindings, questionsForBrokerOwner, personalizedRecommendation, confidenceStatement.
2. DO NOT invent facts, prices, legal title status, or claim a property is 100% flood-proof.
3. Keep tone objective, trustworthy, and decision-focused.
      `;

      const result = await model.generateContent(prompt);
      const text = result.response.text();
      const cleanJsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleanJsonStr);

      const rawReport: AIReportSummary = {
        executiveSummary: parsed.executiveSummary || `Property in ${loc.name} scores ${overallScore}/100 on PropertyLens Decision index.`,
        keyPositives: parsed.keyPositives || [`Good access to ${spatial.nearestMetro.name}`],
        keyConcerns: parsed.keyConcerns || [`${loc.floodRiskLevel} flood vulnerability tier in monsoon`],
        unusualFindings: parsed.unusualFindings || [],
        thingsToVerify: [],
        questionsForBrokerOwner: parsed.questionsForBrokerOwner || [
          `What is the building water sump capacity?`,
          `Are there past tax receipts available?`
        ],
        personalizedRecommendation: parsed.personalizedRecommendation || `Consider visiting during peak hours before token deposit.`,
        confidenceStatement: parsed.confidenceStatement || `Based on multi-source GCC and OSM spatial indicators.`,
        validated: false
      };

      return validateAIReportClaims(rawReport, spatial, overallScore);
    } catch (err) {
      console.warn('Gemini API call skipped or failed, activating deterministic AI fallback engine:', err);
    }
  }

  // --- DETERMINISTIC FALLBACK REPORT ENGINE ---
  const rawFallbackReport: AIReportSummary = {
    executiveSummary: `This property located in ${loc.name} (${loc.gccZone}) achieves a PropertyLens Decision Score of ${overallScore}/100 (Personalized Score: ${personalizedScore}/100). The locality is characterized by ${loc.floodRiskLevel.toLowerCase()} flood risk vulnerability and a ${loc.waterSupplyType.toLowerCase()} infrastructure.`,
    keyPositives: [
      `Convenient access to ${spatial.nearestHospital.name} (${spatial.nearestHospital.distanceKm} km emergency radius).`,
      `Connected to ${spatial.nearestMetro.name} (${spatial.nearestMetro.distanceKm} km - ${spatial.nearestMetro.status.replace('_', ' ')}).`,
      `${spatial.schoolCountWithin3km} accredited educational institutions within a 3 km radius.`,
      `Established GCC Zone (${loc.gccZone}) with structured commercial services.`
    ],
    keyConcerns: [
      loc.floodRiskLevel === 'HIGH' 
        ? `HIGH historical inundation vulnerability: ${loc.historicalInundation}`
        : `Moderate monsoon drainage load during peak rainfall events.`,
      loc.waterSupplyType === 'High Tanker Dependence'
        ? `High dependence on private water tankers during summer months; groundwater table ~${loc.groundwaterDepthMeters}m.`
        : `Municipal piped water supply requires verification of building sump maintenance.`
    ],
    unusualFindings: [
      `Terrain elevation is measured at ~${spatial.elevationMeters}m above mean sea level.`,
      `Baseline Air Quality Index (AQI) stands at ${spatial.aqiEstimate} (Satisfactory zone).`
    ],
    thingsToVerify: [],
    questionsForBrokerOwner: [
      `Has the ground floor or basement experienced waterlogging during recent monsoons (2023 / 2024)?`,
      `What is the ratio of municipal Metrowater supply versus private tanker deliveries in the building?`,
      `Is the latest Greater Chennai Corporation property tax receipt and building approval copy available?`,
      `What is the monthly maintenance cost and DG power-backup coverage for air conditioning/elevators?`
    ],
    personalizedRecommendation: `Based on your spatial decision profile, this property presents a solid match for urban connectivity, but requires pre-token due-diligence regarding ${loc.waterSupplyType.toLowerCase()} and monsoon drainage resilience in ${loc.name}.`,
    confidenceStatement: `High confidence spatial decision score derived from official GCC, CMRL, NASADEM, and OpenStreetMap datasets.`,
    validated: true
  };

  return validateAIReportClaims(rawFallbackReport, spatial, overallScore);
}
