'use client';

import React, { useState, useEffect } from 'react';
import { AddressSearch } from '../components/AddressSearch';
import { PropertyMap } from '../components/PropertyMap';
import { ScoreCard } from '../components/ScoreCard';
import { CategoryGrid } from '../components/CategoryGrid';
import { ThingsToVerify } from '../components/ThingsToVerify';
import { ComparisonView } from '../components/ComparisonView';
import { PropertyReport, UserPreferences, PropertyDetails } from '../types';
import { geocodeLocation } from '../lib/geocoding';
import { generatePropertyReport } from '../lib/scoring/score-engine';
import { saveReportToStore, getSavedReportsFromStore } from '../lib/store';
import { downloadReportPDF } from '../lib/pdf/pdf-generator';
import { Shield, Sparkles, CheckCircle2, AlertCircle, Share2, Layers, Plus, BarChart3 } from 'lucide-react';

export default function HomePage() {
  const [currentReport, setCurrentReport] = useState<PropertyReport | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [comparedReports, setComparedReports] = useState<PropertyReport[]>([]);
  const [showCompareView, setShowCompareView] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  // Default seed report for initial instant demonstration
  useEffect(() => {
    handleAnalyzeProperty('Velachery, Chennai', {
      workplaceAddress: 'Tidel Park, Chennai',
      preferredCommuteMode: 'CAR',
      monthlyBudget: 25000,
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
    try {
      const resolved = await geocodeLocation(addressQuery);

      const property: PropertyDetails = {
        id: `prop-${Date.now()}`,
        address: resolved.address,
        locality: resolved.locality,
        city: 'Chennai',
        coordinates: resolved.coordinates,
        askingPrice: preferences.monthlyBudget || 25000
      };

      const report = await generatePropertyReport(property, preferences);
      setCurrentReport(report);
      saveReportToStore(report);
    } catch (err) {
      console.error('Failed to generate property report:', err);
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
    <div className="space-y-12 pb-20">
      
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-8 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto space-y-6">
        
        {/* Sub-badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-semibold">
          <Shield className="w-3.5 h-3.5 text-brand-400" />
          <span>AI Property Intelligence & Location Decision Platform</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
          Know the property <br className="hidden sm:inline" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-300 via-teal-300 to-emerald-400">
            before you commit.
          </span>
        </h1>

        {/* Hero Subtext */}
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Check flood risk, commute time, water availability, schools, hospitals, air quality, and future infrastructure before you rent or buy in Chennai.
        </p>

        {/* Address Search Interactive Component */}
        <div className="pt-4">
          <AddressSearch onAnalyze={handleAnalyzeProperty} isLoading={isLoading} />
        </div>
      </section>

      {/* COMPARISON MODAL / DRAWER VIEW */}
      {showCompareView && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ComparisonView
            reports={comparedReports}
            onRemoveReport={handleRemoveFromCompare}
            onClose={() => setShowCompareView(false)}
          />
        </section>
      )}

      {/* PRIMARY REPORT CONTAINER */}
      {currentReport && (
        <div id="primary-report-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Top Bar with Add to Compare & Share status */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl glass-panel border border-slate-800">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold text-slate-300">
                Active Analysis for <strong>{currentReport.property.address}</strong>
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

          {/* 1. Score Card Header */}
          <ScoreCard
            score={currentReport.overallScore}
            personalizedScore={currentReport.personalizedScore}
            confidence={currentReport.overallConfidence}
            address={currentReport.property.address}
            locality={currentReport.property.locality}
            generatedAt={currentReport.generatedAt}
            onShare={handleShareReport}
            onDownloadPDF={handleExportPDF}
          />

          {/* 2. Interactive Spatial Map & AI Executive Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Map Column (7 cols) */}
            <div className="lg:col-span-7">
              <PropertyMap
                coordinates={currentReport.property.coordinates}
                addressName={currentReport.property.address}
                floodLevel={currentReport.categories.find(c => c.id === 'flood')?.score! < 50 ? 'HIGH' : 'MEDIUM'}
                height="460px"
              />
            </div>

            {/* AI Summary Column (5 cols) */}
            <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-slate-700/80 shadow-glass space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-xs font-bold text-teal-400 uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-teal-400" />
                  <span>AI Executive Decision Summary</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans font-medium">
                  {currentReport.aiReport.executiveSummary}
                </p>

                {/* Key Positives */}
                <div className="space-y-1.5 pt-2">
                  <span className="text-xs font-bold text-emerald-400 uppercase">Key Positives</span>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {currentReport.aiReport.keyPositives.map((pos, idx) => (
                      <li key={idx} className="flex items-start space-x-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{pos}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Key Concerns */}
                <div className="space-y-1.5 pt-2">
                  <span className="text-xs font-bold text-amber-400 uppercase">Watch & Risk Factors</span>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {currentReport.aiReport.keyConcerns.map((con, idx) => (
                      <li key={idx} className="flex items-start space-x-1.5">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Confidence Footer */}
              <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 italic">
                {currentReport.aiReport.confidenceStatement}
              </div>
            </div>

          </div>

          {/* 3. Comprehensive Category Breakdown */}
          <CategoryGrid categories={currentReport.categories} />

          {/* 4. Pre-Token Due-Diligence Checklist */}
          <ThingsToVerify checklist={currentReport.aiReport.thingsToVerify} />

        </div>
      )}

    </div>
  );
}
