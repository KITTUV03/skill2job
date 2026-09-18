'use client';

import React from 'react';
import { Filter, RotateCcw, Check, Sparkles } from 'lucide-react';
import { JobDomain, JobPortalSource, WorkMode } from '@/types';

interface FilterState {
  domain: string;
  portal: string;
  workMode: string;
  experienceLevel: string;
  minMatchScore: number;
}

interface JobFilterSidebarProps {
  filters: FilterState;
  onChange: (newFilters: FilterState) => void;
  onReset: () => void;
  totalResultsCount: number;
}

export const JobFilterSidebar: React.FC<JobFilterSidebarProps> = ({
  filters,
  onChange,
  onReset,
  totalResultsCount
}) => {
  const domains: (JobDomain | 'All Domains')[] = [
    'All Domains',
    'VLSI / Semiconductor',
    'AI / Machine Learning',
    'Software Engineering',
    'Embedded Systems',
    'Data Science & Analytics',
    'Electronics & Hardware',
    'Finance & FinTech',
    'Marketing & Growth'
  ];

  const portals: (JobPortalSource | 'All Portals')[] = [
    'All Portals',
    'LinkedIn',
    'Naukri',
    'Indeed',
    'Wellfound',
    'Foundit',
    'Glassdoor',
    'Company Career Page'
  ];

  const workModes: (WorkMode | 'All Modes')[] = ['All Modes', 'Remote', 'Hybrid', 'Onsite'];

  return (
    <div className="w-full lg:w-72 shrink-0 p-5 rounded-3xl glass-card bg-white border border-[#EAE4D7] shadow-sm space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-200">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-amber-700" />
          <span className="font-extrabold text-sm text-stone-900">Advanced Filters</span>
        </div>
        <button
          onClick={onReset}
          className="text-xs text-stone-500 hover:text-amber-800 flex items-center gap-1 font-bold transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          Reset
        </button>
      </div>

      {/* Results Indicator */}
      <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs font-bold text-amber-900 flex items-center justify-between">
        <span>Matched Opportunities</span>
        <span className="px-2.5 py-0.5 rounded-full bg-[#1C1917] text-white font-black text-xs">{totalResultsCount}</span>
      </div>

      {/* Domain Filter */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-stone-800 uppercase tracking-wider">
          Job Domain Category
        </label>
        <select
          value={filters.domain}
          onChange={(e) => onChange({ ...filters, domain: e.target.value })}
          className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 text-stone-900 font-semibold border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
        >
          {domains.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      {/* Portal Filter */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-stone-800 uppercase tracking-wider">
          Job Portal Source
        </label>
        <select
          value={filters.portal}
          onChange={(e) => onChange({ ...filters, portal: e.target.value })}
          className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 text-stone-900 font-semibold border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
        >
          {portals.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      {/* Work Mode Filter */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-stone-800 uppercase tracking-wider">
          Work Mode
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          {workModes.map((mode) => (
            <button
              key={mode}
              onClick={() => onChange({ ...filters, workMode: mode })}
              className={`px-3 py-2 text-xs font-bold rounded-xl border transition-all active:scale-95 ${
                filters.workMode === mode
                  ? 'bg-[#1C1917] text-white border-[#1C1917] shadow-sm'
                  : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Minimum AI Match Threshold Slider */}
      <div className="space-y-2 pt-2 border-t border-stone-200">
        <div className="flex items-center justify-between text-xs font-bold text-stone-800">
          <span className="flex items-center gap-1"><Sparkles className="w-3.5 h-3.5 text-amber-600" /> Min AI Match Score</span>
          <span className="text-amber-800 font-extrabold">{filters.minMatchScore}%</span>
        </div>
        <input
          type="range"
          min="50"
          max="95"
          step="5"
          value={filters.minMatchScore}
          onChange={(e) => onChange({ ...filters, minMatchScore: Number(e.target.value) })}
          className="w-full accent-amber-600 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-stone-500 font-bold">
          <span>50%</span>
          <span>75%</span>
          <span>95%+</span>
        </div>
      </div>

    </div>
  );
};
