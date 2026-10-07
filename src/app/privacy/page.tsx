import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-6 text-slate-300 text-sm leading-relaxed">
      <h1 className="text-3xl font-extrabold text-white">Privacy Policy</h1>
      <p className="text-xs text-slate-400">Compliance with India’s Digital Personal Data Protection (DPDP) Act</p>

      <section className="space-y-2">
        <h2 className="text-lg font-bold text-white">1. Data Minimization</h2>
        <p>PropertyLens does not collect or retain exact user location data or private search histories. Geocoding queries are evaluated dynamically on the server without storing personally identifiable information (PII).</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-bold text-white">2. No Broker Lead Scraping or Selling</h2>
        <p>We do not sell, trade, or share user search queries or personal preferences with third-party real estate brokers or lead brokers.</p>
      </section>
    </div>
  );
}
