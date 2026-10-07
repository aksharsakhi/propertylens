import React from 'react';
import Link from 'next/link';
import { Shield, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-400 py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        
        {/* Brand & Purpose */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-brand-500/20 flex items-center justify-center border border-brand-500/30">
              <Shield className="w-4 h-4 text-brand-400" />
            </div>
            <span className="text-lg font-bold text-white">PropertyLens</span>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed max-w-md">
            AI-powered property decision intelligence for India. Synthesizing spatial hydrology, commute matrices, water security, and civic growth data into evidence-backed decision reports.
          </p>
          <div className="flex items-center space-x-2 text-xs text-brand-400 font-medium">
            <CheckCircle2 className="w-4 h-4 text-brand-400" />
            <span>Chennai-First MVP — 100% Free & Transparent Evidence</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Coverage & Tools</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/chennai/velachery" className="hover:text-brand-300 transition-colors">
                Velachery Flood & Transit
              </Link>
            </li>
            <li>
              <Link href="/chennai/omr" className="hover:text-brand-300 transition-colors">
                OMR IT Corridor Profile
              </Link>
            </li>
            <li>
              <Link href="/chennai/adyar" className="hover:text-brand-300 transition-colors">
                Adyar & Coastal Analysis
              </Link>
            </li>
            <li>
              <Link href="/admin" className="hover:text-brand-300 transition-colors">
                Data Source Health Monitor
              </Link>
            </li>
          </ul>
        </div>

        {/* Compliance & Legal */}
        <div>
          <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Legal & Licensing</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/privacy" className="hover:text-brand-300 transition-colors">
                Privacy Policy (DPDP Act)
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-brand-300 transition-colors">
                Terms of Service & Disclaimer
              </Link>
            </li>
            <li>
              <a
                href="https://www.openstreetmap.org/copyright"
                target="_blank"
                rel="noreferrer"
                className="hover:text-brand-300 transition-colors"
              >
                © OpenStreetMap Contributors
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Legal Boundary Alert */}
      <div className="max-w-7xl mx-auto pt-6 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <div className="flex items-start space-x-2 max-w-3xl">
          <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <p className="leading-normal">
            <strong>Informational Decision Support Disclaimer:</strong> PropertyLens provides decision support based on public government spatial layers and open datasets. It does not constitute legal, structural, medical, environmental, or financial due diligence. Users are encouraged to perform physical pre-token verification.
          </p>
        </div>
        <p>© {new Date().getFullYear()} PropertyLens. Built for India.</p>
      </div>
    </footer>
  );
};
