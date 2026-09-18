'use client';

import React from 'react';
import { UploadCloud, Cpu, Globe2, BarChart3, Send } from 'lucide-react';

export const LandingTimeline: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Upload Resume',
      desc: 'Drag and drop your resume in PDF, DOCX, or text format.',
      icon: UploadCloud,
      color: 'bg-blue-600'
    },
    {
      step: '02',
      title: 'AI Extracts Skills & Experience',
      desc: 'Our neural model parses tech stacks, domain experience, and certifications.',
      icon: Cpu,
      color: 'bg-purple-600'
    },
    {
      step: '03',
      title: 'Search Across Multiple Portals',
      desc: 'Harvester engine searches LinkedIn, Naukri, Indeed, Wellfound, & career pages.',
      icon: Globe2,
      color: 'bg-cyan-600'
    },
    {
      step: '04',
      title: 'Get Ranked Job Matches',
      desc: 'View AI matching scores (96%, 90%, 85%) broken down by skills & location.',
      icon: BarChart3,
      color: 'bg-emerald-600'
    },
    {
      step: '05',
      title: 'Apply Instantly',
      desc: 'Directly apply or track your application stage with the built-in Kanban board.',
      icon: Send,
      color: 'bg-indigo-600'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="px-3 py-1 text-xs font-bold rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 tracking-wide uppercase">
            Simple 5-Step Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How <span className="text-gradient">RoleRadar Works</span>
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400">
            From resume upload to interview invitation in a seamless, automated workflow.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="relative">
          
          {/* Connector Line for Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 -translate-y-1/2 rounded-full opacity-20 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative z-10">
            {steps.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-3xl glass-card bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 shadow-lg flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-300"
                >
                  <div className={`w-12 h-12 rounded-2xl ${item.color} text-white flex items-center justify-center font-bold text-lg shadow-md mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1">
                    Step {item.step}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
