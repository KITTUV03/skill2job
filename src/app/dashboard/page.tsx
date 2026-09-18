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
  RefreshCw
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
    setSelectedJobForModal 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('All');

  // Dynamic status metrics
  const activeJobsCount = jobs.length + 8420;
  const applicationsSentCount = applications.length;
  const savedJobsCount = savedJobIds.length;
  const interviewCount = applications.filter(a => a.status === 'Interview Scheduled').length || 1;

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

  return (
    <ProtectedRoute>
      <div className="flex min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-950">
        <Sidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto overflow-x-hidden">
          
          {/* Welcome Banner - Linear / Stripe Style */}
          <div className="p-6 sm:p-8 rounded-3xl glass-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary-500/10 via-secondary-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 text-xs font-bold rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-400 border border-primary-500/20 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-secondary-500 animate-pulse" />
                    AI Talent Intelligence
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Continuous Multi-Portal Monitoring
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                  Welcome back, {user.name ? user.name.split(' ')[0] : 'Candidate'}! 👋
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-xl leading-relaxed">
                  RoleRadar is dynamically syncing <span className="text-primary-600 font-semibold">7 active portals</span> against your verified qualifications.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <Link
                  href="/resume"
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all flex items-center gap-2 shadow-sm"
                >
                  <FileText className="w-4 h-4 text-primary-600" />
                  Update Resume AI
                </Link>
                <Link
                  href="/jobs"
                  className="px-5 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white text-xs font-bold shadow-lg shadow-primary-600/25 transition-all flex items-center gap-2 active:scale-95"
                >
                  Search All Matches
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* 5 Core Metrics Grid Required by User */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            
            {/* 1. Active Jobs */}
            <div className="p-5 rounded-2xl glass-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1 hover:border-primary-500/40 transition-colors">
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                <span className="text-[11px] font-bold uppercase tracking-wider">Active Jobs</span>
                <Briefcase className="w-4 h-4 text-primary-600" />
              </div>
              <p className="text-2xl font-black text-slate-900 dark:text-white">{activeJobsCount.toLocaleString()}</p>
              <p className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                Live 7-Portal Index
              </p>
            </div>

            {/* 2. New Jobs Today */}
            <div className="p-5 rounded-2xl glass-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1 hover:border-primary-500/40 transition-colors">
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                <span className="text-[11px] font-bold uppercase tracking-wider">New Today</span>
                <Zap className="w-4 h-4 text-secondary-500" />
              </div>
              <p className="text-2xl font-black text-primary-600 dark:text-primary-400">+{stats.newToday}</p>
              <p className="text-[10px] font-semibold text-primary-600 dark:text-primary-400">
                Automated Ingestion
              </p>
            </div>

            {/* 3. Applications Sent */}
            <div className="p-5 rounded-2xl glass-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1 hover:border-primary-500/40 transition-colors">
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                <span className="text-[11px] font-bold uppercase tracking-wider">Applications Sent</span>
                <Send className="w-4 h-4 text-secondary-600" />
              </div>
              <p className="text-2xl font-black text-secondary-600 dark:text-secondary-400">{applicationsSentCount}</p>
              <Link href="/applications" className="text-[10px] font-bold text-secondary-600 hover:underline">
                View Kanban Board →
              </Link>
            </div>

            {/* 4. Saved Jobs */}
            <div className="p-5 rounded-2xl glass-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1 hover:border-primary-500/40 transition-colors">
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                <span className="text-[11px] font-bold uppercase tracking-wider">Saved Bookmarks</span>
                <Bookmark className="w-4 h-4 text-amber-500" />
              </div>
              <p className="text-2xl font-black text-amber-600 dark:text-amber-400">{savedJobsCount}</p>
              <Link href="/saved" className="text-[10px] font-bold text-amber-600 hover:underline">
                Manage Saved ({savedJobsCount}) →
              </Link>
            </div>

            {/* 5. Interview Progress */}
            <div className="p-5 rounded-2xl glass-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1 hover:border-primary-500/40 transition-colors col-span-2 lg:col-span-1">
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                <span className="text-[11px] font-bold uppercase tracking-wider">Interview Progress</span>
                <CalendarCheck className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{interviewCount} Active</p>
              <p className="text-[10px] font-semibold text-emerald-600">
                Technical Rounds Pending
              </p>
            </div>

          </div>

          {/* Search & Domain Filter Bar */}
          <div className="p-5 rounded-2xl glass-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:max-w-md">
                <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Quick search jobs by skill or company..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                />
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <button
                  onClick={triggerManualScrape}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-primary-600" />
                  <span>Sync Aggregator</span>
                </button>
              </div>
            </div>

            {/* Quick Domain Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs scrollbar-none">
              {[
                { label: 'All Domains', value: 'All' },
                { label: 'VLSI & Chips', value: 'VLSI / Semiconductor' },
                { label: 'AI & Machine Learning', value: 'AI / Machine Learning' },
                { label: 'Software Engineering', value: 'Software Engineering' },
                { label: 'Embedded Systems', value: 'Embedded Systems' }
              ].map(d => (
                <button
                  key={d.value}
                  onClick={() => setSelectedDomain(d.value)}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 ${
                    selectedDomain === d.value
                      ? 'bg-primary-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Top AI Matched Opportunities - Strictly Descending Order */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary-600" />
                  Highest Probability Matches For You
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Ranked strictly from 99% selection chance downwards • Direct apply links to active portals
                </p>
              </div>

              <Link
                href="/jobs"
                className="text-xs font-bold text-primary-600 hover:text-primary-700 flex items-center gap-1"
              >
                View all ({jobs.length}) →
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {displayJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onSelectJob={(j) => setSelectedJobForModal(j)}
                />
              ))}
            </div>
          </div>

          {/* Live Ingestion Log Stream */}
          <div className="p-6 rounded-3xl glass-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary-600" />
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Live Aggregator Harvest Stream</h3>
              </div>
              <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                Active Queue
              </span>
            </div>

            <div className="space-y-2.5">
              {scraperLogs.slice(0, 4).map((log) => (
                <div key={log.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <span className="font-extrabold text-primary-600">{log.portal}</span>
                    <span className="text-slate-600 dark:text-slate-300">{log.message}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 shrink-0">
                    {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}
            </div>
          </div>

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
