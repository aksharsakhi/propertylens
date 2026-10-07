# Deployment & Setup Guide

## Local Zero-Cost Setup
PropertyLens can run 100% free locally without requiring any paid third-party subscriptions or cloud services:

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Environment Variables (.env.local):**
   Copy `.env.example` to `.env.local`. All API keys are optional with intelligent built-in spatial fallback algorithms.

3. **Database & Seed Data:**
   In-memory spatial engine & local JSON databases pre-loaded with Chennai neighbourhood spatial layers (Velachery, Adyar, OMR, Perungudi, Anna Nagar, Guindy, Medavakkam, etc.).

4. **Launch Dev Server:**
   ```bash
   npm run dev
   ```

5. **Build & Production Check:**
   ```bash
   npm run build
   npm run start
   ```

## Production Deployment (Vercel & Supabase)
- **Frontend & API Routes:** Vercel (Free Tier)
- **Geospatial Database:** Supabase Postgres + PostGIS (Free Tier)
