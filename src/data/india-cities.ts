import { IndianCityMetadata } from '../types';

export const MAJOR_INDIAN_CITIES: Record<string, IndianCityMetadata> = {
  'bengaluru': {
    name: 'Bengaluru (Bangalore)',
    slug: 'bengaluru',
    state: 'Karnataka',
    center: { lat: 12.9716, lng: 77.5946 },
    keyHubs: ['Indiranagar', 'Koramangala', 'Whitefield', 'HSR Layout', 'Electronic City', 'Marathahalli', 'Bellandur'],
    description: 'India’s Silicon Valley tech capital featuring major IT parks, Namma Metro expansion, and lake basin hydrology.'
  },
  'mumbai': {
    name: 'Mumbai',
    slug: 'mumbai',
    state: 'Maharashtra',
    center: { lat: 19.0760, lng: 72.8777 },
    keyHubs: ['Bandra', 'BKC', 'Andheri West', 'Powai', 'Lower Parel', 'Navi Mumbai', 'Thane'],
    description: 'Financial capital of India featuring coastal geography, Mumbai Suburban Railway, Metro Line 3, and high-density urban corridors.'
  },
  'delhi-ncr': {
    name: 'Delhi-NCR (Gurugram, Noida, Delhi)',
    slug: 'delhi-ncr',
    state: 'Delhi / Haryana / UP',
    center: { lat: 28.6139, lng: 77.2090 },
    keyHubs: ['Cyber City Gurugram', 'Golf Course Road', 'Noida Sector 62', 'Connaught Place', 'Vasant Kunj', 'Dwarka'],
    description: 'National Capital Region featuring extensive Delhi Metro networks, expressway corridors, and seasonal air quality variance.'
  },
  'hyderabad': {
    name: 'Hyderabad',
    slug: 'hyderabad',
    state: 'Telangana',
    center: { lat: 17.3850, lng: 78.4867 },
    keyHubs: ['HITEC City', 'Gachibowli', 'Jubilee Hills', 'Banjara Hills', 'Kondapur', 'Madhapur'],
    description: 'Major technology & pharmaceutical hub featuring Cyberabad IT belt, Hyderabad Metro Rail, and Outer Ring Road corridors.'
  },
  'chennai': {
    name: 'Chennai',
    slug: 'chennai',
    state: 'Tamil Nadu',
    center: { lat: 13.0827, lng: 80.2707 },
    keyHubs: ['Velachery', 'Adyar', 'Taramani', 'OMR Corridor', 'Anna Nagar', 'Guindy', 'Perungudi'],
    description: 'Automotive & IT hub featuring coastal monsoon hydrology, CMRL Phase 2 expansion, and Metrowater grid infrastructure.'
  },
  'pune': {
    name: 'Pune',
    slug: 'pune',
    state: 'Maharashtra',
    center: { lat: 18.5204, lng: 73.8567 },
    keyHubs: ['Hinjawadi', 'Kharadi', 'Baner', 'Viman Nagar', 'Wakad', 'Koregaon Park'],
    description: 'Education & IT hub in Maharashtra featuring Pune Metro expansion, Mula-Mutha river basin, and hilly topography.'
  },
  'kolkata': {
    name: 'Kolkata',
    slug: 'kolkata',
    state: 'West Bengal',
    center: { lat: 22.5726, lng: 88.3639 },
    keyHubs: ['Salt Lake Sector V', 'New Town', 'Ballygunge', 'Park Street', 'Rajarhat', 'Alipore'],
    description: 'Cultural capital of Eastern India featuring East-West Underwater Metro, Salt Lake IT SEZs, and Hooghly riverbank proximity.'
  },
  'ahmedabad': {
    name: 'Ahmedabad',
    slug: 'ahmedabad',
    state: 'Gujarat',
    center: { lat: 23.0225, lng: 72.5714 },
    keyHubs: ['SG Highway', 'Bodakdev', 'Prahlad Nagar', 'GIFT City', 'Satellite', 'Navrangpura'],
    description: 'Commercial & textile hub featuring Sabarmati Riverfront, GIFT City financial corridor, and Gujarat Metro.'
  },
  'kochi': {
    name: 'Kochi',
    slug: 'kochi',
    state: 'Kerala',
    center: { lat: 9.9312, lng: 76.2673 },
    keyHubs: ['Kakkanad', 'Infopark', 'Edappally', 'Marine Drive', 'MG Road', 'Vyttila'],
    description: 'Port city & Kerala IT capital featuring Kochi Water Metro, Infopark tech SEZ, and backwater coastal hydrology.'
  },
  'jaipur': {
    name: 'Jaipur',
    slug: 'jaipur',
    state: 'Rajasthan',
    center: { lat: 26.9124, lng: 75.7873 },
    keyHubs: ['Malviya Nagar', 'Vaishali Nagar', 'C-Scheme', 'Mansarovar', 'Jagatpura'],
    description: 'Heritage & tourism hub in Rajasthan featuring Jaipur Metro, planned urban sectors, and semi-arid terrain.'
  }
};
