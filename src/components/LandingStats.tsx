'use client';

import React from 'react';
import { Briefcase, Building2, Zap, Clock, ShieldCheck } from 'lucide-react';
import { useApp } from '@/lib/store';

export const LandingStats: React.FC = () => {
  const { stats } = useApp();

  const metrics = [
    {
      icon: Briefcase,
      value: stats.activeJobsText || '12,458 Active Jobs',
      label: 'Active Jobs Ingested',
      description: 'Synchronized across 7 portals',
      color: 'text-primary-600 dark:text-primary-400',
      bg: 'bg-primary-500/10 border-primary-500/20'
    },
    {
      icon: Zap,
      value: stats.newJobsTodayText || '1,245 New Jobs Added Today',
      label: 'New Today',
      description: 'Auto-ingested & deduplicated',
      color: 'text-secondary-600 dark:text-secondary-400',
      bg: 'bg-secondary-500/10 border-secondary-500/20'
    },
    {
      icon: Building2,
      value: `${(stats.activeCompanies || 840).toLocaleString()} Verified Companies`,
      label: 'Companies Hiring',
      description: 'NVIDIA, Apple, OpenAI, Stripe & more',
      color: 'text-cyan-600 dark:text-cyan-400',
      bg: 'bg-cyan-500/10 border-cyan-500/20'
    },
    {
      icon: Clock,
      value: stats.lastSyncedText || 'Last Synced 2 Minutes Ago',
      label: 'Sync Frequency',
      description: 'Automated 15–30 min cycle',
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20'
    }
  ];

  return (
    <section className="py-16 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="px-3.5 py-1 text-xs font-black rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 tracking-wider uppercase">
            Live Platform Telemetry
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Real-Time Multi-Portal Aggregation Metrics
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl glass-card bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/90 dark:border-slate-800 space-y-3 hover:border-primary-500/40 transition-all"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${metric.bg} ${metric.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    {metric.value}
                  </h3>
                  <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-1">
                    {metric.label}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {metric.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
