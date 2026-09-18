'use client';

import React, { useState, useEffect } from 'react';
import { Briefcase, Building2, CheckCircle2, Send, Zap } from 'lucide-react';
import { useApp } from '@/lib/store';

export const LandingStats: React.FC = () => {
  const { stats } = useApp();
  const [counts, setCounts] = useState({
    jobs: 8420,
    companies: 620,
    matches: 94,
    applications: 18450
  });

  // Smooth counting animation effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCounts(prev => ({
        jobs: prev.jobs + Math.floor(Math.random() * 2),
        companies: prev.companies,
        matches: prev.matches,
        applications: prev.applications + Math.floor(Math.random() * 3)
      }));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const statItems = [
    {
      label: 'Jobs Aggregated',
      value: `${counts.jobs.toLocaleString()}+`,
      sub: 'Across 7 Portals',
      icon: Briefcase,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10'
    },
    {
      label: 'Active Companies',
      value: `${counts.companies}+`,
      sub: 'NVIDIA, OpenAI, Apple, etc.',
      icon: Building2,
      color: 'text-purple-500',
      bg: 'bg-purple-500/10'
    },
    {
      label: 'Successful Matches Rate',
      value: `${counts.matches}.8%`,
      sub: 'High Skill Relevance',
      icon: CheckCircle2,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10'
    },
    {
      label: 'Daily Applications',
      value: `${counts.applications.toLocaleString()}+`,
      sub: 'Directly Processed',
      icon: Send,
      color: 'text-cyan-500',
      bg: 'bg-cyan-500/10'
    }
  ];

  return (
    <section id="stats" className="py-16 bg-slate-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {statItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700/60 shadow-xl text-center space-y-2 group hover:border-blue-500/50 transition-all"
              >
                <div className={`w-12 h-12 rounded-2xl ${item.bg} mx-auto flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                  {item.value}
                </div>
                <div className="text-sm font-semibold text-slate-200">
                  {item.label}
                </div>
                <p className="text-xs text-slate-400">
                  {item.sub}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
