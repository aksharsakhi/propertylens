'use client';

import React from 'react';
import { PropertyReport } from '../types';
import { Sparkles, Trophy, X, BarChart3, CheckCircle2 } from 'lucide-react';

interface ComparisonViewProps {
  reports: PropertyReport[];
  onRemoveReport?: (id: string) => void;
  onClose?: () => void;
}

export const ComparisonView: React.FC<ComparisonViewProps> = ({ reports, onRemoveReport, onClose }) => {
  if (reports.length === 0) {
    return (
      <div className="p-8 text-center glass-panel rounded-3xl space-y-3">
        <BarChart3 className="w-10 h-10 text-slate-500 mx-auto" />
        <h4 className="text-base font-bold text-white">No Properties Selected for Comparison</h4>
        <p className="text-xs text-slate-400 max-w-sm mx-auto">
          Analyze properties and click "Add to Compare" to compare up to 3 Chennai properties side-by-side.
        </p>
      </div>
    );
  }

  // Find best match based on personalizedScore
  let bestMatch = reports[0];
  reports.forEach(r => {
    if (r.personalizedScore > bestMatch.personalizedScore) {
      bestMatch = r;
    }
  });

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-700/80 shadow-glass space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-brand-400 uppercase tracking-wider mb-1">
            <BarChart3 className="w-4 h-4" />
            <span>Multi-Property Decision Matrix</span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            Side-by-Side Property Comparison
          </h3>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Best Match Highlight Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-brand-600/20 via-teal-500/20 to-emerald-500/20 border border-brand-500/40 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-brand-500 flex items-center justify-center shadow-glow shrink-0">
            <Trophy className="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-300">Recommended Option</span>
            <h4 className="text-sm font-bold text-white">
              {bestMatch.property.address} ({bestMatch.property.locality})
            </h4>
            <p className="text-xs text-slate-300">
              Personalized Match Score: <strong className="text-brand-300">{bestMatch.personalizedScore}/100</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left text-slate-300 border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400">
              <th className="p-3 font-semibold uppercase tracking-wider w-44">Metric / Dimension</th>
              {reports.map((r, i) => (
                <th key={r.id} className="p-3 font-bold text-white">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-brand-400 text-[10px] uppercase">Property {String.fromCharCode(65 + i)}</span>
                    {onRemoveReport && (
                      <button onClick={() => onRemoveReport(r.id)} className="text-slate-500 hover:text-red-400">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <div className="text-xs font-bold truncate max-w-[180px]">{r.property.locality}</div>
                  <div className="text-[11px] text-slate-400 font-normal truncate max-w-[180px]">{r.property.address}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            
            {/* Overall Score */}
            <tr className="bg-slate-900/40">
              <td className="p-3 font-bold text-white">PropertyLens Decision Score</td>
              {reports.map(r => (
                <td key={r.id} className="p-3">
                  <span className="text-base font-extrabold text-white">{r.overallScore}</span>
                  <span className="text-[10px] text-slate-400"> / 100</span>
                </td>
              ))}
            </tr>

            {/* Personalized Match */}
            <tr>
              <td className="p-3 font-semibold text-brand-300">Personalized Match</td>
              {reports.map(r => (
                <td key={r.id} className="p-3">
                  <span className="px-2.5 py-1 rounded-full bg-brand-500/20 text-brand-300 font-bold border border-brand-500/30">
                    {r.personalizedScore} / 100
                  </span>
                </td>
              ))}
            </tr>

            {/* Flood Risk */}
            <tr>
              <td className="p-3 font-medium text-slate-300">Flood Vulnerability</td>
              {reports.map(r => {
                const floodCat = r.categories.find(c => c.id === 'flood');
                return (
                  <td key={r.id} className="p-3 font-semibold">
                    {floodCat ? `${floodCat.score} / 100` : 'N/A'}
                  </td>
                );
              })}
            </tr>

            {/* Commute */}
            <tr>
              <td className="p-3 font-medium text-slate-300">Commute Connectivity</td>
              {reports.map(r => {
                const cat = r.categories.find(c => c.id === 'commute');
                return (
                  <td key={r.id} className="p-3 font-semibold">
                    {cat ? `${cat.score} / 100` : 'N/A'}
                  </td>
                );
              })}
            </tr>

            {/* Water Supply */}
            <tr>
              <td className="p-3 font-medium text-slate-300">Water Security</td>
              {reports.map(r => {
                const cat = r.categories.find(c => c.id === 'utilities');
                return (
                  <td key={r.id} className="p-3 font-semibold">
                    {cat ? `${cat.score} / 100` : 'N/A'}
                  </td>
                );
              })}
            </tr>

            {/* Metro Transit */}
            <tr>
              <td className="p-3 font-medium text-slate-300">Public Transport</td>
              {reports.map(r => {
                const cat = r.categories.find(c => c.id === 'transport');
                return (
                  <td key={r.id} className="p-3 font-semibold">
                    {cat ? `${cat.score} / 100` : 'N/A'}
                  </td>
                );
              })}
            </tr>

            {/* Data Confidence */}
            <tr>
              <td className="p-3 font-medium text-slate-300">Data Confidence</td>
              {reports.map(r => (
                <td key={r.id} className="p-3 font-bold text-emerald-400">
                  {r.overallConfidence}
                </td>
              ))}
            </tr>

          </tbody>
        </table>
      </div>

    </div>
  );
};
