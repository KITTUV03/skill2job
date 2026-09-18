'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sidebar 
} from '@/components/Sidebar';
import { 
  JobCard 
} from '@/components/JobCard';
import { 
  JobDetailModal 
} from '@/components/JobDetailModal';
import { 
  Briefcase, 
  Sparkles, 
  Building2, 
  Send, 
  CheckCircle2, 
  Zap, 
  ArrowRight,
  TrendingUp,
  FileText
} from 'lucide-react';
import { useApp } from '@/lib/store';
import { Job } from '@/types';

export default function DashboardPage() {
  const { user, jobs, stats, scraperLogs, selectedJobForModal, setSelectedJobForModal } = useApp();

  const topMatches = jobs.slice(0, 4);

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto overflow-x-hidden">
        
        {/* Welcome Banner */}
        <div className="p-6 sm:p-8 rounded-3xl glass-card bg-gradient-to-r from-blue-900/40 via-purple-900/30 to-slate-900 border border-blue-500/20 shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 text-xs font-bold rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  Candidate Dashboard
                </span>
                <span className="text-xs text-slate-400 font-medium">Synced with Resume AI</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                Good day, {user.name.split(' ')[0]}! 👋
              </h1>
              <p className="text-sm text-slate-300 mt-1 max-w-xl">
                RoleRadar is actively scanning <span className="text-cyan-400 font-semibold">7 job portals</span> for your target roles: <span className="text-blue-400 font-semibold">Physical Design, AI Architect, Fullstack</span>.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/resume"
                className="px-4 py-2.5 rounded-xl glass-card bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all flex items-center gap-2"
              >
                <FileText className="w-4 h-4 text-purple-400" />
                Update Resume AI
              </Link>
              <Link
                href="/jobs"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs font-bold shadow-lg shadow-blue-500/25 transition-all flex items-center gap-2"
              >
                View All Matches
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          
          <div className="p-4 rounded-3xl glass-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Active Jobs</span>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-white">{stats.totalJobs.toLocaleString()}</p>
            <p className="text-[10px] font-semibold text-emerald-500">Live Multi-Portal Feed</p>
          </div>

          <div className="p-4 rounded-3xl glass-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">New Jobs Today</span>
            <p className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">+{stats.newToday}</p>
            <p className="text-[10px] font-semibold text-blue-500 flex items-center gap-1">
              <Zap className="w-3 h-3 animate-bounce" /> Auto-harvesting
            </p>
          </div>

          <div className="p-4 rounded-3xl glass-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Companies Hiring</span>
            <p className="text-2xl font-extrabold text-purple-600 dark:text-purple-400">{stats.activeCompanies}+</p>
            <p className="text-[10px] font-semibold text-purple-500">Verified Direct Roles</p>
          </div>

          <div className="p-4 rounded-3xl glass-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Applications Submitted</span>
            <p className="text-2xl font-extrabold text-cyan-600 dark:text-cyan-400">{stats.totalApplications}</p>
            <p className="text-[10px] font-semibold text-cyan-500">Kanban Tracked</p>
          </div>

          <div className="p-4 rounded-3xl glass-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm col-span-2 lg:col-span-1 space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Match Success Rate</span>
            <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">{stats.matchSuccessRate}%</p>
            <p className="text-[10px] font-semibold text-emerald-500">High Skill Fit</p>
          </div>

        </div>

        {/* Live Aggregation Real-Time Feed & Top Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Top AI Recommendations */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-500" />
                Top AI Recommendations For You
              </h2>
              <Link href="/jobs" className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">
                View all ({jobs.length}) →
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {topMatches.map(job => (
                <JobCard
                  key={job.id}
                  job={job}
                  onSelectJob={(j) => setSelectedJobForModal(j)}
                />
              ))}
            </div>
          </div>

          {/* Right: Live Harvester Ticker & Quick Status */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Live Ticker Card */}
            <div className="p-5 rounded-3xl glass-card bg-slate-900 text-white border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-emerald-400 animate-pulse" />
                  <span className="font-bold text-xs">Live Harvester Log Stream</span>
                </div>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  REAL-TIME
                </span>
              </div>

              <div className="space-y-3 max-h-80 overflow-y-auto pr-1 text-xs">
                {scraperLogs.slice(0, 6).map(log => (
                  <div key={log.id} className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span className="font-bold text-blue-400">{log.portal}</span>
                      <span>{new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
                    </div>
                    <p className="text-slate-200 text-[11px] leading-relaxed">{log.message}</p>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-800 text-center">
                <Link href="/admin" className="text-xs font-semibold text-blue-400 hover:underline">
                  Harvester Admin Console →
                </Link>
              </div>
            </div>

          </div>

        </div>

        {/* Modal if selected */}
        {selectedJobForModal && (
          <JobDetailModal
            job={selectedJobForModal}
            onClose={() => setSelectedJobForModal(null)}
          />
        )}

      </main>
    </div>
  );
}
