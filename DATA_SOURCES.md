# Data Sources Specification

## Primary Ingestion Categories

### 1. Flood & Hydrology
- **Sources:** GCC Drain Vectors, OpenStreetMap Canal & Lake Polygons, NASADEM Elevation Basins, Historical Inundation Markers (2015, 2023, 2024 monsoon events).
- **Indicators:** Flood Zone Index, Waterbody Buffer Proximity, Basin Elevation Level, Canal Overflow Distance.

### 2. Transport & Commute
- **Sources:** CMRL Station Vectors (Corridor 1-5), MTC Bus Station Points, OSRM Routing Engine, Southern Railway Suburban Network.
- **Indicators:** Metro Distance (Active vs Planned), Bus Stop Density, Peak Hour Travel Duration.

### 3. Amenities (Healthcare & Education)
- **Sources:** OSM Amenity Queries, GCC Healthcare Directory, TN Education Registry.
- **Indicators:** Emergency Hospital Distance, CBSE/Matriculation School Count within 3km.

### 4. Environment & Utilities
- **Sources:** CPCB AQI Live Feed, OpenStreetMap Greenery/Park Boundaries, Metrowater Ward Grid Data.
- **Indicators:** Average AQI, Industrial Buffer Distance, Groundwater / Tanker Reliance Signal.
