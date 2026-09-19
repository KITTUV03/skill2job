'use client';

import React from 'react';
import { CheckCircle2, XCircle, Sparkles, Zap, Shield, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const LandingComparison: React.FC = () => {
  const comparisonRows = [
    {
      feature: 'Search Paradigm',
      traditional: 'Manual keyword search & endless scrolling',
      roleradar: 'AI Neural Matching based on full resume vector',
      traditionalIcon: XCircle,
      roleradarIcon: CheckCircle2
    },
    {
      feature: 'Results Quality',
      traditional: 'Thousands of generic, loosely related results',
      roleradar: 'Top ranked opportunities (96% to 85% probability)',
      traditionalIcon: XCircle,
      roleradarIcon: CheckCircle2
    },
    {
      feature: 'Portal Coverage',
      traditional: 'Isolated to one siloed platform (LinkedIn only)',
      roleradar: 'Unified feed: LinkedIn, Naukri, Indeed, Wellfound, Foundit',
      traditionalIcon: XCircle,
      roleradarIcon: CheckCircle2
    },
    {
      feature: 'Skill Gap Analysis',
      traditional: 'Manual reading of 50+ lines of descriptions',
      roleradar: 'Instant breakdown of matching vs missing skills',
      traditionalIcon: XCircle,
      roleradarIcon: CheckCircle2
    },
    {
      feature: 'Filtering Intelligence',
      traditional: 'Rigid filters that miss equivalent terminology',
      roleradar: 'Taxonomy cross-referencing (e.g., STA ↔ Timing Closure)',
      traditionalIcon: XCircle,
      roleradarIcon: CheckCircle2
    },
    {
      feature: 'Synchronization',
      traditional: 'Stale jobs often left up after expiration',
      roleradar: 'Real-time background sync every 15–30 minutes',
      traditionalIcon: XCircle,
      roleradarIcon: CheckCircle2
    }
  ];

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="px-3.5 py-1 text-xs font-black rounded-full bg-secondary-500/10 text-secondary-600 dark:text-secondary-400 border border-secondary-500/20 tracking-wider uppercase">
            Platform Benchmark
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Why RoleRadar Outperforms <span className="text-gradient">Traditional Job Portals</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Eliminate hours of manual search fatigue. Compare standard job board hunting against AI-driven multi-portal talent intelligence.
          </p>
        </div>

        {/* Comparison Table Container */}
        <div className="max-w-5xl mx-auto rounded-3xl glass-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
          
          {/* Table Header */}
          <div className="grid grid-cols-12 p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-100/60 dark:bg-slate-800/40 text-xs sm:text-sm font-black">
            <div className="col-span-4 text-slate-500 uppercase tracking-wider text-[11px]">
              Capability
            </div>
            <div className="col-span-4 text-slate-500 dark:text-slate-400">
              Traditional Job Boards (LinkedIn / Indeed)
            </div>
            <div className="col-span-4 text-primary-600 dark:text-primary-400 flex items-center gap-1.5 font-black">
              <Sparkles className="w-4 h-4 text-secondary-500" />
              RoleRadar AI Platform
            </div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {comparisonRows.map((row, idx) => (
              <div
                key={idx}
                className="grid grid-cols-12 p-5 sm:p-6 items-center text-xs sm:text-sm hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
              >
                {/* Feature Name */}
                <div className="col-span-4 font-black text-slate-900 dark:text-white pr-4">
                  {row.feature}
                </div>

                {/* Traditional Board */}
                <div className="col-span-4 text-slate-500 dark:text-slate-400 flex items-start gap-2 pr-4">
                  <row.traditionalIcon className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span className="leading-snug">{row.traditional}</span>
                </div>

                {/* RoleRadar Advantage */}
                <div className="col-span-4 font-bold text-slate-900 dark:text-white flex items-start gap-2">
                  <row.roleradarIcon className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="leading-snug text-primary-600 dark:text-primary-300 font-extrabold">{row.roleradar}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Table Footer CTA */}
          <div className="p-6 bg-gradient-to-r from-primary-600/10 via-secondary-600/10 to-accent-500/10 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
              <Zap className="w-4 h-4 text-primary-600" />
              <span>Experience the difference: Match against 12,458 active positions instantly.</span>
            </div>
            <Link
              href="/resume"
              className="px-6 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white text-xs font-black shadow-md shadow-primary-600/20 transition-all flex items-center gap-1.5 active:scale-95"
            >
              <span>Upload Resume & Compare</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
};
