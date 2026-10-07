'use client';

import React from 'react';
import { DATA_SOURCES_STATUS_REGISTRY } from '../data/chennai-spatial';
import { Activity, ShieldCheck, AlertCircle, RefreshCw, CheckCircle2, Database, HardDriveDownload } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const healthyCount = DATA_SOURCES_STATUS_REGISTRY.filter(s => s.status === 'HEALTHY').length;
  const totalCount = DATA_SOURCES_STATUS_REGISTRY.length;

  return (
    <div className="space-y-6">
      
      {/* Header Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400">Active Spatial Adapters</span>
            <h4 className="text-2xl font-extrabold text-white">{healthyCount} / {totalCount}</h4>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-brand-500/20 border border-brand-500/30 flex items-center justify-center">
            <Database className="w-6 h-6 text-brand-400" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400">Chennai Coverage</span>
            <h4 className="text-2xl font-extrabold text-white">96.4%</h4>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
            <HardDriveDownload className="w-6 h-6 text-indigo-400" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400">AI Claim Validation</span>
            <h4 className="text-2xl font-extrabold text-white">100% Active</h4>
          </div>
        </div>

      </div>

      {/* Source Health Table */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-700/80 shadow-glass space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-brand-400" />
            <h3 className="text-base font-bold text-white">Data Source Registry & Ingestion Health</h3>
          </div>
          <span className="text-xs text-slate-400">Live Status Feed</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-slate-300">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase font-semibold">
                <th className="p-3">Source Name</th>
                <th className="p-3">Category</th>
                <th className="p-3">Licence</th>
                <th className="p-3">Last Updated</th>
                <th className="p-3">Status</th>
                <th className="p-3">Coverage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {DATA_SOURCES_STATUS_REGISTRY.map((source) => (
                <tr key={source.sourceId} className="hover:bg-slate-900/50">
                  <td className="p-3 font-bold text-white">{source.name}</td>
                  <td className="p-3 text-slate-300">{source.category}</td>
                  <td className="p-3 text-slate-400 max-w-xs truncate">{source.licence}</td>
                  <td className="p-3 text-slate-400">{source.lastUpdated}</td>
                  <td className="p-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                      source.status === 'HEALTHY' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' :
                      source.status === 'STALE' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' :
                      source.status === 'REQUIRES_PERMISSION' ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40' :
                      'bg-red-500/20 text-red-300 border-red-500/40'
                    }`}>
                      {source.status}
                    </span>
                  </td>
                  <td className="p-3 font-semibold text-brand-300">{source.coveragePercentage}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
