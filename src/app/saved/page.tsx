'use client';

import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { JobCard } from '@/components/JobCard';
import { JobDetailModal } from '@/components/JobDetailModal';
import { Bookmark, Sparkles } from 'lucide-react';
import { useApp } from '@/lib/store';

export default function SavedJobsPage() {
  const { jobs, savedJobIds, selectedJobForModal, setSelectedJobForModal } = useApp();

  const savedJobs = jobs.filter(j => savedJobIds.includes(j.id));

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <Sidebar />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-amber-500 fill-amber-500" />
              Saved Job Bookmarks
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Easily organize and quick apply to your saved opportunities.</p>
          </div>
          <span className="px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-bold">
            {savedJobs.length} Bookmarks
          </span>
        </div>

        {savedJobs.length === 0 ? (
          <div className="p-12 text-center rounded-3xl glass-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <Bookmark className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">No saved jobs yet</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">Click the bookmark icon on any job card to save it here for later review.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {savedJobs.map(job => (
              <JobCard
                key={job.id}
                job={job}
                onSelectJob={(j) => setSelectedJobForModal(j)}
              />
            ))}
          </div>
        )}

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
