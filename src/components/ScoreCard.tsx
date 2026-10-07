'use client';

import React from 'react';
import { ShieldCheck, Share2, Download, HelpCircle, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';
import { ConfidenceLevel } from '../types';

interface ScoreCardProps {
  score: number; // 0 - 100
  personalizedScore: number;
  confidence: ConfidenceLevel;
  address: string;
  locality: string;
  generatedAt: string;
  onShare?: () => void;
  onDownloadPDF?: () => void;
  onOpenMethodology?: () => void;
}

export const ScoreCard: React.FC<ScoreCardProps> = ({
  score,
  personalizedScore,
  confidence,
  address,
  locality,
  generatedAt,
  onShare,
  onDownloadPDF,
  onOpenMethodology
}) => {
  // Score color tiers
  const getScoreColorClass = (val: number) => {
    if (val >= 78) return 'text-emerald-400 border-emerald-500/50 bg-emerald-500/10';
    if (val >= 60) return 'text-amber-400 border-amber-500/50 bg-amber-500/10';
    return 'text-red-400 border-red-500/50 bg-red-500/10';
  };

  const formattedDate = new Date(generatedAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-700/80 shadow-glass space-y-6 relative overflow-hidden">
      
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-brand-400 uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>PropertyLens Intelligence Report</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
            {address}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Locality: <strong className="text-slate-200">{locality}</strong> • City: <strong>Chennai</strong> • Analyzed: {formattedDate}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 shrink-0">
          {onShare && (
            <button
              onClick={onShare}
              className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-slate-600 text-xs font-semibold flex items-center space-x-1.5 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5 text-brand-400" />
              <span>Share</span>
            </button>
          )}

          {onDownloadPDF && (
            <button
              onClick={onDownloadPDF}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-brand-600 to-teal-500 text-slate-950 font-bold text-xs flex items-center space-x-1.5 hover:from-brand-500 hover:to-teal-400 transition-all shadow-glow"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export PDF</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Score Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        
        {/* Gauge 1: PropertyLens Decision Score */}
        <div className="glass-card p-5 rounded-2xl border border-slate-800 flex items-center space-x-5">
          <div className={`w-20 h-20 rounded-full border-4 flex flex-col items-center justify-center shrink-0 shadow-glow ${getScoreColorClass(score)}`}>
            <span className="text-2xl font-extrabold tracking-tight leading-none">{score}</span>
            <span className="text-[9px] font-semibold opacity-80 mt-0.5">/ 100</span>
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <h3 className="text-sm font-bold text-white">PropertyLens Decision Score</h3>
              <button onClick={onOpenMethodology} title="View methodology details">
                <HelpCircle className="w-3.5 h-3.5 text-slate-400 hover:text-brand-400" />
              </button>
            </div>
            <p className="text-xs text-slate-400 mt-1 leading-normal">
              Deterministic spatial synthesis across flood, transit, water security & infrastructure.
            </p>
          </div>
        </div>

        {/* Gauge 2: Personalized Preference Match Score */}
        <div className="glass-card p-5 rounded-2xl border border-slate-800 flex items-center space-x-5">
          <div className={`w-20 h-20 rounded-full border-4 flex flex-col items-center justify-center shrink-0 ${getScoreColorClass(personalizedScore)}`}>
            <span className="text-2xl font-extrabold tracking-tight leading-none">{personalizedScore}</span>
            <span className="text-[9px] font-semibold opacity-80 mt-0.5">MATCH</span>
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              <span>Personalized Match</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-normal">
              Weighted specifically against your commute target, budget & priority sliders.
            </p>
          </div>
        </div>

        {/* Data Confidence Badge */}
        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Data Confidence</span>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
              confidence === 'HIGH' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' :
              confidence === 'MEDIUM' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' :
              'bg-red-500/20 text-red-300 border-red-500/40'
            }`}>
              {confidence} CONFIDENCE
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-normal">
            Derived from authoritative GCC, NASADEM, CPCB & OpenStreetMap verified layers.
          </p>
        </div>

      </div>
    </div>
  );
};
