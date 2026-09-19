'use client';

import React from 'react';
import { UploadCloud, Cpu, Search, Award, Send } from 'lucide-react';

export const LandingTimeline: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: '1. Upload Resume',
      desc: 'Drag & drop your resume in PDF or DOCX format, or test instantly in Demo Mode.',
      icon: UploadCloud,
      gradient: 'from-primary-600 to-blue-500'
    },
    {
      step: '02',
      title: '2. AI Extracts Skills',
      desc: 'Neural taxonomy engine extracts technical skills, experience years, and project stack.',
      icon: Cpu,
      gradient: 'from-secondary-600 to-purple-500'
    },
    {
      step: '03',
      title: '3. AI Searches Jobs',
      desc: 'Synchronizes 12,458+ opportunities across LinkedIn, Naukri, Indeed, and Wellfound.',
      icon: Search,
      gradient: 'from-cyan-600 to-accent-500'
    },
    {
      step: '04',
      title: '4. Jobs Ranked',
      desc: 'Scores jobs by selection probability (96%, 94%, 91%) with explicit skill gap vectors.',
      icon: Award,
      gradient: 'from-emerald-600 to-teal-500'
    },
    {
      step: '05',
      title: '5. Apply Instantly',
      desc: 'Apply directly through verified portal links and advance your Kanban tracker pipeline.',
      icon: Send,
      gradient: 'from-indigo-600 to-primary-600'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="px-3.5 py-1 text-xs font-black rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-400 border border-primary-500/20 tracking-wider uppercase">
            5-Step Automated Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            How <span className="text-gradient">RoleRadar Works</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            From resume upload to interview invitation in an automated, AI-accelerated sequence.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="relative">
          
          {/* Connector Line for Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-primary-600 via-secondary-600 via-accent-500 to-emerald-500 -translate-y-1/2 rounded-full opacity-30 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative z-10">
            {steps.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-3xl glass-card bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xl flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-300"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${item.gradient} text-white flex items-center justify-center font-bold text-lg shadow-lg mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="text-[10px] font-black text-primary-600 dark:text-primary-400 uppercase tracking-widest mb-1">
                    Step {item.step}
                  </span>
                  <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
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
