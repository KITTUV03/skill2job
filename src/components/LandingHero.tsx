'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Sparkles, 
  UploadCloud, 
  Search, 
  Zap, 
  CheckCircle2, 
  Shield, 
  ArrowRight,
  TrendingUp,
  Cpu,
  Brain,
  Globe,
  Play,
  Lock
} from 'lucide-react';
import { useApp } from '@/lib/store';

export const LandingHero: React.FC = () => {
  const router = useRouter();
  const { stats, isAuthenticated, loadDemoResume } = useApp();

  const handleUploadResumeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isAuthenticated) {
      router.push('/resume');
    } else {
      router.push('/login?redirect=%2Fresume');
    }
  };

  const handleDemoDashboardClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    await loadDemoResume('vlsi');
    router.push('/dashboard');
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 bg-gradient-hero">
      
      {/* Decorative Glow Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-gradient-to-tr from-primary-600/20 via-secondary-600/20 to-accent-500/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Live Indicator Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/30 text-primary-600 dark:text-primary-400 text-xs font-bold shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <Sparkles className="w-3.5 h-3.5 text-secondary-500" />
              <span>{stats.lastSyncedText || 'Last Synced 2 Minutes Ago'} • 7 Portals Live</span>
            </div>

            {/* Main Headline - Required: Find Your Next Job Using AI */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.12]">
              Find Your Next Job <br className="hidden sm:inline" />
              <span className="text-gradient">Using AI</span>
            </h1>

            {/* Subheading - Required: Upload your resume and instantly discover relevant jobs from multiple platforms */}
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed mx-auto lg:mx-0 font-normal">
              Upload your resume and instantly discover relevant jobs from multiple platforms. Reranked dynamically by skill compatibility vectors.
            </p>

            {/* CTA Buttons: Primary CTA: Upload Resume, Secondary CTA: View Demo Dashboard */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={handleUploadResumeClick}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-500 hover:from-primary-500 hover:to-accent-400 text-white font-black text-sm shadow-xl shadow-primary-600/25 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group active:scale-95"
              >
                <UploadCloud className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Upload Resume
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={handleDemoDashboardClick}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl glass-card bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/80 text-slate-900 dark:text-white font-extrabold text-sm border border-slate-300 dark:border-slate-700 shadow-md transition-all flex items-center justify-center gap-2 group active:scale-95"
              >
                <Play className="w-4 h-4 text-primary-600 fill-primary-600 group-hover:scale-110 transition-transform" />
                View Demo Dashboard
              </button>
            </div>

            {/* Live Metrics Under CTA */}
            <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center justify-center lg:justify-start gap-6 text-xs font-bold text-slate-500 dark:text-slate-400 max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>{stats.activeJobsText}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary-500" />
                <span>{stats.newJobsTodayText}</span>
              </div>
            </div>

          </div>

          {/* Right Column: High-Fidelity AI Matching Product Preview */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl glass-card p-6 sm:p-7 border border-slate-200/90 dark:border-slate-800 shadow-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl space-y-4">
              
              {/* Card Top Pill */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary-500/10 flex items-center justify-center border border-primary-500/20">
                    <Brain className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <h3 className="text-xs font-black text-slate-900 dark:text-white">Neural Resume Compatibility</h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Targeting: ASIC / Physical Design / AI</p>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 text-[10px] font-black rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                  <Zap className="w-3 h-3 text-emerald-500 animate-bounce" /> Live Portals
                </span>
              </div>

              {/* Extracted Vectors */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                  Extracted Resume Skill Vectors
                </span>
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-primary-500/10 text-primary-700 dark:text-primary-300 border border-primary-500/20">SystemVerilog</span>
                  <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-secondary-500/10 text-secondary-700 dark:text-secondary-300 border border-secondary-500/20">UVM</span>
                  <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-accent-500/10 text-cyan-700 dark:text-cyan-300 border border-accent-500/20">STA Timing</span>
                  <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20">PyTorch</span>
                  <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">Next.js & TS</span>
                </div>
              </div>

              {/* Ranked Job Samples */}
              <div className="space-y-2.5 pt-1">
                
                {/* Job 1 */}
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/70 flex items-center justify-between transition-transform hover:scale-[1.01]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-xs shadow-sm">
                      NV
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-900 dark:text-white">Senior Physical Design Engineer</h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">NVIDIA • LinkedIn Portal</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 text-xs font-black rounded-full bg-primary-600 text-white shadow-sm">
                    96% Match
                  </span>
                </div>

                {/* Job 2 */}
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/70 flex items-center justify-between transition-transform hover:scale-[1.01]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-black text-xs shadow-sm">
                      AI
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-900 dark:text-white">Staff AI / LLM Training Architect</h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">OpenAI • Wellfound</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 text-xs font-black rounded-full bg-secondary-600 text-white shadow-sm">
                    94% Match
                  </span>
                </div>

                {/* Job 3 */}
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/70 flex items-center justify-between transition-transform hover:scale-[1.01]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-xs shadow-sm">
                      ST
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-900 dark:text-white">Staff Distributed Systems Lead</h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">Stripe • Career Page</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 text-xs font-black rounded-full bg-slate-800 dark:bg-slate-700 text-white shadow-sm">
                    91% Match
                  </span>
                </div>

              </div>

              <div className="pt-2 text-center">
                <span className="text-[11px] font-bold text-slate-400">
                  ⚡ 12,458 jobs automatically synchronized across 7 providers
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
