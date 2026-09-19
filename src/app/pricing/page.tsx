'use client';

import React from 'react';
import Link from 'next/link';
import { Check, Sparkles, Zap, Shield, ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function PricingPage() {
  const tiers = [
    {
      name: 'Free Candidate',
      price: '$0',
      period: 'forever',
      description: 'Essential multi-portal job search and AI skill extraction.',
      highlight: false,
      features: [
        'Multi-portal job aggregation search',
        'Standard resume parsing & skill extraction',
        'Basic AI match percentage scoring',
        'Direct links to 7 job portals',
        'Application status tracking (up to 15 jobs)',
        'Community support'
      ],
      buttonText: 'Get Started Free',
      buttonLink: '/signup'
    },
    {
      name: 'Pro Job Hunter',
      price: '$19',
      period: 'per month',
      description: 'For engineers seeking highest-probability matches with instant alerts.',
      highlight: true,
      features: [
        'Everything in Free Candidate',
        'Real-time automated multi-portal synchronization',
        'Strict descending match ranking (99% → 75%)',
        'Multi-dimensional score breakdown (Skills, Exp, Domain)',
        'Unlimited application bookmarking & Kanban board',
        'Priority harvesting from LinkedIn, Naukri & Indeed',
        'Resume keyword optimization suggestions',
        'Priority email & chat support'
      ],
      buttonText: 'Start Pro Trial',
      buttonLink: '/signup'
    },
    {
      name: 'Enterprise Recruiter',
      price: '$99',
      period: 'per month',
      description: 'Dedicated portal synchronization & automated candidate intake.',
      highlight: false,
      features: [
        'Everything in Pro Job Hunter',
        'Custom company career page harvester connectors',
        'REST API & Webhook access for ATS integration',
        'Bulk resume batch parsing & taxonomy extraction',
        'Dedicated account manager',
        'Custom SLA guarantees (99.9% uptime)'
      ],
      buttonText: 'Contact Enterprise',
      buttonLink: '/contact'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#0F172A] text-slate-900 dark:text-slate-100">
      <main className="flex-1 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-600 dark:text-primary-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Transparent, Predictable Plans
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Find Your Dream Role Faster with <span className="text-primary-600">RoleRadar Pro</span>
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Choose the plan that fits your career search velocity. Upgrade, downgrade, or cancel anytime.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier, idx) => (
            <div
              key={idx}
              className={`p-8 rounded-3xl flex flex-col justify-between transition-all relative ${
                tier.highlight
                  ? 'bg-white dark:bg-slate-900 border-2 border-primary-500 shadow-2xl scale-105 z-10'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md'
              }`}
            >
              {tier.highlight && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary-600 text-white text-[10px] font-black uppercase tracking-wider shadow-md">
                  Most Popular
                </span>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">{tier.name}</h3>
                  <p className="text-xs text-slate-500 mt-1 min-h-[32px]">{tier.description}</p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-slate-900 dark:text-white">{tier.price}</span>
                  <span className="text-xs text-slate-500 font-semibold">/ {tier.period}</span>
                </div>

                <div className="border-t border-slate-200 dark:border-slate-800 pt-6 space-y-3">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                    What's Included:
                  </span>
                  <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400 font-medium">
                    {tier.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-8">
                <Link
                  href={tier.buttonLink}
                  className={`w-full py-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 shadow-md ${
                    tier.highlight
                      ? 'bg-primary-600 hover:bg-primary-500 text-white shadow-primary-600/25'
                      : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <span>{tier.buttonText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </main>

      <Footer />
    </div>
  );
}
