'use client';

import React, { useState } from 'react';
import { 
  UploadCloud, 
  Brain, 
  Briefcase, 
  Kanban, 
  LayoutDashboard, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink,
  ArrowRight,
  MapPin,
  DollarSign,
  TrendingUp,
  Clock
} from 'lucide-react';
import Link from 'next/link';

export const LandingProductPreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upload' | 'extraction' | 'feed' | 'dashboard' | 'kanban'>('feed');

  const tabs = [
    { id: 'upload', label: 'Resume Upload', icon: UploadCloud },
    { id: 'extraction', label: 'AI Skill Extraction', icon: Brain },
    { id: 'feed', label: 'Ranked Job Feed', icon: Briefcase },
    { id: 'dashboard', label: 'Candidate Dashboard', icon: LayoutDashboard },
    { id: 'kanban', label: 'Application Tracker', icon: Kanban },
  ] as const;

  return (
    <section className="py-20 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="px-3.5 py-1 text-xs font-black rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-400 border border-primary-500/20 tracking-wider uppercase">
            Product Walkthrough
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            See RoleRadar in <span className="text-gradient">Action</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Real product proof. Experience how our AI engine ingests, parses, matches, and organizes your career opportunities.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-black flex items-center gap-2 transition-all shrink-0 active:scale-95 ${
                  isActive
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/25'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Mockup Frame Window */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/80 shadow-2xl p-4 sm:p-8 relative overflow-hidden">
          
          {/* Browser Window Header */}
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200 dark:border-slate-800 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-400" />
              <span className="w-3 h-3 rounded-full bg-amber-400" />
              <span className="w-3 h-3 rounded-full bg-emerald-400" />
            </div>
            <div className="px-4 py-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] font-mono text-slate-500">
              app.roleradar.ai/{activeTab === 'upload' ? 'resume' : activeTab === 'extraction' ? 'resume/skills' : activeTab === 'feed' ? 'jobs' : activeTab === 'dashboard' ? 'dashboard' : 'applications'}
            </div>
            <div className="text-[11px] font-bold text-emerald-500 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Live System
            </div>
          </div>

          {/* TAB 1: RESUME UPLOAD */}
          {activeTab === 'upload' && (
            <div className="p-6 sm:p-10 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6">
              <div className="border-2 border-dashed border-primary-500/40 rounded-2xl p-8 text-center space-y-3 bg-primary-50/20 dark:bg-primary-950/10">
                <div className="w-14 h-14 rounded-2xl bg-primary-600/10 text-primary-600 dark:text-primary-400 mx-auto flex items-center justify-center">
                  <UploadCloud className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">Uploaded: Staff_Hardware_Engineer_Resume.pdf</h4>
                  <p className="text-xs text-slate-500 mt-1">Status: 100% Parsed & Encrypted with AES-256</p>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-600 border border-emerald-500/20 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 28 Technical Skills Extracted
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/15 text-blue-600 border border-blue-500/20">
                    6+ Yrs Experience
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: AI SKILL EXTRACTION */}
          {activeTab === 'extraction' && (
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-5">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <Brain className="w-4 h-4 text-secondary-500" /> Vector Taxonomy & Skill Breakdown
                </h4>
                <span className="text-xs font-bold text-primary-600">Model: GPT-4o / Claude 3.5 Sonnet</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/70 space-y-2">
                  <span className="font-bold text-primary-600 uppercase text-[10px]">Core Hardware & VLSI</span>
                  <div className="flex flex-wrap gap-1">
                    {['SystemVerilog', 'UVM', 'STA Timing', 'Synopsys ICC2', 'PrimeTime', 'Floorplanning'].map(s => (
                      <span key={s} className="px-2 py-0.5 rounded bg-primary-500/10 text-primary-700 dark:text-primary-300 font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/70 space-y-2">
                  <span className="font-bold text-secondary-600 uppercase text-[10px]">AI / ML & Infrastructure</span>
                  <div className="flex flex-wrap gap-1">
                    {['PyTorch', 'CUDA', 'vLLM', 'Distributed Training', 'TensorRT', 'Python'].map(s => (
                      <span key={s} className="px-2 py-0.5 rounded bg-secondary-500/10 text-secondary-700 dark:text-secondary-300 font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/70 space-y-2">
                  <span className="font-bold text-emerald-600 uppercase text-[10px]">Systems & Protocols</span>
                  <div className="flex flex-wrap gap-1">
                    {['PCIe Gen 5', 'AXI4', 'C++', 'FreeRTOS', 'Git', 'Linux Kernel'].map(s => (
                      <span key={s} className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: RANKED JOB FEED */}
          {activeTab === 'feed' && (
            <div className="space-y-3">
              {[
                { title: 'Senior Physical Design & STA Lead', company: 'NVIDIA', score: 96, portal: 'LinkedIn', salary: '₹38 - ₹55 LPA', loc: 'Bengaluru / San Jose', posted: '15 Minutes Ago' },
                { title: 'Staff AI Inference Systems Architect', company: 'OpenAI', score: 94, portal: 'Wellfound', salary: '$240,000 - $340,000', loc: 'San Francisco, CA', posted: '28 Minutes Ago' },
                { title: 'Principal ASIC Verification Engineer', company: 'Qualcomm', score: 91, portal: 'Naukri', salary: '₹42 - ₹60 LPA', loc: 'Bengaluru / Austin', posted: '45 Minutes Ago' },
              ].map((j, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-slate-800 dark:text-slate-200">{j.company}</span>
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-primary-500/10 text-primary-600">{j.portal}</span>
                      <span className="text-[10px] text-slate-400">Posted {j.posted}</span>
                    </div>
                    <h5 className="text-sm font-black text-slate-900 dark:text-white">{j.title}</h5>
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span>{j.loc}</span>
                      <span className="text-emerald-600 font-bold">{j.salary}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="px-3.5 py-1 text-xs font-black rounded-full bg-primary-600 text-white shadow-sm">
                      {j.score}% Match
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: CANDIDATE DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Active Jobs</span>
                  <p className="text-xl font-black text-slate-900 dark:text-white">12,458</p>
                  <span className="text-[10px] text-emerald-500 font-bold">✓ 7 Providers Synced</span>
                </div>
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">New Today</span>
                  <p className="text-xl font-black text-primary-600">+1,245</p>
                  <span className="text-[10px] text-primary-600 font-bold">Automatic Ingestion</span>
                </div>
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Companies Hiring</span>
                  <p className="text-xl font-black text-secondary-600">840</p>
                  <span className="text-[10px] text-secondary-600 font-bold">Verified Direct Links</span>
                </div>
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Sync Frequency</span>
                  <p className="text-xl font-black text-emerald-600">15m</p>
                  <span className="text-[10px] text-emerald-600 font-bold">Real-time Background</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: APPLICATION TRACKER */}
          {activeTab === 'kanban' && (
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
              {[
                { title: 'Applied (4)', color: 'border-blue-500', company: 'Apple • GPU Design' },
                { title: 'Under Review (2)', color: 'border-purple-500', company: 'Stripe • Platform' },
                { title: 'Interview (1)', color: 'border-amber-500', company: 'NVIDIA • STA Round 2' },
                { title: 'Offer (1)', color: 'border-emerald-500', company: 'OpenAI • Staff LLM' },
                { title: 'Rejected (0)', color: 'border-slate-500', company: 'None' },
              ].map((c, i) => (
                <div key={i} className={`p-3 rounded-2xl bg-white dark:bg-slate-900 border-t-2 ${c.color} border-slate-200 dark:border-slate-800 space-y-2`}>
                  <span className="font-extrabold text-[11px] block">{c.title}</span>
                  <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-[10px] font-semibold text-slate-600 dark:text-slate-300">
                    {c.company}
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
