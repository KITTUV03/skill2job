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
    <div className="w-full lg:w-72 shrink-0 p-5 rounded-3xl glass-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-blue-500" />
          <span className="font-bold text-sm text-slate-900 dark:text-white">Advanced Filters</span>
        </div>
        <button
          onClick={onReset}
          className="text-xs text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 font-semibold transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          Reset
        </button>
      </div>

      {/* Results Indicator */}
      <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-600 dark:text-blue-400 flex items-center justify-between">
        <span>Active Matches Found</span>
        <span className="px-2 py-0.5 rounded-full bg-blue-600 text-white font-extrabold">{totalResultsCount}</span>
      </div>

      {/* Domain Filter */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
          Job Domain Category
        </label>
        <select
          value={filters.domain}
          onChange={(e) => onChange({ ...filters, domain: e.target.value })}
          className="w-full px-3 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
        >
          {domains.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      {/* Portal Filter */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
          Job Portal Source
        </label>
        <select
          value={filters.portal}
          onChange={(e) => onChange({ ...filters, portal: e.target.value })}
          className="w-full px-3 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
        >
          {portals.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      {/* Work Mode Filter */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
          Work Mode
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          {workModes.map((mode) => (
            <button
              key={mode}
              onClick={() => onChange({ ...filters, workMode: mode })}
              className={`px-3 py-2 text-xs font-semibold rounded-xl border transition-all ${
                filters.workMode === mode
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700/60 hover:bg-slate-200'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Minimum AI Match Threshold Slider */}
      <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
          <span className="flex items-center gap-1"><Sparkles className="w-3.5 h-3.5 text-purple-500" /> Min AI Match Score</span>
          <span className="text-purple-600 dark:text-purple-400">{filters.minMatchScore}%</span>
        </div>
        <input
          type="range"
          min="50"
          max="95"
          step="5"
          value={filters.minMatchScore}
          onChange={(e) => onChange({ ...filters, minMatchScore: Number(e.target.value) })}
          className="w-full accent-purple-600 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-400">
          <span>50%</span>
          <span>75%</span>
          <span>95%+</span>
        </div>
      </div>

    </div>
  );
};
