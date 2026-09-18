'use client';

import React from 'react';
import { 
  FileSearch, 
  BrainCircuit, 
  Layers, 
  MapPin, 
  SlidersHorizontal, 
  MousePointerClick 
} from 'lucide-react';

export const LandingFeatures: React.FC = () => {
  const features = [
    {
      icon: FileSearch,
      title: 'AI Resume Analysis',
      description: 'Upload PDF or DOCX resumes to extract deep domain context, projects, certifications, and career preferences in seconds.',
      color: 'from-blue-500 to-cyan-500',
      badge: 'Neural Parsing'
    },
    {
      icon: BrainCircuit,
      title: 'Smart Skill Extraction',
      description: 'Identify technical skill vectors across VLSI, AI/ML, Software, Embedded Systems, and Data Science with zero manual input.',
      color: 'from-purple-500 to-pink-500',
      badge: 'Taxonomy Match'
    },
    {
      icon: Layers,
      title: 'Multi-Portal Job Search',
      description: 'Harvest opportunities from LinkedIn, Naukri, Indeed, Wellfound, Foundit, Glassdoor, and direct company career portals.',
      color: 'from-emerald-500 to-teal-500',
      badge: '7+ Portals'
    },
    {
      icon: MapPin,
      title: 'Location-Based Matching',
      description: 'Filter seamlessly across Remote, Hybrid, Onsite, or regional tech hubs (San Jose, Austin, Bengaluru, London, Munich).',
      color: 'from-amber-500 to-orange-500',
      badge: 'Geo Engine'
    },
    {
      icon: SlidersHorizontal,
      title: 'Experience-Based Filtering',
      description: 'Rank job listings strictly aligned with your years of experience, domain seniority, and salary bracket targets.',
      color: 'from-indigo-500 to-blue-600',
      badge: 'Precision Rank'
    },
    {
      icon: MousePointerClick,
      title: 'One-Click Apply',
      description: 'Apply directly to verified job postings or track application lifecycle using built-in Kanban status boards.',
      color: 'from-cyan-500 to-blue-600',
      badge: 'Fast Track'
    },
  ];

  return (
    <section id="features" className="py-20 bg-slate-50 dark:bg-slate-900/60 border-y border-slate-200/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="px-3 py-1 text-xs font-bold rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 tracking-wide uppercase">
            Platform Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Engineered for High-Precision <span className="text-gradient">Career Matching</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            RoleRadar eliminates search fatigue by harmonizing multi-portal job data with AI resume intelligence.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="group relative p-6 rounded-3xl glass-card border border-slate-200 dark:border-slate-800/80 hover:border-blue-500/40 bg-white/80 dark:bg-slate-900/80 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${feature.color} p-0.5 shadow-md shadow-blue-500/10`}>
                    <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                    </div>
                  </div>
                  <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    {feature.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
