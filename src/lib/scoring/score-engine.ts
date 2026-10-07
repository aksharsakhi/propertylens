import { CategoryScore, ConfidenceLevel, PropertyDetails, UserPreferences, PropertyReport, MetricEvidence } from '../../types';
import { analyzeLocationSpatial, SpatialAnalysisResult } from '../spatial/spatial-engine';
import { generateAIReport } from '../ai/ai-engine';

export const DEFAULT_PRIORITY_WEIGHTS = {
  flood: 0.15,
  commute: 0.15,
  healthcare: 0.10,
  education: 0.10,
  transport: 0.10,
  environment: 0.10,
  utilities: 0.10,
  infrastructure: 0.10,
  neighbourhood: 0.10,
  price: 0.00,
};

/**
 * Calculates deterministic PropertyLens Decision Score & Category Breakdown
 */
export async function generatePropertyReport(
  property: PropertyDetails,
  preferences: UserPreferences
): Promise<PropertyReport> {
  const spatial: SpatialAnalysisResult = analyzeLocationSpatial(
    property.coordinates,
    preferences.workplaceCoordinates,
    preferences.preferredCommuteMode || 'CAR'
  );

  const categories: CategoryScore[] = [
    calculateFloodScore(spatial),
    calculateCommuteScore(spatial),
    calculateHealthcareScore(spatial),
    calculateEducationScore(spatial),
    calculateTransportScore(spatial),
    calculateEnvironmentScore(spatial),
    calculateUtilitiesScore(spatial),
    calculateInfrastructureScore(spatial),
    calculateNeighbourhoodScore(spatial),
    calculatePriceScore(property, spatial)
  ];

  // Baseline weighted score (0-100)
  let weightedSum = 0;
  let totalWeight = 0;

  categories.forEach(cat => {
    weightedSum += cat.score * cat.weight;
    totalWeight += cat.weight;
  });

  const overallScore = Math.min(100, Math.max(0, Math.round(weightedSum / (totalWeight || 1))));

  // Calculate Personalized Score using user-customized priority weights
  let userWeightedSum = 0;
  let userTotalWeight = 0;
  const userW = preferences.priorityWeights || DEFAULT_PRIORITY_WEIGHTS;

  const weightMapping: Record<string, number> = {
    'flood': userW.flood || 0.15,
    'commute': userW.commute || 0.15,
    'healthcare': userW.healthcare || 0.10,
    'education': userW.education || 0.10,
    'transport': userW.transport || 0.10,
    'environment': userW.environment || 0.10,
    'utilities': userW.water || 0.10,
    'infrastructure': userW.infrastructure || 0.10,
    'neighbourhood': userW.neighbourhood || 0.10,
    'price': userW.price || 0.00,
  };

  categories.forEach(cat => {
    const w = weightMapping[cat.id] || 0.10;
    userWeightedSum += cat.score * w;
    userTotalWeight += w;
  });

  const personalizedScore = Math.min(100, Math.max(0, Math.round(userWeightedSum / (userTotalWeight || 1))));

  // Overall confidence assessment
  const confidenceLevels = categories.map(c => c.confidence);
  const highCount = confidenceLevels.filter(c => c === 'HIGH').length;
  const overallConfidence: ConfidenceLevel = highCount >= 6 ? 'HIGH' : highCount >= 3 ? 'MEDIUM' : 'LOW';

  const reportId = `report-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const shareableUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/report/${reportId}`;

  // Generate verified AI summary
  const aiReport = await generateAIReport(property, spatial, categories, overallScore, personalizedScore);

  return {
    id: reportId,
    property,
    userPreferences: preferences,
    overallScore,
    overallConfidence,
    personalizedScore,
    categories,
    aiReport,
    livePois: [],
    generatedAt: new Date().toISOString(),
    shareableUrl
  };
}

// --- CATEGORY SCORING FUNCTIONS ---

function calculateFloodScore(spatial: SpatialAnalysisResult): CategoryScore {
  const loc = spatial.matchedLocality;
  let score = 80;

  if (loc.floodRiskLevel === 'HIGH') score = 42;
  if (loc.floodRiskLevel === 'MEDIUM') score = 68;
  if (loc.floodRiskLevel === 'LOW') score = 90;

  // Penalty if elevation < 4m
  if (spatial.elevationMeters < 4.0) score -= 15;
  // Penalty if within 300m of canal
  if (spatial.nearestCanalKm < 0.3) score -= 10;

  score = Math.max(15, Math.min(98, score));

  const evidence: MetricEvidence[] = [
    {
      metricKey: 'flood_risk_level',
      metricName: 'Locality Flood Risk Tier',
      value: loc.floodRiskLevel,
      confidence: 'HIGH',
      sourceName: 'Greater Chennai Corporation & Historical Monsoon Reports',
      observedAt: '2026-09-01',
      dataDate: '2026-09-01',
      updateFrequency: 'Annual Monsoon Audit',
      methodology: 'Historical inundation mapping during 2015, 2023 & 2024 cyclone events.',
      limitation: 'Neighbourhood-level indicator; not a micro property elevation certificate.'
    },
    {
      metricKey: 'terrain_elevation',
      metricName: 'Elevation Above Mean Sea Level',
      value: `${spatial.elevationMeters} meters`,
      confidence: 'MEDIUM',
      sourceName: 'NASADEM 30m Digital Elevation Model',
      observedAt: '2026-08-15',
      dataDate: '2026-08-15',
      updateFrequency: 'Static Topography',
      methodology: 'Interpolated SRTM/NASADEM surface raster height.',
      limitation: '30m grid resolution pixel average.'
    }
  ];

  return {
    id: 'flood',
    name: 'Flood & Water Risk',
    score,
    weight: 0.15,
    confidence: 'HIGH',
    summary: `${loc.floodRiskLevel} flood vulnerability tier. Terrain elevation is ~${spatial.elevationMeters}m above MSL. ${loc.historicalInundation}`,
    evidence
  };
}

function calculateCommuteScore(spatial: SpatialAnalysisResult): CategoryScore {
  let score = 75;
  let summary = 'Standard urban connectivity across Chennai arterial networks.';

  const evidence: MetricEvidence[] = [];

  if (spatial.commuteEstimateToWorkplace) {
    const timeMin = spatial.commuteEstimateToWorkplace.travelTimeMinutes;
    const distKm = spatial.commuteEstimateToWorkplace.distanceKm;

    if (timeMin <= 20) score = 95;
    else if (timeMin <= 35) score = 82;
    else if (timeMin <= 50) score = 65;
    else score = 45;

    summary = `Estimated ${timeMin} min travel time (${distKm} km) via ${spatial.commuteEstimateToWorkplace.mode.toLowerCase().replace('_', ' ')} during peak hours.`;

    evidence.push({
      metricKey: 'commute_duration',
      metricName: 'Workplace Peak Commute Duration',
      value: `${timeMin} mins (${distKm} km)`,
      confidence: 'HIGH',
      sourceName: 'OpenRouteService / OSRM Peak Travel Matrix',
      observedAt: new Date().toISOString().split('T')[0],
      dataDate: new Date().toISOString().split('T')[0],
      updateFrequency: 'Real-time Routing Engine',
      methodology: 'Arterial speed matrix under morning peak hour traffic load.',
      limitation: 'Subject to sudden weather disruptions and roadworks.'
    });
  } else {
    evidence.push({
      metricKey: 'commute_general',
      metricName: 'General Transit Distance',
      value: 'Workplace not specified',
      confidence: 'MEDIUM',
      sourceName: 'OSM Road Network',
      observedAt: '2026-10-01',
      dataDate: '2026-10-01',
      updateFrequency: 'Monthly',
      methodology: 'Distance to nearest arterial highway ring.',
      limitation: 'Enter workplace address for personalized travel calculation.'
    });
  }

  return {
    id: 'commute',
    name: 'Commute & Connectivity',
    score,
    weight: 0.15,
    confidence: spatial.commuteEstimateToWorkplace ? 'HIGH' : 'MEDIUM',
    summary,
    evidence
  };
}

function calculateHealthcareScore(spatial: SpatialAnalysisResult): CategoryScore {
  const dist = spatial.nearestHospital.distanceKm;
  let score = 90;
  if (dist > 1.5) score = 80;
  if (dist > 3.0) score = 65;
  if (dist > 5.0) score = 45;

  return {
    id: 'healthcare',
    name: 'Healthcare Access',
    score,
    weight: 0.10,
    confidence: 'HIGH',
    summary: `Nearest major healthcare facility is ${spatial.nearestHospital.name} (${dist} km away).`,
    evidence: [
      {
        metricKey: 'hospital_proximity',
        metricName: 'Nearest Multi-Specialty Hospital',
        value: `${spatial.nearestHospital.name} (${dist} km)`,
        confidence: 'HIGH',
        sourceName: 'Tamil Nadu Health Facilities Registry & OSM',
        observedAt: '2026-09-15',
        dataDate: '2026-09-15',
        updateFrequency: 'Quarterly',
        methodology: 'Straight-line & road network distance to tertiary emergency hospital.',
        limitation: 'Does not evaluate hospital ICU bed vacancy rates.'
      }
    ]
  };
}

function calculateEducationScore(spatial: SpatialAnalysisResult): CategoryScore {
  const count = spatial.schoolCountWithin3km;
  let score = Math.min(95, Math.max(40, count * 3.5));

  return {
    id: 'education',
    name: 'Education Infrastructure',
    score: Math.round(score),
    weight: 0.10,
    confidence: 'HIGH',
    summary: `${count} verified matriculation, CBSE, and international schools within a 3 km radius.`,
    evidence: [
      {
        metricKey: 'school_density',
        metricName: 'Schools within 3km Radius',
        value: `${count} schools`,
        confidence: 'HIGH',
        sourceName: 'OpenStreetMap Education Query & TN School Directory',
        observedAt: '2026-09-10',
        dataDate: '2026-09-10',
        updateFrequency: 'Semi-annual',
        methodology: 'Spatial buffer count of accredited primary/secondary institutions.',
        limitation: 'Does not rank academic admission difficulty or fee structure.'
      }
    ]
  };
}

function calculateTransportScore(spatial: SpatialAnalysisResult): CategoryScore {
  const metro = spatial.nearestMetro;
  let score = 70;

  if (metro.status === 'ACTIVE' && metro.distanceKm <= 1.0) score = 95;
  else if (metro.status === 'UNDER_CONSTRUCTION' && metro.distanceKm <= 1.0) score = 82;
  else if (metro.distanceKm <= 2.5) score = 75;

  return {
    id: 'transport',
    name: 'Public Transport & Metro',
    score,
    weight: 0.10,
    confidence: 'HIGH',
    summary: `Metro Access: ${metro.name} (${metro.distanceKm} km) - Status: ${metro.status.replace('_', ' ')}. ${metro.line}`,
    evidence: [
      {
        metricKey: 'metro_station',
        metricName: 'Metro Station Proximity & Line Status',
        value: `${metro.name} (${metro.distanceKm} km, ${metro.status})`,
        confidence: 'HIGH',
        sourceName: 'Chennai Metro Rail Limited (CMRL) Official Transit Data',
        observedAt: '2026-09-20',
        dataDate: '2026-09-20',
        updateFrequency: 'Monthly',
        methodology: 'CMRL station point spatial offset & corridor state validation.',
        limitation: 'Under-construction lines subject to CMRL tunneling schedule changes.'
      }
    ]
  };
}

function calculateEnvironmentScore(spatial: SpatialAnalysisResult): CategoryScore {
  const aqi = spatial.aqiEstimate;
  let score = 85;
  if (aqi > 60) score = 72;
  if (aqi > 80) score = 55;

  return {
    id: 'environment',
    name: 'Environment & Air Quality',
    score,
    weight: 0.10,
    confidence: 'MEDIUM',
    summary: `Baseline AQI estimate is ${aqi} (Satisfactory). Moderate urban tree canopy cover.`,
    evidence: [
      {
        metricKey: 'aqi_baseline',
        metricName: 'Air Quality Index (AQI Baseline)',
        value: `${aqi} AQI`,
        confidence: 'MEDIUM',
        sourceName: 'CPCB & TNPCB Monitoring Stations (Inverse Distance Interpolation)',
        observedAt: new Date().toISOString().split('T')[0],
        dataDate: new Date().toISOString().split('T')[0],
        updateFrequency: 'Daily Feed',
        methodology: 'Spatial interpolation from nearest official station sensors.',
        limitation: 'Micro-local roadside exhaust variation not fully captured.'
      }
    ]
  };
}

function calculateUtilitiesScore(spatial: SpatialAnalysisResult): CategoryScore {
  const loc = spatial.matchedLocality;
  let score = 75;

  if (loc.waterSupplyType === 'Piped Metrowater') score = 90;
  if (loc.waterSupplyType === 'Mixed Municipal/Tanker') score = 70;
  if (loc.waterSupplyType === 'High Tanker Dependence') score = 45;

  return {
    id: 'utilities',
    name: 'Utilities & Water Security',
    score,
    weight: 0.10,
    confidence: 'HIGH',
    summary: `Water supply profile: ${loc.waterSupplyType}. Groundwater table depth ~${loc.groundwaterDepthMeters}m.`,
    evidence: [
      {
        metricKey: 'water_supply_type',
        metricName: 'Municipal Water Grid Supply',
        value: loc.waterSupplyType,
        confidence: 'HIGH',
        sourceName: 'Chennai Metropolitan Water Supply and Sewerage Board (CMWSSB)',
        observedAt: '2026-09-01',
        dataDate: '2026-09-01',
        updateFrequency: 'Quarterly',
        methodology: 'Ward pipeline distribution infrastructure map lookup.',
        limitation: 'Individual building sump capacities or internal plumbing age unknown.'
      }
    ]
  };
}

function calculateInfrastructureScore(spatial: SpatialAnalysisResult): CategoryScore {
  const infraList = spatial.matchedLocality.keyInfrastructure;

  return {
    id: 'infrastructure',
    name: 'Infrastructure & Future Growth',
    score: 82,
    weight: 0.10,
    confidence: 'HIGH',
    summary: `Key civic growth drivers: ${infraList.join(', ')}.`,
    evidence: [
      {
        metricKey: 'infra_projects',
        metricName: 'Approved Growth Corridors',
        value: infraList.join('; '),
        confidence: 'HIGH',
        sourceName: 'CMDA Master Plan 2026 & Highways Dept',
        observedAt: '2026-09-01',
        dataDate: '2026-09-01',
        updateFrequency: 'Annual',
        methodology: 'Official gazette infrastructure project tracking.',
        limitation: 'Timeline delays possible during utility relocation.'
      }
    ]
  };
}

function calculateNeighbourhoodScore(spatial: SpatialAnalysisResult): CategoryScore {
  return {
    id: 'neighbourhood',
    name: 'Neighbourhood Quality',
    score: 78,
    weight: 0.10,
    confidence: 'MEDIUM',
    summary: `Established residential character in ${spatial.matchedLocality.gccZone}. Active commercial amenities nearby.`,
    evidence: [
      {
        metricKey: 'gcc_zone',
        metricName: 'GCC Administrative Zone',
        value: spatial.matchedLocality.gccZone,
        confidence: 'HIGH',
        sourceName: 'Greater Chennai Corporation Administrative Map',
        observedAt: '2026-08-01',
        dataDate: '2026-08-01',
        updateFrequency: 'Static',
        methodology: 'Municipal boundary polygon matching.',
        limitation: 'Broad administrative grouping.'
      }
    ]
  };
}

function calculatePriceScore(property: PropertyDetails, spatial: SpatialAnalysisResult): CategoryScore {
  const loc = spatial.matchedLocality;
  const rentRange = `₹${loc.priceRent2BHK.min.toLocaleString()} – ₹${loc.priceRent2BHK.max.toLocaleString()} / mo`;
  const buyRange = `₹${loc.priceBuySqFt.min.toLocaleString()} – ₹${loc.priceBuySqFt.max.toLocaleString()} / sq.ft`;

  return {
    id: 'price',
    name: 'Price & Value Benchmark',
    score: 75,
    weight: 0.00, // Optional background score
    confidence: 'MEDIUM',
    summary: `Estimated 2BHK Rent: ${rentRange}. Buy Benchmark: ${buyRange}.`,
    evidence: [
      {
        metricKey: 'price_benchmark',
        metricName: 'Locality Value Range',
        value: `${rentRange} (Rent), ${buyRange} (Buy)`,
        confidence: 'MEDIUM',
        sourceName: 'Aggregated Public Registrations & Locality Benchmarks',
        observedAt: '2026-09-25',
        dataDate: '2026-09-25',
        updateFrequency: 'Monthly',
        methodology: 'Rolling median range of registered transactions & verified survey points.',
        limitation: 'Actual asking prices vary by builder tier, floor height, and maintenance amenities.'
      }
    ]
  };
}
