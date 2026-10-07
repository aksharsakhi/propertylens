import React from 'react';
import { notFound } from 'next/navigation';
import { CHENNAI_LOCALITIES } from '../../../data/chennai-spatial';
import { PropertyMap } from '../../../components/PropertyMap';
import { Shield, Waves, Train, Hospital, GraduationCap, IndianRupee, MapPin, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export async function generateStaticParams() {
  return Object.keys(CHENNAI_LOCALITIES).map((slug) => ({
    slug,
  }));
}

export default function LocalitySEOPage({ params }: { params: { slug: string } }) {
  const locality = CHENNAI_LOCALITIES[params.slug];

  if (!locality) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Locality Hero */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-700/80 space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-semibold">
          <MapPin className="w-3.5 h-3.5 text-brand-400" />
          <span>Chennai Neighbourhood Intelligence Index</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          {locality.name} <span className="text-brand-400">Property & Spatial Report</span>
        </h1>

        <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
          {locality.description} Administered under <strong>{locality.gccZone}</strong>.
        </p>

        <div className="pt-2 flex flex-wrap gap-3">
          <Link
            href="/"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-teal-500 text-slate-950 font-bold text-xs flex items-center space-x-2 hover:from-brand-500 hover:to-teal-400 transition-all shadow-glow"
          >
            <span>Analyze Property in {locality.name}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Flood Risk */}
        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 flex items-center space-x-1.5">
              <Waves className="w-4 h-4 text-cyan-400" />
              <span>Monsoon Flood Risk</span>
            </span>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
              locality.floodRiskLevel === 'HIGH' ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
              locality.floodRiskLevel === 'MEDIUM' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
              'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
            }`}>
              {locality.floodRiskLevel} RISK
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed pt-1">
            {locality.historicalInundation} Terrain elevation ~{locality.elevationMeters}m MSL.
          </p>
        </div>

        {/* Water Security */}
        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
          <span className="text-xs font-semibold text-slate-400 flex items-center space-x-1.5">
            <Shield className="w-4 h-4 text-blue-400" />
            <span>Water Supply & Groundwater</span>
          </span>
          <h4 className="text-sm font-bold text-white pt-1">{locality.waterSupplyType}</h4>
          <p className="text-xs text-slate-400">
            Average groundwater table depth: <strong>~{locality.groundwaterDepthMeters} meters</strong>.
          </p>
        </div>

        {/* Metro Transit */}
        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
          <span className="text-xs font-semibold text-slate-400 flex items-center space-x-1.5">
            <Train className="w-4 h-4 text-teal-400" />
            <span>Metro & Transit Network</span>
          </span>
          <h4 className="text-sm font-bold text-white pt-1">{locality.nearestMetroStation.name}</h4>
          <p className="text-xs text-slate-400">
            Distance: <strong>{locality.nearestMetroStation.distanceKm} km</strong> • Status: <strong>{locality.nearestMetroStation.status.replace('_', ' ')}</strong>
          </p>
        </div>

      </div>

      {/* Pricing Benchmarks */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-700/80 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center space-x-2">
          <IndianRupee className="w-4 h-4 text-green-400" />
          <span>{locality.name} Real Estate Price Benchmarks</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">Average 2BHK Monthly Rent</span>
            <span className="text-lg font-bold text-white">
              ₹{locality.priceRent2BHK.min.toLocaleString()} – ₹{locality.priceRent2BHK.max.toLocaleString()} / month
            </span>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">Property Purchase Benchmark</span>
            <span className="text-lg font-bold text-white">
              ₹{locality.priceBuySqFt.min.toLocaleString()} – ₹{locality.priceBuySqFt.max.toLocaleString()} / sq.ft
            </span>
          </div>
        </div>
      </div>

      {/* Spatial Map */}
      <PropertyMap
        coordinates={locality.center}
        addressName={`${locality.name}, Chennai`}
        floodLevel={locality.floodRiskLevel}
        height="400px"
      />

    </div>
  );
}
