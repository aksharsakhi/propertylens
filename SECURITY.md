# Security Architecture & Rules

## Core Safeguards
- **Server-Side API Keys:** All API credentials (Gemini, Database, Map keys) are strictly confined to server environment variables and never exposed to client bundles.
- **Input Sanitization & Geocoding Constraints:** Spatial queries and search strings are validated, sanitized, and bounded to Chennai bounding box coordinates (`12.75 - 13.35 N, 80.00 - 80.35 E`) to prevent injection or out-of-scope resource waste.
- **Rate Limiting:** Built-in IP-based rate limiting on search, AI summary generation, and PDF export endpoints.
- **Security Headers:** Strict Content Security Policy (CSP), X-Content-Type-Options, X-Frame-Options, and Referrer-Policy configured in Next.js response pipeline.
