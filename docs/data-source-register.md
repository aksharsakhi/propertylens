# Data Source Register & Licensing Audit

| Source Name | Data Owner / Publisher | Source URL | Licence / Terms | Commercial Use? | Attribution Required? | Ingestion Method | Allowed in Production? | Limitations / Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **OpenStreetMap** | OpenStreetMap Foundation | https://openstreetmap.org | Open Database License (ODbL) | Yes | Yes ("© OpenStreetMap contributors") | Overpass API / Nominatim | YES | Community-contributed POIs & roads |
| **OpenTopography (SRTM 30m)** | NASA / USGS | https://opentopography.org | Public Domain | Yes | Optional | GeoTIFF / Raster DEM | YES | Elevation grid resolution 30m |
| **CPCB Air Quality Data** | Central Pollution Control Board India | https://app.cpcbccr.com | OGD India License | Yes | Yes | Public API / Open Data | YES | Station-level point observations |
| **CMRL Metro Stations & Lines** | Chennai Metro Rail Ltd | https://chennaimetrorail.org | Public Transit Data | Yes (Informational) | Yes | Geospatial Vector Ingestion | YES | Infrastructure state clearly labeled (`ACTIVE` vs `UNDER_CONSTRUCTION`) |
| **GCC Zone Boundaries** | Greater Chennai Corporation | https://chennaicorporation.gov.in | Public Administrative Data | Yes | Yes | Administrative Boundary Polygons | YES | Zone and Ward boundary polygons |
| **TNGIS Spatial Layers** | Govt of Tamil Nadu | https://tngis.tn.gov.in | Government Spatial Portal | REQUIRES PERMISSION | Yes | Reference / Manual Validation | NO (FALLBACK TO OPEN OSM/DEM) | TNGIS layers marked restricted for direct commercial redistribution; open hydrology datasets used as fallback |
| **Open Route Service / OSRM** | Project OSRM / OpenRouteService | https://router.project-osrm.org | BSD / ODbL | Yes | Yes | Public Routing API / Local Haversine Fallback | YES | Distance & route duration estimates |
