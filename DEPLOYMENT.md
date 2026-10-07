# PropertyLens Production Deployment Guide

PropertyLens is designed to deploy 100% free on Vercel and Supabase without requiring any paid subscriptions.

---

## Option 1: Direct Vercel CLI Deployment (Recommended)

1. **Login to Vercel via CLI:**
   ```bash
   npx vercel login
   ```

2. **Deploy Staging / Preview:**
   ```bash
   npx vercel
   ```

3. **Deploy to Production:**
   ```bash
   npx vercel --prod
   ```

---

## Option 2: Continuous Deployment via GitHub

1. **Create a GitHub repository:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/propertylens.git
   git branch -M main
   git push -u origin main
   ```

2. **Import Repository to Vercel:**
   - Go to [Vercel Dashboard](https://vercel.com/new).
   - Select your GitHub `propertylens` repository.
   - Set **Framework Preset**: `Next.js`.
   - Click **Deploy**.

---

## Production Environment Variables (Optional)

Configure these variables in your Vercel Project Settings if desired:

| Variable Name | Purpose | Default Behavior |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_APP_URL` | Base canonical domain (e.g. `https://propertylens.vercel.app`) | Auto-detects domain |
| `GEMINI_API_KEY` | Google Gemini API key for dynamic AI summaries | Uses deterministic AI fallback if omitted |
| `NEXT_PUBLIC_MAPTILER_KEY` | Vector map tile key | Uses free CartoDB / OSM tiles if omitted |

---

## Production Health Checks

After deployment, verify that all core endpoints return HTTP 200:
- Homepage: `https://your-domain.vercel.app/`
- Chennai Locality Index: `https://your-domain.vercel.app/chennai/velachery`
- Data Health Admin Dashboard: `https://your-domain.vercel.app/admin`
- Terms & Privacy: `https://your-domain.vercel.app/terms` & `/privacy`
