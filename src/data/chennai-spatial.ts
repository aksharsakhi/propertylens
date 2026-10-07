import { LocationCoordinates, DataSourceStatus } from '../types';

export interface ChennaiLocalityData {
  slug: string;
  name: string;
  gccZone: string;
  center: LocationCoordinates;
  elevationMeters: number;
  floodRiskLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  historicalInundation: string;
  waterSupplyType: 'Piped Metrowater' | 'Mixed Municipal/Tanker' | 'High Tanker Dependence';
  groundwaterDepthMeters: number;
  nearestMetroStation: {
    name: string;
    distanceKm: number;
    status: 'ACTIVE' | 'UNDER_CONSTRUCTION' | 'PROPOSED';
    line: string;
  };
  nearestMajorHospital: {
    name: string;
    distanceKm: number;
  };
  schoolDensity3km: number;
  aqiBaseline: number;
  priceRent2BHK: {
    min: number;
    max: number;
    unit: '₹/month';
  };
  priceBuySqFt: {
    min: number;
    max: number;
    unit: '₹/sq.ft';
  };
  keyInfrastructure: string[];
  description: string;
}

export const CHENNAI_LOCALITIES: Record<string, ChennaiLocalityData> = {
  'velachery': {
    slug: 'velachery',
    name: 'Velachery',
    gccZone: 'Zone 13 (Adyar)',
    center: { lat: 12.9782, lng: 80.2180 },
    elevationMeters: 4.2,
    floodRiskLevel: 'HIGH',
    historicalInundation: 'Severe inundation during 2015 & 2023 monsoons due to Velachery Lake overflow & low elevation basins.',
    waterSupplyType: 'Mixed Municipal/Tanker',
    groundwaterDepthMeters: 6.5,
    nearestMetroStation: {
      name: 'Velachery MRTS / Phase 2 Metro',
      distanceKm: 0.8,
      status: 'UNDER_CONSTRUCTION',
      line: 'Corridor 3 (Madhavaram to SIPCOT)'
    },
    nearestMajorHospital: {
      name: 'Prashanth Super Speciality Hospital',
      distanceKm: 1.2
    },
    schoolDensity3km: 18,
    aqiBaseline: 62,
    priceRent2BHK: { min: 18000, max: 28000, unit: '₹/month' },
    priceBuySqFt: { min: 6500, max: 9200, unit: '₹/sq.ft' },
    keyInfrastructure: ['Velachery Flyover Network', 'CMRL Phase 2 Station', 'MRTS Line Extension'],
    description: 'Major South Chennai residential & commercial hub with high transit connectivity, bordering Velachery Lake.'
  },
  'adyar': {
    slug: 'adyar',
    name: 'Adyar',
    gccZone: 'Zone 13 (Adyar)',
    center: { lat: 13.0012, lng: 80.2565 },
    elevationMeters: 7.5,
    floodRiskLevel: 'MEDIUM',
    historicalInundation: 'Moderate riverbank vulnerability near Adyar River during extreme release events; core residential areas well drained.',
    waterSupplyType: 'Piped Metrowater',
    groundwaterDepthMeters: 4.0,
    nearestMetroStation: {
      name: 'Adyar Depot (Phase 2)',
      distanceKm: 0.5,
      status: 'UNDER_CONSTRUCTION',
      line: 'Corridor 3'
    },
    nearestMajorHospital: {
      name: 'Fortis Malar Hospital',
      distanceKm: 0.9
    },
    schoolDensity3km: 24,
    aqiBaseline: 48,
    priceRent2BHK: { min: 28000, max: 45000, unit: '₹/month' },
    priceBuySqFt: { min: 12500, max: 18000, unit: '₹/sq.ft' },
    keyInfrastructure: ['Adyar River Eco-Park', 'Lattice Bridge Road Commercial Strip', 'CMRL Phase 2'],
    description: 'Prime premium coastal neighbourhood with top schools, green spaces, and established municipal utility grids.'
  },
  'taramani': {
    slug: 'taramani',
    name: 'Taramani',
    gccZone: 'Zone 13 (Adyar)',
    center: { lat: 12.9863, lng: 80.2432 },
    elevationMeters: 6.0,
    floodRiskLevel: 'MEDIUM',
    historicalInundation: 'Local waterlogging around Buckingham Canal backwaters during peak monsoon spills.',
    waterSupplyType: 'Mixed Municipal/Tanker',
    groundwaterDepthMeters: 5.5,
    nearestMetroStation: {
      name: 'Taramani MRTS',
      distanceKm: 0.4,
      status: 'ACTIVE',
      line: 'Chennai MRTS Suburban Network'
    },
    nearestMajorHospital: {
      name: 'VHS Hospital (Voluntary Health Services)',
      distanceKm: 0.6
    },
    schoolDensity3km: 15,
    aqiBaseline: 55,
    priceRent2BHK: { min: 20000, max: 32000, unit: '₹/month' },
    priceBuySqFt: { min: 7800, max: 10500, unit: '₹/sq.ft' },
    keyInfrastructure: ['Tidel Park Tech Zone', 'Ascendas IT Park', 'CSIR Campus Road'],
    description: 'Core IT hub of Chennai housing Tidel Park, research institutes, and suburban rail links.'
  },
  'perungudi': {
    slug: 'perungudi',
    name: 'Perungudi',
    gccZone: 'Zone 14 (Perungudi)',
    center: { lat: 12.9654, lng: 80.2461 },
    elevationMeters: 5.1,
    floodRiskLevel: 'HIGH',
    historicalInundation: 'High inundation risk near Pallikaranai marshland boundary and Perungudi lake spillways.',
    waterSupplyType: 'High Tanker Dependence',
    groundwaterDepthMeters: 7.2,
    nearestMetroStation: {
      name: 'Perungudi Station (Phase 2)',
      distanceKm: 0.7,
      status: 'UNDER_CONSTRUCTION',
      line: 'Corridor 3'
    },
    nearestMajorHospital: {
      name: 'Apollo Speciality Hospital OMR',
      distanceKm: 1.5
    },
    schoolDensity3km: 14,
    aqiBaseline: 68,
    priceRent2BHK: { min: 19000, max: 30000, unit: '₹/month' },
    priceBuySqFt: { min: 6800, max: 9500, unit: '₹/sq.ft' },
    keyInfrastructure: ['OMR Expressway Corridor', 'World Trade Center Chennai', 'Perungudi Lake Basin'],
    description: 'High-density IT residential corridor adjacent to Pallikaranai marshlands and major software parks.'
  },
  'omr': {
    slug: 'omr',
    name: 'OMR (Old Mahabalipuram Road)',
    gccZone: 'Zone 14 & 15',
    center: { lat: 12.9350, lng: 80.2370 },
    elevationMeters: 5.5,
    floodRiskLevel: 'MEDIUM',
    historicalInundation: 'Variable drainage efficiency along IT corridor bypasses; roadside waterlogging during heavy storms.',
    waterSupplyType: 'High Tanker Dependence',
    groundwaterDepthMeters: 8.0,
    nearestMetroStation: {
      name: 'OMR Elevated Metro Line (Phase 2)',
      distanceKm: 0.3,
      status: 'UNDER_CONSTRUCTION',
      line: 'Corridor 3'
    },
    nearestMajorHospital: {
      name: 'Chettinad Health City Corridor',
      distanceKm: 3.0
    },
    schoolDensity3km: 16,
    aqiBaseline: 58,
    priceRent2BHK: { min: 16000, max: 28000, unit: '₹/month' },
    priceBuySqFt: { min: 5500, max: 8500, unit: '₹/sq.ft' },
    keyInfrastructure: ['Rajiv Gandhi Salai Expressway', 'CMRL Phase 2 Elevated Corridor', 'SIPCOT IT Parks'],
    description: 'Chennai’s primary IT Expressway stretch lined with major tech parks, townships, and upcoming metro line.'
  },
  'thoraipakkam': {
    slug: 'thoraipakkam',
    name: 'Thoraipakkam',
    gccZone: 'Zone 14 (Perungudi)',
    center: { lat: 12.9431, lng: 80.2394 },
    elevationMeters: 4.8,
    floodRiskLevel: 'HIGH',
    historicalInundation: 'Low-elevation wetland catchment area prone to standing water during heavy monsoon spells.',
    waterSupplyType: 'High Tanker Dependence',
    groundwaterDepthMeters: 7.8,
    nearestMetroStation: {
      name: 'Thoraipakkam Junction (Phase 2)',
      distanceKm: 0.5,
      status: 'UNDER_CONSTRUCTION',
      line: 'Corridor 3'
    },
    nearestMajorHospital: {
      name: 'Aakash Hospital OMR',
      distanceKm: 1.1
    },
    schoolDensity3km: 12,
    aqiBaseline: 64,
    priceRent2BHK: { min: 17000, max: 26000, unit: '₹/month' },
    priceBuySqFt: { min: 6200, max: 8800, unit: '₹/sq.ft' },
    keyInfrastructure: ['Radial Road Flyover', '200 Feet Pallavaram-Thoraipakkam Road', 'Upcoming Metro Station'],
    description: 'Strategic junction connecting OMR IT corridor with GST Road via Pallavaram Radial Road.'
  },
  'sholinganallur': {
    slug: 'sholinganallur',
    name: 'Sholinganallur',
    gccZone: 'Zone 15 (Sholinganallur)',
    center: { lat: 12.9010, lng: 80.2279 },
    elevationMeters: 4.5,
    floodRiskLevel: 'HIGH',
    historicalInundation: 'Low-lying marshland proximity; waterlogging observed in internal residential layouts in 2023.',
    waterSupplyType: 'High Tanker Dependence',
    groundwaterDepthMeters: 8.5,
    nearestMetroStation: {
      name: 'Sholinganallur Junction (Phase 2)',
      distanceKm: 0.6,
      status: 'UNDER_CONSTRUCTION',
      line: 'Corridor 3 & 5 Intersection'
    },
    nearestMajorHospital: {
      name: 'Global Health City (Gleneagles)',
      distanceKm: 2.2
    },
    schoolDensity3km: 14,
    aqiBaseline: 56,
    priceRent2BHK: { min: 15000, max: 25000, unit: '₹/month' },
    priceBuySqFt: { min: 5800, max: 8200, unit: '₹/sq.ft' },
    keyInfrastructure: ['ELCOT SEZ', 'CMRL Phase 2 Major Interchange', 'ECR Link Road'],
    description: 'Major South Chennai IT nexus housing ELCOT SEZ, major software campuses, and upcoming dual-line metro hub.'
  },
  'guindy': {
    slug: 'guindy',
    name: 'Guindy',
    gccZone: 'Zone 9 & 10',
    center: { lat: 13.0067, lng: 80.2020 },
    elevationMeters: 12.0,
    floodRiskLevel: 'LOW',
    historicalInundation: 'High terrain elevation with excellent natural drainage; very minimal historical flooding.',
    waterSupplyType: 'Piped Metrowater',
    groundwaterDepthMeters: 3.5,
    nearestMetroStation: {
      name: 'Guindy Metro Station',
      distanceKm: 0.3,
      status: 'ACTIVE',
      line: 'Blue Line (Airport to Washermanpet)'
    },
    nearestMajorHospital: {
      name: 'MIOT International Hospital',
      distanceKm: 2.5
    },
    schoolDensity3km: 20,
    aqiBaseline: 60,
    priceRent2BHK: { min: 22000, max: 35000, unit: '₹/month' },
    priceBuySqFt: { min: 9500, max: 14000, unit: '₹/sq.ft' },
    keyInfrastructure: ['Guindy Industrial Estate', 'Guindy National Park', 'Chennai Airport Metro Link'],
    description: 'Gateway to South Chennai featuring Guindy National Park, industrial tech parks, and multimodal transport links.'
  },
  'nungambakkam': {
    slug: 'nungambakkam',
    name: 'Nungambakkam',
    gccZone: 'Zone 9 (Teynampet)',
    center: { lat: 13.0626, lng: 80.2415 },
    elevationMeters: 9.0,
    floodRiskLevel: 'LOW',
    historicalInundation: 'Well-established civic stormwater network; minor transient road pooling during extreme downpours.',
    waterSupplyType: 'Piped Metrowater',
    groundwaterDepthMeters: 4.2,
    nearestMetroStation: {
      name: 'Nungambakkam Station (Phase 2)',
      distanceKm: 0.4,
      status: 'UNDER_CONSTRUCTION',
      line: 'Corridor 4'
    },
    nearestMajorHospital: {
      name: 'Apollo Hospital Greams Road',
      distanceKm: 0.8
    },
    schoolDensity3km: 30,
    aqiBaseline: 52,
    priceRent2BHK: { min: 30000, max: 55000, unit: '₹/month' },
    priceBuySqFt: { min: 14000, max: 22000, unit: '₹/sq.ft' },
    keyInfrastructure: ['High Court Annex / Consulates', 'Uttamar Gandhi Salai', 'Loyola College Zone'],
    description: 'Prestigious central commercial and luxury residential district with prime healthcare institutions and consulates.'
  },
  'anna-nagar': {
    slug: 'anna-nagar',
    name: 'Anna Nagar',
    gccZone: 'Zone 8 (Anna Nagar)',
    center: { lat: 13.0878, lng: 80.2105 },
    elevationMeters: 10.5,
    floodRiskLevel: 'LOW',
    historicalInundation: 'Planned grid layout with underground drainage infrastructure; flood resilient baseline.',
    waterSupplyType: 'Piped Metrowater',
    groundwaterDepthMeters: 3.8,
    nearestMetroStation: {
      name: 'Anna Nagar Tower Metro',
      distanceKm: 0.4,
      status: 'ACTIVE',
      line: 'Green Line (Central to St. Thomas Mount)'
    },
    nearestMajorHospital: {
      name: 'MGM Healthcare',
      distanceKm: 1.2
    },
    schoolDensity3km: 32,
    aqiBaseline: 50,
    priceRent2BHK: { min: 25000, max: 42000, unit: '₹/month' },
    priceBuySqFt: { min: 11500, max: 17500, unit: '₹/sq.ft' },
    keyInfrastructure: ['Anna Tower Park', 'Second Avenue Commercial Belt', 'Active Metro Green Line'],
    description: 'Chennai’s premier planned township featuring avenue grid layout, active metro, parks, and top-tier retail.'
  },
  'porur': {
    slug: 'porur',
    name: 'Porur',
    gccZone: 'Zone 11 (Valasaravakkam)',
    center: { lat: 13.0382, lng: 80.1565 },
    elevationMeters: 8.0,
    floodRiskLevel: 'MEDIUM',
    historicalInundation: 'Proximity to Porur Lake spillways requires local elevation checks; improved drainage works completed in 2024.',
    waterSupplyType: 'Mixed Municipal/Tanker',
    groundwaterDepthMeters: 5.0,
    nearestMetroStation: {
      name: 'Porur Junction (Phase 2)',
      distanceKm: 0.6,
      status: 'UNDER_CONSTRUCTION',
      line: 'Corridor 4 & 5 Interchange'
    },
    nearestMajorHospital: {
      name: 'Sri Ramachandra Medical Centre',
      distanceKm: 1.0
    },
    schoolDensity3km: 22,
    aqiBaseline: 65,
    priceRent2BHK: { min: 16000, max: 26000, unit: '₹/month' },
    priceBuySqFt: { min: 6000, max: 8800, unit: '₹/sq.ft' },
    keyInfrastructure: ['DLF IT Park', 'Porur Flyover', 'Sri Ramachandra University Campus'],
    description: 'Major West Chennai commercial nexus home to DLF Cybercity, medical universities, and key metro intersections.'
  },
  'pallikaranai': {
    slug: 'pallikaranai',
    name: 'Pallikaranai',
    gccZone: 'Zone 14 (Perungudi)',
    center: { lat: 12.9342, lng: 80.2133 },
    elevationMeters: 2.8,
    floodRiskLevel: 'HIGH',
    historicalInundation: 'Critical wetland basin; severe flooding during heavy monsoons (2015, 2023, 2024) in un-cleared marsh zones.',
    waterSupplyType: 'High Tanker Dependence',
    groundwaterDepthMeters: 7.0,
    nearestMetroStation: {
      name: 'Medavakkam / Radial Road Metro',
      distanceKm: 1.8,
      status: 'UNDER_CONSTRUCTION',
      line: 'Corridor 5'
    },
    nearestMajorHospital: {
      name: 'Kamakshi Memorial Hospital',
      distanceKm: 1.2
    },
    schoolDensity3km: 13,
    aqiBaseline: 60,
    priceRent2BHK: { min: 14000, max: 22000, unit: '₹/month' },
    priceBuySqFt: { min: 5200, max: 7400, unit: '₹/sq.ft' },
    keyInfrastructure: ['Pallikaranai Marsh Reserve', '200 Ft Radial Road Corridor', 'NIOT Campus'],
    description: 'Fast-growing residential suburb situated near Chennai’s primary freshwater wetland ecosystem.'
  },
  'medavakkam': {
    slug: 'medavakkam',
    name: 'Medavakkam',
    gccZone: 'Zone 14 & Tambaram Corp',
    center: { lat: 12.9172, lng: 80.1922 },
    elevationMeters: 6.2,
    floodRiskLevel: 'MEDIUM',
    historicalInundation: 'Moderate inundation in peripheral low-lying streets; major arterial roads remain passable during rains.',
    waterSupplyType: 'Mixed Municipal/Tanker',
    groundwaterDepthMeters: 6.0,
    nearestMetroStation: {
      name: 'Medavakkam Junction (Phase 2)',
      distanceKm: 0.5,
      status: 'UNDER_CONSTRUCTION',
      line: 'Corridor 5'
    },
    nearestMajorHospital: {
      name: 'Global Hospital Perumbakkam',
      distanceKm: 2.0
    },
    schoolDensity3km: 17,
    aqiBaseline: 58,
    priceRent2BHK: { min: 13000, max: 22000, unit: '₹/month' },
    priceBuySqFt: { min: 5000, max: 7200, unit: '₹/sq.ft' },
    keyInfrastructure: ['Medavakkam Multi-tier Flyover', 'CMRL Phase 2 Line', 'Perumbakkam Link Road'],
    description: 'Strategic residential nexus connecting Velachery, OMR, and Tambaram with upcoming metro corridor.'
  },
  'tambaram': {
    slug: 'tambaram',
    name: 'Tambaram',
    gccZone: 'Tambaram City Municipal Corp',
    center: { lat: 12.9249, lng: 80.1000 },
    elevationMeters: 14.0,
    floodRiskLevel: 'LOW',
    historicalInundation: 'High natural elevation; minimal inundation except localized low-lying pond catchments.',
    waterSupplyType: 'Piped Metrowater',
    groundwaterDepthMeters: 4.5,
    nearestMetroStation: {
      name: 'Tambaram Railway & Proposed Metro',
      distanceKm: 0.4,
      status: 'PROPOSED',
      line: 'Airport to Tambaram Extension'
    },
    nearestMajorHospital: {
      name: 'Hindu Mission Hospital',
      distanceKm: 0.7
    },
    schoolDensity3km: 26,
    aqiBaseline: 54,
    priceRent2BHK: { min: 12000, max: 20000, unit: '₹/month' },
    priceBuySqFt: { min: 4800, max: 6800, unit: '₹/sq.ft' },
    keyInfrastructure: ['Tambaram Railway Terminal', 'Madras Christian College (MCC)', 'GST Highway Corridor'],
    description: 'Historic southern gateway to Chennai featuring major suburban rail terminus, universities, and commercial markets.'
  },
  'chromepet': {
    slug: 'chromepet',
    name: 'Chromepet',
    gccZone: 'Tambaram City Municipal Corp',
    center: { lat: 12.9516, lng: 80.1462 },
    elevationMeters: 11.0,
    floodRiskLevel: 'LOW',
    historicalInundation: 'Well-drained terrain along GST Road corridor; rare transient waterlogging during flash storms.',
    waterSupplyType: 'Piped Metrowater',
    groundwaterDepthMeters: 4.8,
    nearestMetroStation: {
      name: 'Chromepet Suburban Railway / Metro Extension',
      distanceKm: 0.3,
      status: 'PROPOSED',
      line: 'Blue Line Airport Extension'
    },
    nearestMajorHospital: {
      name: 'Rela Institute & Medical Centre',
      distanceKm: 0.8
    },
    schoolDensity3km: 21,
    aqiBaseline: 62,
    priceRent2BHK: { min: 14000, max: 22000, unit: '₹/month' },
    priceBuySqFt: { min: 5200, max: 7500, unit: '₹/sq.ft' },
    keyInfrastructure: ['MIT Anna University Campus', 'GST Road Flyover', 'Suburban Railway Station'],
    description: 'Dense residential neighborhood along GST Road home to MIT campus and major specialized medical centres.'
  },
  'mylapore': {
    slug: 'mylapore',
    name: 'Mylapore',
    gccZone: 'Zone 9 (Teynampet)',
    center: { lat: 13.0368, lng: 80.2676 },
    elevationMeters: 8.5,
    floodRiskLevel: 'LOW',
    historicalInundation: 'Historic elevated neighbourhood; minimal flood risk away from Buckingham Canal banks.',
    waterSupplyType: 'Piped Metrowater',
    groundwaterDepthMeters: 3.5,
    nearestMetroStation: {
      name: 'Thirumayilai (Mylapore) Station (Phase 2)',
      distanceKm: 0.3,
      status: 'UNDER_CONSTRUCTION',
      line: 'Corridor 3 & 4 Major Junction'
    },
    nearestMajorHospital: {
      name: 'CSI Kalyani General Hospital',
      distanceKm: 0.6
    },
    schoolDensity3km: 28,
    aqiBaseline: 46,
    priceRent2BHK: { min: 26000, max: 48000, unit: '₹/month' },
    priceBuySqFt: { min: 13500, max: 20000, unit: '₹/sq.ft' },
    keyInfrastructure: ['Kapaleeshwarar Temple Zone', 'CMRL Underground Interchange', 'Luz Church Road'],
    description: 'Cultural & historic core of Chennai featuring heritage temples, elite schools, and major underground metro hub.'
  },
  'besant-nagar': {
    slug: 'besant-nagar',
    name: 'Besant Nagar',
    gccZone: 'Zone 13 (Adyar)',
    center: { lat: 13.0002, lng: 80.2667 },
    elevationMeters: 6.8,
    floodRiskLevel: 'LOW',
    historicalInundation: 'Sandy coastal soil with rapid percolation; low flood vulnerability.',
    waterSupplyType: 'Piped Metrowater',
    groundwaterDepthMeters: 3.2,
    nearestMetroStation: {
      name: 'Adyar Depot / Besant Nagar Access',
      distanceKm: 1.2,
      status: 'UNDER_CONSTRUCTION',
      line: 'Corridor 3'
    },
    nearestMajorHospital: {
      name: 'Fortis Malar Hospital',
      distanceKm: 1.5
    },
    schoolDensity3km: 19,
    aqiBaseline: 42,
    priceRent2BHK: { min: 32000, max: 60000, unit: '₹/month' },
    priceBuySqFt: { min: 15000, max: 24000, unit: '₹/sq.ft' },
    keyInfrastructure: ['Elliot\'s Beach Promenade', 'Kalakshetra Foundation', 'Theosophical Society Gardens'],
    description: 'Upmarket coastal residential haven known for Elliot’s Beach, cultural institutions, and clean air quality.'
  },
  'kodambakkam': {
    slug: 'kodambakkam',
    name: 'Kodambakkam',
    gccZone: 'Zone 10 (Kodambakkam)',
    center: { lat: 13.0521, lng: 80.2255 },
    elevationMeters: 9.2,
    floodRiskLevel: 'MEDIUM',
    historicalInundation: 'Transient waterlogging near railway subways during extreme rain downpours.',
    waterSupplyType: 'Piped Metrowater',
    groundwaterDepthMeters: 4.5,
    nearestMetroStation: {
      name: 'Kodambakkam Station (Phase 2)',
      distanceKm: 0.4,
      status: 'UNDER_CONSTRUCTION',
      line: 'Corridor 4'
    },
    nearestMajorHospital: {
      name: 'Vijaya Hospital Vadapalani',
      distanceKm: 1.1
    },
    schoolDensity3km: 25,
    aqiBaseline: 58,
    priceRent2BHK: { min: 20000, max: 34000, unit: '₹/month' },
    priceBuySqFt: { min: 8800, max: 13000, unit: '₹/sq.ft' },
    keyInfrastructure: ['Tamil Film Industry Hub (Kollywood)', 'Kodambakkam Bridge', 'Phase 2 Metro'],
    description: 'Central media and cinema hub with strong transit links to Vadapalani metro and T. Nagar shopping districts.'
  },
  'saidapet': {
    slug: 'saidapet',
    name: 'Saidapet',
    gccZone: 'Zone 9 & 10',
    center: { lat: 13.0213, lng: 80.2231 },
    elevationMeters: 7.8,
    floodRiskLevel: 'MEDIUM',
    historicalInundation: 'Low-lying riverbank zones near Adyar River bridge require release monitoring during monsoons.',
    waterSupplyType: 'Piped Metrowater',
    groundwaterDepthMeters: 4.0,
    nearestMetroStation: {
      name: 'Saidapet Metro Station',
      distanceKm: 0.3,
      status: 'ACTIVE',
      line: 'Blue Line'
    },
    nearestMajorHospital: {
      name: 'Government Peripheral Hospital Saidapet',
      distanceKm: 0.5
    },
    schoolDensity3km: 22,
    aqiBaseline: 56,
    priceRent2BHK: { min: 18000, max: 28000, unit: '₹/month' },
    priceBuySqFt: { min: 8200, max: 11800, unit: '₹/sq.ft' },
    keyInfrastructure: ['Saidapet Metro Station', 'Anna Salai Arterial Highway', 'Adyar River Causeway'],
    description: 'Central transit corridor on Anna Salai with active metro connectivity and historic commercial markets.'
  },
  'kelambakkam': {
    slug: 'kelambakkam',
    name: 'Kelambakkam',
    gccZone: 'Chengalpattu District / OMR South',
    center: { lat: 12.7845, lng: 80.2210 },
    elevationMeters: 8.0,
    floodRiskLevel: 'LOW',
    historicalInundation: 'Low flood vulnerability; good natural surface drainage towards Kovalam backwaters.',
    waterSupplyType: 'High Tanker Dependence',
    groundwaterDepthMeters: 6.8,
    nearestMetroStation: {
      name: 'SIPCOT Kelambakkam Terminus (Phase 2)',
      distanceKm: 1.5,
      status: 'UNDER_CONSTRUCTION',
      line: 'Corridor 3 Terminus'
    },
    nearestMajorHospital: {
      name: 'Chettinad Super Speciality Hospital',
      distanceKm: 1.2
    },
    schoolDensity3km: 11,
    aqiBaseline: 45,
    priceRent2BHK: { min: 10000, max: 18000, unit: '₹/month' },
    priceBuySqFt: { min: 3800, max: 5500, unit: '₹/sq.ft' },
    keyInfrastructure: ['Chettinad Health City', 'SIPCOT IT Park Phase 2', 'OMR-ECR Link Highway'],
    description: 'Rapidly industrializing southern IT suburb anchored by SIPCOT tech park and Chettinad Health City.'
  }
};

export const DATA_SOURCES_STATUS_REGISTRY: DataSourceStatus[] = [
  {
    sourceId: 'osm-overpass',
    name: 'OpenStreetMap Overpass API',
    category: 'Amenities, Roads & Transport',
    licence: 'Open Database License (ODbL)',
    lastSuccessfulFetch: new Date().toISOString(),
    lastUpdated: '2026-10-01',
    status: 'HEALTHY',
    coveragePercentage: 98
  },
  {
    sourceId: 'nasadem-elevation',
    name: 'NASADEM Digital Elevation Model',
    category: 'Terrain & Hydrological Basins',
    licence: 'Public Domain',
    lastSuccessfulFetch: new Date().toISOString(),
    lastUpdated: '2026-08-15',
    status: 'HEALTHY',
    coveragePercentage: 100
  },
  {
    sourceId: 'cmrl-metro-spatial',
    name: 'Chennai Metro Rail Official Infrastructure Spatial Layer',
    category: 'Metro Transit Nodes',
    licence: 'Public Infrastructure Notice',
    lastSuccessfulFetch: new Date().toISOString(),
    lastUpdated: '2026-09-20',
    status: 'HEALTHY',
    coveragePercentage: 95
  },
  {
    sourceId: 'cpcb-air-quality',
    name: 'CPCB National Air Quality Index Feed',
    category: 'Environment & AQI',
    licence: 'OGD India License',
    lastSuccessfulFetch: new Date().toISOString(),
    lastUpdated: new Date().toISOString().split('T')[0],
    status: 'HEALTHY',
    coveragePercentage: 90
  },
  {
    sourceId: 'gcc-hydrology-monsoon',
    name: 'Greater Chennai Corporation Inundation Data & Ward Boundaries',
    category: 'Flood Risk & Drainage',
    licence: 'Public Administrative Dataset',
    lastSuccessfulFetch: new Date().toISOString(),
    lastUpdated: '2026-09-01',
    status: 'HEALTHY',
    coveragePercentage: 94
  },
  {
    sourceId: 'tngis-spatial-ref',
    name: 'Tamil Nadu GIS Spatial Reference Engine',
    category: 'Cadastral & Land Use Boundaries',
    licence: 'TNGIS Terms (Commercial restriction fallback enabled)',
    lastSuccessfulFetch: new Date().toISOString(),
    lastUpdated: '2026-07-10',
    status: 'REQUIRES_PERMISSION',
    coveragePercentage: 85
  }
];
