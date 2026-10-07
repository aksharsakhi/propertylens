# PropertyLens Technical Architecture

## System Architecture Overview

```
 ┌─────────────────────────────────────────────────────────────────┐
 │                      Client Layer (Next.js)                     │
 │  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────┐  │
 │  │ Address Search   │  │ MapLibre Map UI  │  │ PDF Exporter │  │
 │  └─────────┬────────┘  └────────┬─────────┘  └──────┬───────┘  │
 └────────────┼────────────────────┼───────────────────┼──────────┘
              │                    │                   │
 ┌────────────▼────────────────────▼───────────────────▼──────────┐
 │                     API Server Routes (Next.js)                 │
 │  ┌──────────────────────┐  ┌─────────────────────────────────┐  │
 │  │ Geocoding & Resolve  │  │ Spatial Query Engine (Turf/GIS) │  │
 │  └─────────┬────────────┘  └────────┬────────────────────────┘  │
 │            │                        │                           │
 │  ┌─────────▼────────────────────────▼────────────────────────┐  │
 │  │ Scoring Engine (Deterministic Metric & Weight Functions)  │  │
 │  └─────────┬─────────────────────────────────────────────────┘  │
 │            │                                                    │
 │  ┌─────────▼─────────────────────────────────────────────────┐  │
 │  │ AI Summary Engine & Fact Validator (Gemini / Fallback)    │  │
 │  └─────────┬─────────────────────────────────────────────────┘  │
 └────────────┼────────────────────────────────────────────────────┘
              │
 ┌────────────▼────────────────────────────────────────────────────┐
 │                    Data Ingestion & Store                       │
 │  ┌──────────────────────┐  ┌─────────────────────────────────┐  │
 │  │ Chennai GeoJSON DB   │  │ Source Adapters & Snapshots     │  │
 │  │ (Localities & Water) │  │ (OSM, Air Quality, Metro)       │  │
 │  └──────────────────────┘  └─────────────────────────────────┘  │
 └─────────────────────────────────────────────────────────────────┘
```

## Core Modules & Design

1. **Geocoding & Location Resolver (`src/lib/geocoding.ts`):** Resolves addresses, lat-long coordinates, or locality names to standardized spatial points using Nominatim/Photon with client-side fallback to Chennai neighborhood boundaries.
2. **Spatial Engine & Adapters (`src/lib/spatial/`):** Computes point-in-polygon and radius proximity calculations (using Turf.js and PostGIS SQL queries) against flood basins, water bodies, metro stations, bus stops, hospitals, and schools.
3. **Deterministic Score Engine (`src/lib/scoring/`):** Evaluates 10 categorical sub-scores (Flood, Commute, Healthcare, Education, Environment, Public Transport, Infrastructure, Utilities, Neighbourhood Quality, Price/Value) with transparent sub-weights and confidence calculation.
4. **AI Report Engine & Fact Validator (`src/lib/ai/`):** Formats structured spatial metrics for Gemini LLM generation, passed through an automated claim verification filter that strips unverified or hallucinated facts.
5. **PDF & Public Share Generator (`src/lib/pdf/` & `/report/[id]`):** Generates client-side printable reports and lightweight public sharing links without exposing private user parameters.
