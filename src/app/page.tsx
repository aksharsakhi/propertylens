'use client';

import React, { useState, useEffect } from 'react';
import { AddressSearchPanIndia } from '../components/AddressSearchPanIndia';
import { InteractiveMapV2 } from '../components/InteractiveMapV2';
import { ScoreCard } from '../components/ScoreCard';
import { CategoryGrid } from '../components/CategoryGrid';
import { ThingsToVerify } from '../components/ThingsToVerify';
import { ComparisonView } from '../components/ComparisonView';
import { RadarScoreChart } from '../components/RadarScoreChart';
import { LiveScanLoader } from '../components/LiveScanLoader';
import { PropertyReport, UserPreferences } from '../types';
import { generatePanIndiaPropertyReport } from '../lib/scoring/score-engine-v2';
import { saveReportToStore } from '../lib/store';
import { downloadReportPDF } from '../lib/pdf/pdf-generator';
import { Shield, Sparkles, CheckCircle2, AlertCircle, Share2, Layers, Plus, Activity, MapPin, Radio, Compass } from 'lucide-react';

export default function HomePage() {
  const [currentReport, setCurrentReport] = useState<PropertyReport | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQueryTarget, setSearchQueryTarget] = useState('Indiranagar, Bengaluru');
  const [comparedReports, setComparedReports] = useState<PropertyReport[]>([]);
  const [showCompareView, setShowCompareView] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  // Initial demonstration analysis on Bengaluru tech hub
  useEffect(() => {
    handleAnalyzeProperty('Indiranagar, Bengaluru', {
      workplaceAddress: 'Whitefield, Bengaluru',
      preferredCommuteMode: 'CAR',
      monthlyBudget: 35000,
      priorityWeights: {
        flood: 0.25,
        commute: 0.30,
        water: 0.15,
        healthcare: 0.10,
        education: 0.10,
        transport: 0.10,
        environment: 0.10,
        infrastructure: 0.10,
        neighbourhood: 0.10,
        price: 0.00
      }
    });
  }, []);

  const handleAnalyzeProperty = async (addressQuery: string, preferences: UserPreferences) => {
    setIsLoading(true);
    setSearchQueryTarget(addressQuery);
    try {
      const report = await generatePanIndiaPropertyReport(addressQuery, preferences);
      setCurrentReport(report);
      saveReportToStore(report);
    } catch (err) {
      console.error('Failed to generate live Pan-India report:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCompare = () => {
    if (!currentReport) return;
    if (!comparedReports.some(r => r.id === currentReport.id)) {
      if (comparedReports.length >= 3) {
        alert('You can compare up to 3 properties at a time.');
        return;
      }
      setComparedReports([...comparedReports, currentReport]);
    }
    setShowCompareView(true);
  };

  const handleRemoveFromCompare = (id: string) => {
    setComparedReports(comparedReports.filter(r => r.id !== id));
  };

  const handleShareReport = () => {
    if (!currentReport) return;
    navigator.clipboard.writeText(currentReport.shareableUrl);
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2500);
  };

  const handleExportPDF = () => {
    downloadReportPDF('primary-report-container', `PropertyLens_${currentReport?.property.locality}_Report.pdf`);
  };

  return (
    <div className="space-y-12 pb-24">
      
      {/* HERO SECTION */}
      <section className="relative pt-10 pb-6 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto space-y-6">
        
        {/* Pan-India Live Status Pill */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-brand-500/20 to-teal-400/20 border border-brand-500/40 text-brand-300 text-xs font-semibold shadow-glow">
          <Activity className="w-3.5 h-3.5 text-brand-400 animate-pulse" />
          <span>PAN-INDIA LIVE LOCATION INTELLIGENCE PLATFORM</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
          Know the property <br className="hidden sm:inline" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-300 via-teal-300 to-emerald-400">
            before you commit.
          </span>
        </h1>

        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Real-time spatial analysis for ANY property address across India. Live OpenStreetMap POIs, Open-Meteo AQI, NASADEM elevation basins, OSRM peak commute routing, and evidence-backed decision reports.
        </p>

        {/* Address Search Bar */}
        <div className="pt-2">
          <AddressSearchPanIndia onAnalyze={handleAnalyzeProperty} isLoading={isLoading} />
        </div>
      </section>

      {/* LIVE SCAN LOADER OVERLAY */}
      {isLoading && <LiveScanLoader targetLocation={searchQueryTarget} />}

      {/* COMPARISON MATRIX MODAL */}
      {showCompareView && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ComparisonView
            reports={comparedReports}
            onRemoveReport={handleRemoveFromCompare}
            onClose={() => setShowCompareView(false)}
          />
        </section>
      )}

      {/* PRIMARY REPORT DASHBOARD */}
      {!isLoading && currentReport && (
        <div id="primary-report-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-fadeIn">
          
          {/* Active Location Header Banner */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl glass-panel border border-slate-800">
            <div className="flex items-center space-x-2.5">
              <span className="w-3 h-3 rounded-full bg-teal-400 animate-ping" />
              <span className="text-xs font-semibold text-slate-200">
                Live Spatial Analysis: <strong className="text-brand-300">{currentReport.property.address}</strong> ({currentReport.property.city}, {currentReport.property.state})
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={handleAddToCompare}
                className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-brand-500 text-xs font-semibold text-slate-200 flex items-center space-x-1.5 transition-colors"
              >
                <Plus className="w-3.5 h-3.5 text-brand-400" />
                <span>Add to Comparison</span>
              </button>

              {shareCopied && (
                <span className="text-xs text-emerald-400 font-bold flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>URL Copied!</span>
                </span>
              )}
            </div>
          </div>

          {/* 1. Score Card Gauge */}
          <ScoreCard
            score={currentReport.overallScore}
            personalizedScore={currentReport.personalizedScore}
            confidence={currentReport.overallConfidence}
            address={currentReport.property.address}
            locality={`${currentReport.property.locality}, ${currentReport.property.city}`}
            generatedAt={currentReport.generatedAt}
            onShare={handleShareReport}
            onDownloadPDF={handleExportPDF}
          />

          {/* 2. Interactive Map & Recharts Spider Radar Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Interactive Vector Map (7 cols) */}
            <div className="lg:col-span-7">
              <InteractiveMapV2
                coordinates={currentReport.property.coordinates}
                addressName={currentReport.property.address}
                pois={currentReport.livePois}
                height="480px"
              />
            </div>

            {/* Recharts Spider Radar Chart (5 cols) */}
            <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-slate-700/80 shadow-glass flex flex-col justify-between space-y-4">
              <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Compass className="w-5 h-5 text-brand-400" />
                  <h3 className="text-sm font-bold text-white">Spatial Decision Fingerprint</h3>
                </div>
                <span className="text-[11px] text-slate-400 font-medium">10 Dimensions</span>
              </div>

              <RadarScoreChart categories={currentReport.categories} />

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300">
                <strong>Location Fingerprint:</strong> Highest resilience in healthcare & transport connectivity; flood vulnerability evaluated against digital elevation raster.
              </div>
            </div>

          </div>

          {/* 3. AI Executive Decision Report */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-700/80 shadow-glass space-y-4">
            <div className="flex items-center space-x-2 text-xs font-bold text-teal-400 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-teal-400" />
              <span>AI Executive Decision Synthesis & Recommendations</span>
            </div>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-sans font-medium">
              {currentReport.aiReport.executiveSummary}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-3">
              
              {/* Positives */}
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">Key Decision Positives</span>
                <ul className="space-y-1.5 text-xs text-slate-200">
                  {currentReport.aiReport.keyPositives.map((pos, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{pos}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Watch Factors */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">Watch & Hazard Factors</span>
                <ul className="space-y-1.5 text-xs text-slate-200">
                  {currentReport.aiReport.keyConcerns.map((con, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

          {/* 4. Comprehensive 10-Category Breakdown with Evidence */}
          <CategoryGrid categories={currentReport.categories} />

          {/* 5. Pre-Token Due-Diligence Checklist */}
          <ThingsToVerify checklist={currentReport.aiReport.thingsToVerify} />

        </div>
      )}

    </div>
  );
}
