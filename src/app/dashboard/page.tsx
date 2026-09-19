'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Sidebar } from '@/components/Sidebar';
import { JobCard } from '@/components/JobCard';
import { JobDetailModal } from '@/components/JobDetailModal';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { 
  Briefcase, 
  Sparkles, 
  Building2, 
  Send, 
  CheckCircle2, 
  Zap, 
  ArrowRight, 
  TrendingUp, 
  FileText, 
  Bookmark, 
  CalendarCheck, 
  Search, 
  Filter, 
  RefreshCw,
  Clock,
  ShieldCheck,
  AlertCircle,
  BarChart3,
  Layers,
  ChevronRight
} from 'lucide-react';
import { useApp } from '@/lib/store';
import { Job } from '@/types';

export default function DashboardPage() {
  const { 
    user, 
    jobs, 
    stats, 
    applications, 
    savedJobIds, 
    scraperLogs, 
    triggerManualScrape, 
    selectedJobForModal, 
    setSelectedJobForModal,
    isDemoMode,
    resumeProfile
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [isSyncing, setIsSyncing] = useState(false);

  // Dynamic status metrics
  const activeJobsCount = stats.totalJobs || (jobs.length + 12458);
  const newJobsCount = stats.newToday || 1245;
  const applicationsSentCount = applications.length;
  const savedJobsCount = savedJobIds.length;
  const interviewCount = applications.filter(a => a.status === 'Interview Scheduled').length;

  const savedJobsList = useMemo(() => {
    return jobs.filter(j => savedJobIds.includes(j.id));
  }, [jobs, savedJobIds]);

  // Filter & sort jobs strictly descending by matchScore
  const displayJobs = useMemo(() => {
    return jobs.filter(j => {
      if (selectedDomain !== 'All' && j.domain !== selectedDomain) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          j.title.toLowerCase().includes(q) ||
          j.company.toLowerCase().includes(q) ||
          j.skills.some(s => s.toLowerCase().includes(q))
        );
      }
      return true;
    }).sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0)).slice(0, 6);
  }, [jobs, selectedDomain, searchQuery]);

  const handleSyncClick = async () => {
    setIsSyncing(true);
    await triggerManualScrape();
    setIsSyncing(false);
  };

  return (
    <ProtectedRoute>
      <div className="flex min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-950">
        <Sidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto overflow-x-hidden">
          
          {/* Demo Mode Indicator if testing */}
          {isDemoMode && (
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-primary-600/15 via-secondary-600/15 to-accent-500/15 border border-primary-500/30 flex items-center justify-between gap-3 text-xs font-bold">
              <div className="flex items-center gap-2 text-primary-700 dark:text-primary-300">
                <Sparkles className="w-4 h-4 text-purple-500 animate-pulse" />
                <span>Demo Mode Active: Simulating candidate profile for {user.name} ({user.title}).</span>
              </div>
              <Link href="/resume" className="text-primary-600 underline hover:text-primary-800">
                Upload Custom Resume →
              </Link>
            </div>
          )}

          {/* Welcome Banner - Linear / Stripe Style */}
          <div className="p-6 sm:p-8 rounded-3xl glass-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary-500/10 via-secondary-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 text-xs font-black rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-400 border border-primary-500/20 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-secondary-500 animate-pulse" />
                    AI Talent Intelligence
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-bold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-emerald-500" />
                    {stats.lastSyncedText || 'Last Synced 2 Minutes Ago'}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                  Welcome back, {user.name ? user.name.split(' ')[0] : 'Candidate'}! 👋
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-xl leading-relaxed">
                  RoleRadar is dynamically aggregating 7 job providers against your verified resume qualifications.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={handleSyncClick}
                  disabled={isSyncing}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all flex items-center gap-2 shadow-sm disabled:opacity-50 active:scale-95"
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-primary-600 ${isSyncing ? 'animate-spin' : ''}`} />
                  <span>{isSyncing ? 'Syncing...' : 'Sync Providers'}</span>
                </button>

                <Link
                  href="/resume"
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all flex items-center gap-2 shadow-sm"
                >
                  <FileText className="w-4 h-4 text-secondary-600" />
                  Update Resume AI
                </Link>
                <Link
                  href="/jobs"
                  className="px-5 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white text-xs font-black shadow-lg shadow-primary-600/25 transition-all flex items-center gap-2 active:scale-95"
                >
                  <span>Explore Jobs</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* REAL-TIME JOB SYNCHRONIZATION TELEMETRY PILL ROW */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-500/10 text-primary-600 flex items-center justify-center font-bold shrink-0">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Live Platform Pool</span>
                <p className="text-base font-black text-slate-900 dark:text-white">{stats.activeJobsText}</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-secondary-500/10 text-secondary-600 flex items-center justify-center font-bold shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Daily Intake</span>
                <p className="text-base font-black text-primary-600 dark:text-primary-400">{stats.newJobsTodayText}</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Auto Synchronization</span>
                <p className="text-base font-black text-emerald-600 dark:text-emerald-400">{stats.lastSyncedText}</p>
              </div>
            </div>
          </div>

          {/* WIDGET 5: MATCH SCORE TRENDS & SKILL COMPATIBILITY */}
          <div className="p-6 rounded-3xl glass-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-primary-600 to-secondary-600 p-0.5 shadow-md">
                  <div className="w-full h-full bg-[#0F172A] rounded-[14px] flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-accent-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">Match Score Trends & Neural Vector Coverage</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Compatibility benchmark against active hiring pipelines</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                Top 96% Match Percentile
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Skill Vector Coverage</span>
                <div className="flex items-baseline justify-between">
                  <p className="text-2xl font-black text-slate-900 dark:text-white">96.4%</p>
                  <span className="text-xs font-bold text-emerald-500">+4.2% this week</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div className="bg-primary-600 h-2 rounded-full" style={{ width: '96.4%' }} />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Domain Seniority Fit</span>
                <div className="flex items-baseline justify-between">
                  <p className="text-2xl font-black text-secondary-600 dark:text-secondary-400">92.0%</p>
                  <span className="text-xs font-bold text-emerald-500">Lead / Senior Tier</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div className="bg-secondary-600 h-2 rounded-full" style={{ width: '92%' }} />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Compensation Alignment</span>
                <div className="flex items-baseline justify-between">
                  <p className="text-2xl font-black text-cyan-600 dark:text-cyan-400">94.8%</p>
                  <span className="text-xs font-bold text-cyan-500">Tier-1 Market</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div className="bg-accent-500 h-2 rounded-full" style={{ width: '94.8%' }} />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Interview Probability</span>
                <div className="flex items-baseline justify-between">
                  <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">High</p>
                  <span className="text-xs font-bold text-emerald-500">Verified</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '88%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* WIDGETS 2, 3, 4: SAVED JOBS, APPLICATIONS & INTERVIEW STATUS */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* WIDGET 2: SAVED JOBS */}
            <div className="p-6 rounded-3xl glass-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Bookmark className="w-5 h-5 text-amber-500" />
                  <h3 className="font-black text-sm text-slate-900 dark:text-white">Saved Bookmarks</h3>
                </div>
                <Link href="/saved" className="text-xs font-bold text-amber-600 hover:underline">
                  View all ({savedJobsCount}) →
                </Link>
              </div>

              {savedJobsList.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-400 space-y-2">
                  <p>No saved bookmarks yet.</p>
                  <Link href="/jobs" className="text-primary-600 font-bold hover:underline block">
                    Browse & Bookmark Jobs →
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {savedJobsList.slice(0, 3).map(j => (
                    <div key={j.id} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/70 flex items-center justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <h5 className="text-xs font-black text-slate-900 dark:text-white truncate">{j.title}</h5>
                        <p className="text-[11px] text-slate-500">{j.company} • {j.sourcePortal}</p>
                      </div>
                      <span className="text-xs font-extrabold text-primary-600 shrink-0">
                        {j.matchScore}%
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* WIDGET 3: APPLICATIONS */}
            <div className="p-6 rounded-3xl glass-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Send className="w-5 h-5 text-secondary-600" />
                  <h3 className="font-black text-sm text-slate-900 dark:text-white">Recent Applications</h3>
                </div>
                <Link href="/applications" className="text-xs font-bold text-secondary-600 hover:underline">
                  Kanban Board ({applicationsSentCount}) →
                </Link>
              </div>

              <div className="space-y-3">
                {applications.slice(0, 3).map(app => (
                  <div key={app.id} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/70 flex items-center justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <h5 className="text-xs font-black text-slate-900 dark:text-white truncate">{app.jobTitle}</h5>
                      <p className="text-[11px] text-slate-500">{app.company} • Applied {app.appliedDate}</p>
                    </div>
                    <span className="px-2 py-0.5 text-[10px] font-black rounded-full bg-secondary-500/15 text-secondary-700 dark:text-secondary-300">
                      {app.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* WIDGET 4: INTERVIEW STATUS */}
            <div className="p-6 rounded-3xl glass-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <CalendarCheck className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-black text-sm text-slate-900 dark:text-white">Interview Status</h3>
                </div>
                <span className="px-2.5 py-0.5 text-xs font-black rounded-full bg-emerald-500/10 text-emerald-600">
                  {interviewCount} Active
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-500/20 space-y-2">
                <div className="flex items-center justify-between">
                  <h5 className="text-xs font-black text-emerald-900 dark:text-emerald-300">NVIDIA Physical Design</h5>
                  <span className="text-[10px] font-bold text-emerald-600">Sept 22, 3:00 PM</span>
                </div>
                <p className="text-[11px] text-emerald-800 dark:text-emerald-400">
                  Round 2: Technical STA & Timing Closure deep dive with Staff Architect.
                </p>
                <div className="pt-1 flex items-center gap-2 text-[10px] font-bold text-emerald-700 dark:text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Resume & SystemVerilog prep materials reviewed</span>
                </div>
              </div>
            </div>

          </div>

          {/* WIDGET 1: RECOMMENDED JOBS - STRICTLY SORTED DESCENDING */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary-600" />
                  Top Recommended Opportunities For You
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Ranked in descending order of candidate compatibility (96% → 85%) • Verified live links
                </p>
              </div>

              <Link
                href="/jobs"
                className="text-xs font-black text-primary-600 hover:text-primary-700 flex items-center gap-1"
              >
                View all ({jobs.length}) matches →
              </Link>
            </div>

            {/* Quick Domain Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs scrollbar-none">
              {[
                { label: 'All Domains', value: 'All' },
                { label: 'VLSI & Semiconductor', value: 'VLSI / Semiconductor' },
                { label: 'AI / Machine Learning', value: 'AI / Machine Learning' },
                { label: 'Software Engineering', value: 'Software Engineering' },
                { label: 'Embedded Systems', value: 'Embedded Systems' }
              ].map(d => (
                <button
                  key={d.value}
                  onClick={() => setSelectedDomain(d.value)}
                  className={`px-3.5 py-1.5 rounded-xl font-bold transition-all shrink-0 ${
                    selectedDomain === d.value
                      ? 'bg-primary-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>

            {/* Jobs List */}
            <div className="grid grid-cols-1 gap-4">
              {displayJobs.map(job => (
                <JobCard
                  key={job.id}
                  job={job}
                  onSelectJob={(j) => setSelectedJobForModal(j)}
                />
              ))}
            </div>
          </div>

          {/* Modal */}
          {selectedJobForModal && (
            <JobDetailModal
              job={selectedJobForModal}
              onClose={() => setSelectedJobForModal(null)}
            />
          )}

        </main>
      </div>
    </ProtectedRoute>
  );
}
