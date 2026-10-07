import React from 'react';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-6 text-slate-300 text-sm leading-relaxed">
      <h1 className="text-3xl font-extrabold text-white">Terms of Service & Legal Disclaimer</h1>
      <p className="text-xs text-slate-400">Last updated: October 2026</p>

      <section className="space-y-2">
        <h2 className="text-lg font-bold text-white">1. Informational Decision Support</h2>
        <p>PropertyLens provides decision support based on open government spatial layers, historical flood observation data, and public datasets. It is designed to assist renters and buyers in evaluating property surroundings.</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-bold text-white">2. No Legal, Structural or Financial Advice</h2>
        <p>PropertyLens does not replace professional due diligence, structural engineering inspections, title verification, or legal property advice. PropertyLens does not guarantee that a property is flood-proof or legally clear.</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-bold text-white">3. Data Source Attribution & Licensing</h2>
        <p>Geospatial maps and amenity queries leverage OpenStreetMap contributors (ODbL), NASADEM elevation models, Central Pollution Control Board (CPCB) feeds, and official CMRL notifications.</p>
      </section>
    </div>
  );
}
