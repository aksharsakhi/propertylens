'use client';

import React, { useState } from 'react';
import { CheckSquare, Square, AlertTriangle, ShieldCheck, ClipboardCheck, Info } from 'lucide-react';
import { VerificationCheckitem } from '../types';

interface ThingsToVerifyProps {
  checklist: VerificationCheckitem[];
}

export const ThingsToVerify: React.FC<ThingsToVerifyProps> = ({ checklist }) => {
  const [completedIds, setCompletedIds] = useState<Record<string, boolean>>({});

  const toggleCheck = (id: string) => {
    setCompletedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = Object.values(completedIds).filter(Boolean).length;

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-700/80 shadow-glass space-y-5">
      
      {/* Header & Progress */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
            <AlertTriangle className="w-4 h-4" />
            <span>Pre-Token Due-Diligence Checklist</span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            Things You Should Verify Before Paying Token Money
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Actionable physical verification steps based on localized Chennai spatial risks.
          </p>
        </div>

        {/* Progress Counter */}
        <div className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center space-x-2 shrink-0">
          <ClipboardCheck className="w-4 h-4 text-brand-400" />
          <span className="text-xs font-bold text-slate-200">
            {completedCount} / {checklist.length} Verified
          </span>
        </div>
      </div>

      {/* Checklist Grid */}
      <div className="space-y-3">
        {checklist.map((item) => {
          const isChecked = !!completedIds[item.id];

          return (
            <div
              key={item.id}
              onClick={() => toggleCheck(item.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start space-x-3.5 ${
                isChecked
                  ? 'bg-slate-900/40 border-brand-500/30 opacity-75'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Checkbox Icon */}
              <div className="mt-0.5 shrink-0">
                {isChecked ? (
                  <CheckSquare className="w-5 h-5 text-brand-400" />
                ) : (
                  <Square className="w-5 h-5 text-slate-500 hover:text-slate-400" />
                )}
              </div>

              {/* Content */}
              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className={`text-sm font-bold ${isChecked ? 'line-through text-slate-400' : 'text-white'}`}>
                    {item.title}
                  </h4>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                    item.priority === 'CRITICAL' ? 'bg-red-500/20 text-red-300 border-red-500/30' :
                    item.priority === 'HIGH' ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' :
                    'bg-slate-800 text-slate-400 border-slate-700'
                  }`}>
                    {item.priority}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legal Disclaimer Box */}
      <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-start space-x-2 text-xs text-slate-400">
        <Info className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
        <p className="leading-normal">
          <strong>Note:</strong> These due-diligence steps are general recommendations. PropertyLens does not provide legal advice or structural certifications.
        </p>
      </div>
    </div>
  );
};
