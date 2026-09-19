'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Radar, 
  ShieldCheck, 
  Sparkles, 
  Cpu, 
  Globe, 
  Layers, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  Users
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#0F172A] text-slate-900 dark:text-slate-100">
      <main className="flex-1">
        
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center space-y-6 relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-600 dark:text-primary-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Engineering Next-Generation Job Discovery
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white max-w-3xl mx-auto leading-tight">
            Connecting Top Talent to Opportunities with <span className="text-primary-600">AI Intelligence</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            RoleRadar bridges the gap between specialized engineers and global tech companies by automating multi-portal job harvesting, parsing resumes with high-precision semantic matching, and eliminating application noise.
          </p>
        </section>

        {/* Pillars Grid */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 hover:border-primary-500/40 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-primary-500/10 text-primary-600 flex items-center justify-center">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Multi-Portal Continuous Aggregation</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                We monitor 7+ leading platforms—including LinkedIn, Naukri, Indeed, Wellfound, Glassdoor, and direct company career pages—so you never miss an active opening.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 hover:border-secondary-500/40 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-secondary-500/10 text-secondary-600 flex items-center justify-center">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Multi-Dimensional AI Matching</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Our matching engine analyzes skills, experience, domain alignment, education, and location preferences to calculate accurate selection probabilities (99% to 75%).
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 hover:border-emerald-500/40 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Privacy & Verified Direct Apply</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Candidate data remains strictly encrypted and protected. All application links redirect transparently to verified official job listings with zero intermediary middlemen.
              </p>
            </div>

          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-slate-200 dark:border-slate-800">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-black text-primary-600">8,400+</p>
              <p className="text-xs font-semibold text-slate-500">Live Active Jobs Indexed</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-black text-secondary-600">7</p>
              <p className="text-xs font-semibold text-slate-500">Integrated Job Portals</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-black text-emerald-600">98.4%</p>
              <p className="text-xs font-semibold text-slate-500">Matching Accuracy</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-black text-accent-600">100%</p>
              <p className="text-xs font-semibold text-slate-500">Direct Official Links</p>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center space-y-6">
          <div className="p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Ready to Accelerate Your Career Search?
            </h2>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Join thousands of engineers discovering top opportunities in Semiconductor, AI/ML, and Software.
            </p>
            <div className="flex items-center justify-center gap-4 pt-2">
              <Link
                href="/signup"
                className="px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-500 text-white text-xs font-black shadow-lg shadow-primary-600/25 transition-all flex items-center gap-2"
              >
                Create Candidate Account
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
