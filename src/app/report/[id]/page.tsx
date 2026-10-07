'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { PropertyReport } from '../../../types';
import { getReportByIdFromStore, decodeReportPayload } from '../../../lib/store';
import { ScoreCard } from '../../../components/ScoreCard';
import { PropertyMap } from '../../../components/PropertyMap';
import { CategoryGrid } from '../../../components/CategoryGrid';
import { ThingsToVerify } from '../../../components/ThingsToVerify';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ShareableReportPage() {
  const params = useParams();
  const reportId = params.id as string;
  const [report, setReport] = useState<PropertyReport | null>(null);

  useEffect(() => {
    if (!reportId) return;

    // Try finding in local storage first
    let loaded = getReportByIdFromStore(reportId);

    // Try decoding from URL hash if present
    if (!loaded && typeof window !== 'undefined' && window.location.hash) {
      const hashStr = window.location.hash.substring(1);
      loaded = decodeReportPayload(hashStr);
    }

    setReport(loaded);
  }, [reportId]);

  if (!report) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <ShieldCheck className="w-12 h-12 text-brand-400 mx-auto" />
        <h2 className="text-xl font-bold text-white">Report Not Found or Expired</h2>
        <p className="text-xs text-slate-400">
          The requested public property report could not be loaded. You can analyze any address in Chennai directly.
        </p>
        <Link
          href="/"
          className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-brand-500 text-slate-950 font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Search</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-xs text-brand-400 hover:underline flex items-center space-x-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Analyze another property</span>
        </Link>
        <span className="text-xs text-slate-400 font-semibold px-2.5 py-1 rounded bg-slate-900 border border-slate-800">
          READ-ONLY PUBLIC REPORT
        </span>
      </div>

      <ScoreCard
        score={report.overallScore}
        personalizedScore={report.personalizedScore}
        confidence={report.overallConfidence}
        address={report.property.address}
        locality={report.property.locality}
        generatedAt={report.generatedAt}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7">
          <PropertyMap
            coordinates={report.property.coordinates}
            addressName={report.property.address}
            height="400px"
          />
        </div>
        <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-slate-700/80 space-y-3">
          <h4 className="text-sm font-bold text-white">Executive Decision Summary</h4>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">{report.aiReport.executiveSummary}</p>
        </div>
      </div>

      <CategoryGrid categories={report.categories} />
      <ThingsToVerify checklist={report.aiReport.thingsToVerify} />
    </div>
  );
}
