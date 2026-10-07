'use client';

import React, { useState } from 'react';
import { Search, MapPin, SlidersHorizontal, Briefcase, IndianRupee, Car, ChevronDown, Sparkles } from 'lucide-react';
import { UserPreferences } from '../types';
import { geocodeLocation } from '../lib/geocoding';

interface AddressSearchProps {
  onAnalyze: (addressQuery: string, preferences: UserPreferences) => void;
  isLoading?: boolean;
}

const CHENNAI_QUICK_LOCALITIES = [
  'Velachery', 'Adyar', 'Taramani', 'Perungudi', 'OMR', 'Anna Nagar', 'Guindy', 'Medavakkam', 'Porur', 'Sholinganallur'
];

export const AddressSearch: React.FC<AddressSearchProps> = ({ onAnalyze, isLoading = false }) => {
  const [addressInput, setAddressInput] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [workplaceInput, setWorkplaceInput] = useState('Tidel Park, Chennai');
  const [commuteMode, setCommuteMode] = useState<'CAR' | 'TWO_WHEELER' | 'METRO' | 'BUS' | 'WALK'>('CAR');
  const [budgetInput, setBudgetInput] = useState<number>(25000);

  // Priority weights (0.0 to 1.0)
  const [weights, setWeights] = useState({
    flood: 0.25,
    commute: 0.30,
    water: 0.15,
    healthcare: 0.10,
    education: 0.10,
    transport: 0.10,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addressInput.trim()) return;

    let workplaceCoords;
    if (workplaceInput.trim()) {
      const res = await geocodeLocation(workplaceInput);
      workplaceCoords = res.coordinates;
    }

    const preferences: UserPreferences = {
      workplaceAddress: workplaceInput,
      workplaceCoordinates: workplaceCoords,
      preferredCommuteMode: commuteMode,
      monthlyBudget: budgetInput,
      priorityWeights: {
        flood: weights.flood,
        commute: weights.commute,
        water: weights.water,
        healthcare: weights.healthcare,
        education: weights.education,
        transport: weights.transport,
        environment: 0.10,
        infrastructure: 0.10,
        neighbourhood: 0.10,
        price: 0.00
      }
    };

    onAnalyze(addressInput, preferences);
  };

  const handleQuickSelect = (localityName: string) => {
    setAddressInput(`${localityName}, Chennai`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {/* Main Search Bar Card */}
      <form onSubmit={handleSubmit} className="glass-panel p-2 sm:p-3 rounded-2xl shadow-glass border border-slate-700/60 relative z-20">
        <div className="flex flex-col sm:flex-row items-center gap-2">
          
          {/* Input Field */}
          <div className="relative flex-1 w-full">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-brand-400" />
            </div>
            <input
              type="text"
              value={addressInput}
              onChange={(e) => setAddressInput(e.target.value)}
              placeholder="Enter address, locality, or lat/long (e.g. Velachery, Tidel Park, 12.9782, 80.2180)..."
              className="w-full pl-12 pr-4 py-3.5 bg-slate-900/90 text-white placeholder-slate-400 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-sm sm:text-base font-medium"
            />
          </div>

          {/* Advanced Preferences Toggle */}
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`px-3.5 py-3.5 rounded-xl border text-xs font-semibold flex items-center space-x-1.5 transition-colors shrink-0 ${
              showAdvanced
                ? 'bg-brand-500/20 border-brand-500/50 text-brand-300'
                : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4 text-brand-400" />
            <span className="hidden sm:inline">Preferences</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
          </button>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !addressInput.trim()}
            className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-brand-600 to-teal-500 hover:from-brand-500 hover:to-teal-400 text-slate-950 font-bold rounded-xl shadow-glow flex items-center justify-center space-x-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 fill-slate-950" />
                <span>Analyze Property</span>
              </>
            )}
          </button>
        </div>

        {/* Quick Locality Select Pills */}
        <div className="mt-3 flex items-center space-x-2 overflow-x-auto pb-1 pt-1 no-scrollbar text-xs">
          <span className="text-slate-400 font-medium shrink-0 flex items-center">
            Popular Chennai Hubs:
          </span>
          {CHENNAI_QUICK_LOCALITIES.map((loc) => (
            <button
              key={loc}
              type="button"
              onClick={() => handleQuickSelect(loc)}
              className="px-2.5 py-1 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-brand-500/40 text-slate-300 hover:text-white shrink-0 transition-all text-xs"
            >
              {loc}
            </button>
          ))}
        </div>
      </form>

      {/* Advanced Personalization Preferences Drawer */}
      {showAdvanced && (
        <div className="glass-panel p-5 rounded-2xl border border-slate-700/80 space-y-5 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h4 className="text-sm font-bold text-white flex items-center space-x-2">
              <SlidersHorizontal className="w-4 h-4 text-brand-400" />
              <span>Personalized Commute & Decision Priority Weights</span>
            </h4>
            <span className="text-xs text-slate-400">Customizes your PropertyLens score</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Workplace Destination */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center space-x-1.5">
                <Briefcase className="w-3.5 h-3.5 text-brand-400" />
                <span>Workplace / Frequent Destination</span>
              </label>
              <input
                type="text"
                value={workplaceInput}
                onChange={(e) => setWorkplaceInput(e.target.value)}
                placeholder="e.g. Tidel Park, DLF Cybercity, Guindy..."
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
              />
            </div>

            {/* Commute Mode */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center space-x-1.5">
                <Car className="w-3.5 h-3.5 text-brand-400" />
                <span>Preferred Travel Mode</span>
              </label>
              <select
                value={commuteMode}
                onChange={(e: any) => setCommuteMode(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:ring-1 focus:ring-brand-500"
              >
                <option value="CAR">Four-Wheeler / Cab</option>
                <option value="TWO_WHEELER">Two-Wheeler (Motorbike/Scooter)</option>
                <option value="METRO">Chennai Metro / MRTS</option>
                <option value="BUS">MTC Bus Network</option>
                <option value="WALK">Walking</option>
              </select>
            </div>

            {/* Monthly Budget */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center space-x-1.5">
                <IndianRupee className="w-3.5 h-3.5 text-brand-400" />
                <span>Monthly Rent / Budget Target</span>
              </label>
              <input
                type="number"
                value={budgetInput}
                onChange={(e) => setBudgetInput(Number(e.target.value))}
                placeholder="25000"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
              />
            </div>
          </div>

          {/* Priority Weight Sliders */}
          <div className="pt-2 border-t border-slate-800/80">
            <label className="text-xs font-semibold text-slate-300 block mb-3">
              Adjust Factor Importance (Weights):
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              
              <div className="space-y-1">
                <div className="flex justify-between text-slate-300">
                  <span>Flood Safety</span>
                  <span className="text-brand-400 font-bold">{Math.round(weights.flood * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="0.50"
                  step="0.05"
                  value={weights.flood}
                  onChange={(e) => setWeights({ ...weights, flood: parseFloat(e.target.value) })}
                  className="w-full accent-brand-500"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-slate-300">
                  <span>Commute Time</span>
                  <span className="text-brand-400 font-bold">{Math.round(weights.commute * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="0.50"
                  step="0.05"
                  value={weights.commute}
                  onChange={(e) => setWeights({ ...weights, commute: parseFloat(e.target.value) })}
                  className="w-full accent-brand-500"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-slate-300">
                  <span>Water Supply</span>
                  <span className="text-brand-400 font-bold">{Math.round(weights.water * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="0.50"
                  step="0.05"
                  value={weights.water}
                  onChange={(e) => setWeights({ ...weights, water: parseFloat(e.target.value) })}
                  className="w-full accent-brand-500"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-slate-300">
                  <span>Healthcare & Emergency</span>
                  <span className="text-brand-400 font-bold">{Math.round(weights.healthcare * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="0.50"
                  step="0.05"
                  value={weights.healthcare}
                  onChange={(e) => setWeights({ ...weights, healthcare: parseFloat(e.target.value) })}
                  className="w-full accent-brand-500"
                />
              </div>

            </div>
          </div>

        </div>
      )}
    </div>
  );
};
