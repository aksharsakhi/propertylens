# PropertyLens Product Specification

## 1. Vision & Purpose
PropertyLens is an AI-powered Property Intelligence and Decision Platform for India, launching with a hyper-local Chennai-first MVP. It converts fragmented urban datasets (flood risk, transit access, water availability, hospital proximity, environmental factors) into transparent, evidence-backed decision reports for renters and buyers.

## 2. Core Functional Requirements
- **Search Modes:** Full address string, Map location pin, Lat/Long coordinates, Chennai locality quick-select.
- **User Preference Inputs:** Work location, budget, preferred transit mode, priority weights (e.g. 40% commute, 30% flood safety).
- **10 Decision Categories:**
  1. Flood & Water Risk
  2. Commute & Connectivity
  3. Healthcare
  4. Education
  5. Environment (AQI, Greenery)
  6. Public Transport
  7. Infrastructure & Future Growth
  8. Utilities (Groundwater & Tanker signals)
  9. Neighbourhood Quality
  10. Price / Rental Benchmark
- **Evidence Metadata System:** Every metric must report `source_name`, `observed_at`, `confidence`, `methodology`, and `limitations`.
- **Pre-Token Due-Diligence Checklist ("Things to Verify"):** Actionable checks for buyers/renters before paying token money.
- **Property Comparison Matrix:** Side-by-side comparison of 2 to 3 properties with personalized best-fit recommendation.
- **Shareable Reports & PDF Generation:** Unique public share URLs and printable PDF generation.
- **Admin & Data Health Dashboard:** Real-time metrics on source availability, freshness, ingestion status, and AI query performance.
