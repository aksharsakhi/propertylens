# PropertyLens Scoring Methodology

## Deterministic Scoring Architecture
PropertyLens explicitly avoids asking AI/LLMs to invent or calculate numerical scores. All scores (0 to 100) are generated via deterministic spatial algorithms.

## Baseline Formula
```
Overall Decision Score = 
  (FloodRiskScore * w_flood) +
  (CommuteScore * w_commute) +
  (HealthcareScore * w_healthcare) +
  (EducationScore * w_education) +
  (TransportScore * w_transport) +
  (EnvironmentScore * w_environment) +
  (UtilitiesScore * w_utilities) +
  (InfrastructureScore * w_infra) +
  (NeighbourhoodScore * w_neighbourhood) +
  (PriceValueScore * w_price)
```

## Category Scoring Rules
1. **Flood & Water Risk (0-100):** High score = Low risk. Factors elevation (< 5m penalized), distance to river/canal (< 200m penalized), and historical inundation zone overlap.
2. **Commute & Connectivity (0-100):** Calculated from door-to-door distance and estimated transit time to user workplace destination.
3. **Healthcare & Emergency (0-100):** Exponential decaying score based on distance to nearest multi-specialty hospital (< 2km = 100, > 10km = 30).
4. **Education (0-100):** Density of verified schools within 3km radius.
5. **Transport (0-100):** Proximity to active Metro station (< 1km = 100), suburban rail, and bus stops. Planned metro adds partial bonus only if officially under construction.
6. **Environment (0-100):** Sub-weighted by AQI (< 50 = 100), park proximity, and industrial buffer distance.
7. **Utilities (0-100):** Ward municipal water supply coverage and tanker dependence signal.

## Confidence Assessment Rules
- **HIGH:** Supported by recent authoritative spatial data with high spatial resolution.
- **MEDIUM:** Supported by 1 authoritative source or medium-resolution spatial proxies.
- **LOW:** Supported by indirect, sparse, or aging datasets.
- **UNKNOWN:** Inadequate evidence; metric flagged as "Data Unavailable".
