'use client';

import React, { useEffect, useState } from 'react';
import { Shield, Radio, Activity, CheckCircle2, MapPin } from 'lucide-react';

interface LiveScanLoaderProps {
  targetLocation: string;
}

const INGESTION_STEPS = [
  'Resolving OpenStreetMap Nominatim Lat/Lng Coordinates...',
  'Querying Live Overpass API for Hospitals, Schools & Transit POIs...',
  'Fetching Live Open-Meteo Air Quality (US AQI) & Elevation Basins...',
  'Calculating Real Road Route Geometry & Peak Commute Matrix...',
  'Executing Deterministic Score Engine & AI Claim Verification Filter...'
];

export const LiveScanLoader: React.FC<LiveScanLoaderProps> = ({ targetLocation }) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < INGESTION_STEPS.length - 1 ? prev + 1 : prev));
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-brand-500/40 shadow-glass text-center space-y-6 max-w-2xl mx-auto my-12 animate-fadeIn relative overflow-hidden">
      
      {/* Sonar Radar Scanner Glow */}
      <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-2 border-brand-500/30 animate-ping" />
        <div className="absolute inset-2 rounded-full border border-teal-400/40 animate-pulse" />
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-brand-600 to-teal-400 flex items-center justify-center shadow-glow">
          <Radio className="w-10 h-10 text-slate-950 animate-spin" style={{ animationDuration: '3s' }} />
        </div>
      </div>

      <div className="space-y-2">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-semibold">
          <Activity className="w-3.5 h-3.5 text-brand-400 animate-pulse" />
          <span>REAL-TIME SPATIAL SCAN ACTIVE</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Ingesting Live Data for <span className="text-brand-300">{targetLocation}</span>
        </h3>
      </div>

      {/* Step Indicators */}
      <div className="space-y-2 text-left max-w-md mx-auto pt-2">
        {INGESTION_STEPS.map((stepText, idx) => {
          const isDone = idx < currentStep;
          const isCurrent = idx === currentStep;

          return (
            <div
              key={idx}
              className={`p-2.5 rounded-xl border text-xs flex items-center space-x-3 transition-all ${
                isDone
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                  : isCurrent
                  ? 'bg-brand-500/20 border-brand-500/50 text-brand-300 font-bold shadow-glow'
                  : 'bg-slate-900/50 border-slate-800 text-slate-500'
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : isCurrent ? (
                <div className="w-4 h-4 border-2 border-brand-400 border-t-transparent rounded-full animate-spin shrink-0" />
              ) : (
                <div className="w-4 h-4 rounded-full border border-slate-700 shrink-0" />
              )}
              <span className="truncate">{stepText}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
