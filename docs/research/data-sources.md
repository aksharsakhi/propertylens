# Geospatial Data Sources & Ingestion Strategy

## Open & Permitted Data Layers for Chennai

### 1. OpenStreetMap (OSM)
- **Coverage:** Road network, public transport nodes (MTC bus stops, suburban railway, Metro stations), amenities (schools, hospitals, pharmacies, parks, banks).
- **Licence:** Open Database License (ODbL). Commercial use permitted with attribution.
- **Ingestion:** Overpass API & Geofabrik regional extracts for Tamil Nadu / Chennai.

### 2. Chennai Metropolitan Development Authority (CMDA) Master Plans
- **Coverage:** Land use zoning, urban growth corridors, master plan boundaries.
- **Licence:** Public administrative documents for public awareness and planning.
- **Usage Strategy:** Extracted vector polygons for administrative and planning overlays; non-redistributive derived zone lookups.

### 3. OpenTopography & SRTM / NASADEM Digital Elevation Models
- **Coverage:** 30m / 12.5m elevation data across Greater Chennai.
- **Licence:** Public domain / Open Data.
- **Usage Strategy:** Terrain slope calculation and low-lying elevation basin detection to inform flood vulnerability models.

### 4. Chennai Rivers, Lakes & Canal Polygons (Bhuban / USGS / OSM Open Water Bodies)
- **Coverage:** Adyar River, Cooum River, Buckingham Canal, Pallikaranai Marshland, Kovalam Basin, major lakes (Velachery, Chembarambakkam, Puzhal, Porur).
- **Licence:** Open public spatial boundaries.
- **Usage Strategy:** Proximity buffering for waterbody encroachment and canal overflow risk calculation.

### 5. Chennai Metro Rail Limited (CMRL) Official Infrastructure Data
- **Coverage:** Phase 1 & Phase 1 Extension (Active), Phase 2 Lines (Corridor 3, 4, 5 - Under Construction / Announced).
- **Licence:** Official public transit maps & government press notices.
- **Usage Strategy:** Transport station proximity indexing with clear status labelling (`ACTIVE` vs `UNDER_CONSTRUCTION`).

### 6. CPCB / TNPCB Air Quality Index (AQI) Monitoring Stations
- **Coverage:** Real-time and historical AQI observations across Chennai monitoring stations (Manali, Alandur, Velachery, US Consulate, Royapuram).
- **Licence:** Open Government Data (OGD) Portal India.
- **Usage Strategy:** Inverse distance weighted interpolation for spatial AQI estimates.
