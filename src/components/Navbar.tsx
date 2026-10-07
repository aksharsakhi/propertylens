'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, MapPin, BarChart3, Activity, Layers } from 'lucide-react';

interface NavbarProps {
  onOpenCompare?: () => void;
  onOpenAdmin?: () => void;
  compareCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCompare,
  onOpenAdmin,
  compareCount = 0
}) => {
  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Tagline */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-teal-300 flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform duration-200">
            <Shield className="w-5 h-5 text-slate-950 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold tracking-tight text-white font-sans">
                Property<span className="text-brand-400">Lens</span>
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30">
                CHENNAI MVP
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
              Know the property before you commit.
            </p>
          </div>
        </Link>

        {/* Right Navigation & Tools */}
        <div className="flex items-center space-x-3">
          
          {/* Quick Locality Dropdown / Link */}
          <Link
            href="/chennai/velachery"
            className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-brand-400" />
            <span>Chennai Localities</span>
          </Link>

          {/* Property Comparison Trigger */}
          {onOpenCompare && (
            <button
              onClick={onOpenCompare}
              className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold text-teal-300 bg-slate-900 border border-teal-500/30 rounded-lg hover:bg-teal-500/10 hover:border-teal-500/50 transition-all shadow-sm"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Compare</span>
              {compareCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 rounded-full bg-brand-500 text-slate-950 font-bold text-[10px]">
                  {compareCount}
                </span>
              )}
            </button>
          )}

          {/* Admin Health Status */}
          <Link
            href="/admin"
            className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-emerald-400 rounded-lg hover:bg-slate-800/60 transition-colors"
          >
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Data Health</span>
          </Link>

        </div>
      </div>
    </header>
  );
};
