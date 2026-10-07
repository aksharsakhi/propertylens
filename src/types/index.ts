// PropertyLens Core Types & Interfaces

export type ConfidenceLevel = 'HIGH' | 'MEDIUM' | 'LOW' | 'UNKNOWN';

export type InfrastructureStatus = 'ACTIVE' | 'UNDER_CONSTRUCTION' | 'APPROVED' | 'ANNOUNCED' | 'PROPOSED';

export interface LocationCoordinates {
  lat: number;
  lng: number;
}

export interface MetricEvidence {
  metricKey: string;
  metricName: string;
  value: number | string;
  unit?: string;
  confidence: ConfidenceLevel;
  sourceName: string;
  sourceUrl?: string;
  observedAt: string;
  dataDate: string;
  updateFrequency: string;
  methodology: string;
  limitation: string;
}

export interface CategoryScore {
  id: string;
  name: string;
  score: number; // 0 - 100
  weight: number; // Decimal e.g. 0.15
  confidence: ConfidenceLevel;
  summary: string;
  evidence: MetricEvidence[];
}

export interface PropertyDetails {
  id: string;
  address: string;
  locality: string;
  city: 'Chennai';
  pincode?: string;
  coordinates: LocationCoordinates;
  propertyType?: string; // 2BHK, 3BHK, Plot, Villa
  askingPrice?: number; // Total or monthly rent
  rentOrBuy?: 'RENT' | 'BUY';
}

export interface UserPreferences {
  workplaceAddress?: string;
  workplaceCoordinates?: LocationCoordinates;
  preferredCommuteMode?: 'CAR' | 'TWO_WHEELER' | 'METRO' | 'BUS' | 'WALK';
  monthlyBudget?: number;
  familySize?: number;
  priorityWeights: {
    flood: number;
    commute: number;
    water: number;
    healthcare: number;
    education: number;
    transport: number;
    environment: number;
    infrastructure: number;
    neighbourhood: number;
    price: number;
  };
}

export interface VerificationCheckitem {
  id: string;
  category: string;
  title: string;
  description: string;
  priority: 'CRITICAL' | 'HIGH' | 'RECOMMENDED';
  isCompleted?: boolean;
}

export interface AIReportSummary {
  executiveSummary: string;
  keyPositives: string[];
  keyConcerns: string[];
  unusualFindings: string[];
  thingsToVerify: VerificationCheckitem[];
  questionsForBrokerOwner: string[];
  personalizedRecommendation: string;
  confidenceStatement: string;
  validated: boolean;
}

export interface PropertyReport {
  id: string;
  property: PropertyDetails;
  userPreferences: UserPreferences;
  overallScore: number;
  overallConfidence: ConfidenceLevel;
  personalizedScore: number;
  categories: CategoryScore[];
  aiReport: AIReportSummary;
  generatedAt: string;
  shareableUrl: string;
}

export interface DataSourceStatus {
  sourceId: string;
  name: string;
  category: string;
  licence: string;
  lastSuccessfulFetch: string;
  lastUpdated: string;
  status: 'HEALTHY' | 'STALE' | 'FAILED' | 'REQUIRES_PERMISSION';
  coveragePercentage: number;
}
