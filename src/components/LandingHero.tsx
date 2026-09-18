'use client';

import React from 'react';
import Link from 'next/link';
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
  Globe
} from 'lucide-react';
import { useApp } from '@/lib/store';

export const LandingHero: React.FC = () => {
  const { stats } = useApp();

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 bg-gradient-hero">
      
      {/* Decorative Glow Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-600/20 via-purple-600/20 to-cyan-400/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Live Indicator Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 dark:bg-blue-500/15 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs font-semibold shadow-sm">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
              <Sparkles className="w-3.5 h-3.5 text-purple-500" />
              <span>Next-Gen AI Resume Matcher & Live Harvester</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              Find Your Next Job <br className="hidden sm:inline" />
              <span className="text-gradient">Using AI Technology</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed mx-auto lg:mx-0">
              Upload your resume and instantly discover the most relevant opportunities continuously aggregated from LinkedIn, Naukri, Indeed, Wellfound, Foundit, and top career portals.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/resume"
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-base shadow-lg shadow-blue-500/25 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 group"
              >
                <UploadCloud className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Upload Resume
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/jobs"
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl glass-card bg-white dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700/80 text-slate-800 dark:text-white font-semibold text-base border border-slate-300 dark:border-slate-700 shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Search className="w-5 h-5 text-blue-500" />
                Explore Jobs
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800/80 grid grid-cols-3 gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400 max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Multi-Portal Sync</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-purple-500" />
                <span>AI Skill Extraction</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-blue-500" />
                <span>One-Click Apply</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive AI Hero Preview Card */}
          <div className="lg:col-span-5 relative">
            
            {/* Main Interactive Visual Mockup */}
            <div className="relative rounded-3xl glass-card p-6 border border-slate-200 dark:border-slate-800 shadow-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl">
              
              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/10 dark:bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
                    <Brain className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">AI Matching Visualization</h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Processing: Alex_Resume_VLSI.pdf</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                  <Zap className="w-3 h-3 animate-bounce" /> Live Sync
                </span>
              </div>

              {/* Skill Extraction Cloud Preview */}
              <div className="py-4 space-y-2">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Extracted Skill Vectors</p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">SystemVerilog</span>
                  <span className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">UVM</span>
                  <span className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">PyTorch</span>
                  <span className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">STA Timing</span>
                  <span className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">React & TS</span>
                </div>
              </div>

              {/* Sample High Match Job Cards */}
              <div className="space-y-3 pt-2">
                
                {/* Job 1 */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800/80 dark:to-slate-800/40 border border-blue-200 dark:border-slate-700 flex items-center justify-between transition-all hover:scale-[1.02]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs shadow-md">
                      NV
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">Senior Physical Design Engineer</h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">NVIDIA • LinkedIn Portal</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="px-2.5 py-1 text-xs font-extrabold rounded-full bg-blue-600 text-white shadow-sm">
                      96% Match
                    </span>
                  </div>
                </div>

                {/* Job 2 */}
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between transition-all hover:scale-[1.02]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-xs shadow-md">
                      AI
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">Staff AI / LLM Architect</h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">OpenAI • Wellfound</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                      94% Match
                    </span>
                  </div>
                </div>

              </div>

              {/* Portal Source Badges */}
              <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1 font-medium"><Globe className="w-3.5 h-3.5 text-blue-500" /> Aggregating 7+ Job Portals</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">Updated Live</span>
              </div>

            </div>

            {/* Floating Accent Badge */}
            <div className="absolute -bottom-6 -left-6 p-4 rounded-2xl glass-card bg-white/95 dark:bg-slate-800/95 border border-slate-200 dark:border-slate-700 shadow-xl hidden sm:flex items-center gap-3 animate-float">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center text-white font-bold shadow-md">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">100,000+ Jobs Scraped</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Auto-deduplicated & ranked</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
