'use client';

import React, { useState } from 'react';
import { CategoryScore, MetricEvidence } from '../types';
import { Waves, Navigation, Hospital, GraduationCap, Wind, Bus, Building2, Droplets, Home, IndianRupee, Info, ExternalLink } from 'lucide-react';

interface CategoryGridProps {
  categories: CategoryScore[];
  onSelectEvidence?: (evidence: MetricEvidence) => void;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  flood: <Waves className="w-5 h-5 text-cyan-400" />,
  commute: <Navigation className="w-5 h-5 text-teal-400" />,
  healthcare: <Hospital className="w-5 h-5 text-rose-400" />,
  education: <GraduationCap className="w-5 h-5 text-amber-400" />,
  transport: <Bus className="w-5 h-5 text-indigo-400" />,
  environment: <Wind className="w-5 h-5 text-emerald-400" />,
  utilities: <Droplets className="w-5 h-5 text-blue-400" />,
  infrastructure: <Building2 className="w-5 h-5 text-purple-400" />,
  neighbourhood: <Home className="w-5 h-5 text-sky-400" />,
  price: <IndianRupee className="w-5 h-5 text-green-400" />
};

export const CategoryGrid: React.FC<CategoryGridProps> = ({ categories, onSelectEvidence }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const getScoreBadgeClass = (score: number) => {
    if (score >= 78) return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
    if (score >= 60) return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
    return 'bg-red-500/20 text-red-300 border-red-500/40';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight">
            Comprehensive Category Breakdown
          </h3>
          <p className="text-xs text-slate-400">
            10 deterministic spatial evaluation categories with source evidence metadata
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((cat) => {
          const isExpanded = expandedId === cat.id;

          return (
            <div
              key={cat.id}
              className="glass-card p-5 rounded-2xl border border-slate-800/90 hover:border-slate-700 space-y-3 transition-all"
            >
              {/* Category Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
                    {CATEGORY_ICONS[cat.id] || <Info className="w-5 h-5 text-brand-400" />}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{cat.name}</h4>
                    <span className="text-[11px] text-slate-400">
                      Weight: {Math.round(cat.weight * 100)}% • Confidence: <strong>{cat.confidence}</strong>
                    </span>
                  </div>
                </div>

                {/* Score Pill */}
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getScoreBadgeClass(cat.score)}`}>
                  {cat.score} / 100
                </span>
              </div>

              {/* Summary Text */}
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {cat.summary}
              </p>

              {/* Evidence Toggle Button */}
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={() => setExpandedId(isExpanded ? null : cat.id)}
                  className="text-xs font-semibold text-brand-400 hover:text-brand-300 flex items-center space-x-1"
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>{isExpanded ? 'Hide Evidence Metadata' : 'View Evidence & Sources'}</span>
                </button>
              </div>

              {/* Evidence Drawer Details */}
              {isExpanded && cat.evidence && cat.evidence.length > 0 && (
                <div className="mt-3 p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3 text-xs animate-fadeIn">
                  {cat.evidence.map((ev, i) => (
                    <div key={i} className="space-y-1.5 border-b border-slate-900 last:border-0 pb-2 last:pb-0">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-200">{ev.metricName}</span>
                        <span className="px-2 py-0.2 rounded bg-slate-900 text-[10px] text-slate-400 font-medium">
                          Observed: {ev.observedAt}
                        </span>
                      </div>
                      <p className="text-slate-300">
                        Metric Value: <strong className="text-brand-300">{ev.value}</strong>
                      </p>
                      <p className="text-slate-400 text-[11px]">
                        <strong>Source:</strong> {ev.sourceName}
                      </p>
                      <p className="text-slate-400 text-[11px]">
                        <strong>Methodology:</strong> {ev.methodology}
                      </p>
                      <p className="text-amber-400/90 text-[11px]">
                        <strong>Limitation:</strong> {ev.limitation}
                      </p>
                    </div>
                  ))}
                </div>
              )}

            </div>
          );
        })}
      </div>
    </div>
  );
};
