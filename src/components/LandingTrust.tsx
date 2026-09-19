'use client';

import React from 'react';
import { ShieldCheck, Lock, EyeOff, FileCheck2, Database, KeyRound } from 'lucide-react';

export const LandingTrust: React.FC = () => {
  const trustFeatures = [
    {
      icon: Lock,
      title: 'Resume Encryption',
      description: 'All uploaded PDF & DOCX resumes are encrypted at rest using AES-256 and transmitted exclusively over TLS 1.3.'
    },
    {
      icon: KeyRound,
      title: 'Secure Authentication',
      description: 'HMAC-SHA256 JWT tokens, secure HttpOnly cookies, session expiration, and Google / LinkedIn OAuth protocols.'
    },
    {
      icon: EyeOff,
      title: 'Privacy Protection',
      description: 'Zero data resale. Your profile and parsed contact details are never shared with unauthorized third-party brokers.'
    },
    {
      icon: FileCheck2,
      title: 'GDPR & SOC-2 Compliance',
      description: 'Full data portability and right to erasure. Download or purge your candidate profile with 1 click.'
    },
    {
      icon: Database,
      title: 'Data Security Architecture',
      description: 'Isolated candidate registries, input sanitation, strict rate limiting, and automated bot defenses.'
    }
  ];

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="px-3.5 py-1 text-xs font-black rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 tracking-wider uppercase">
            Enterprise Security & Privacy
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Engineered for <span className="text-gradient">Zero-Trust Privacy</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Your career data is sensitive. RoleRadar applies enterprise-grade cryptographic controls to guarantee confidentiality.
          </p>
        </div>

        {/* Security Badges Row */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          <div className="px-4 py-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>AES-256 At-Rest Encryption</span>
          </div>
          <div className="px-4 py-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
            <ShieldCheck className="w-4 h-4 text-primary-500" />
            <span>GDPR / CCPA Compliant</span>
          </div>
          <div className="px-4 py-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
            <ShieldCheck className="w-4 h-4 text-secondary-500" />
            <span>OAuth 2.0 / JWT Secure Sessions</span>
          </div>
          <div className="px-4 py-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
            <ShieldCheck className="w-4 h-4 text-cyan-500" />
            <span>TLS 1.3 Transport Security</span>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trustFeatures.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl glass-card bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-3 hover:border-emerald-500/40 transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  {feat.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
