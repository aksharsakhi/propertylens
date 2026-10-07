'use client';

import React from 'react';
import { AdminDashboard } from '../../components/AdminDashboard';
import { ShieldCheck, Activity } from 'lucide-react';

export default function AdminPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
          <Activity className="w-5 h-5 text-emerald-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">PropertyLens System & Data Health Dashboard</h1>
          <p className="text-xs text-slate-400">Internal admin monitoring for geospatial source adapters, update timestamps, and AI claim validator health.</p>
        </div>
      </div>

      <AdminDashboard />
    </div>
  );
}
