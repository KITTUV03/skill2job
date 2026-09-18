'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Sidebar } from '@/components/Sidebar';
import { JobCard } from '@/components/JobCard';
import { JobFilterSidebar } from '@/components/JobFilterSidebar';
import { AIMatchVisualizer } from '@/components/AIMatchVisualizer';
import { JobDetailModal } from '@/components/JobDetailModal';
import { Search, Sparkles, X, Filter, Zap } from 'lucide-react';
import { useApp } from '@/lib/store';
import { Job } from '@/types';

function JobsContent() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const initialDomain = searchParams.get('domain') || 'All Domains';

  const { jobs, selectedJobForModal, setSelectedJobForModal } = useApp();

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedQuickFilter, setSelectedQuickFilter] = useState<string>('All');
  const [filters, setFilters] = useState({
    domain: initialDomain,
    portal: 'All Portals',
    workMode: 'All Modes',
    experienceLevel: 'All Levels',
    minMatchScore: 50
  });

  const [showEngineVisualizer, setShowEngineVisualizer] = useState(false);

  // Quick filter pills definition
  const quickFilters = [
    { label: '⚡ All Jobs', domain: 'All Domains', mode: 'All Modes', minScore: 50 },
    { label: '💻 VLSI & Chips', domain: 'VLSI / Semiconductor', mode: 'All Modes', minScore: 50 },
    { label: '🤖 AI & ML', domain: 'AI / Machine Learning', mode: 'All Modes', minScore: 50 },
    { label: '🌐 Software', domain: 'Software Engineering', mode: 'All Modes', minScore: 50 },
    { label: '⚡ Embedded', domain: 'Embedded Systems', mode: 'All Modes', minScore: 50 },
    { label: '🏠 Remote Only', domain: 'All Domains', mode: 'Remote', minScore: 50 },
    { label: '🔥 90%+ AI Match', domain: 'All Domains', mode: 'All Modes', minScore: 90 },
  ];

  const handleQuickFilterClick = (q: typeof quickFilters[0]) => {
    setSelectedQuickFilter(q.label);
    setFilters(prev => ({
      ...prev,
      domain: q.domain,
      workMode: q.mode,
      minMatchScore: q.minScore
    }));
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter(j => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const term = searchQuery.toLowerCase();
        const matchesTitle = j.title.toLowerCase().includes(term);
        const matchesCompany = j.company.toLowerCase().includes(term);
        const matchesSkill = j.skills.some(s => s.toLowerCase().includes(term));
        if (!matchesTitle && !matchesCompany && !matchesSkill) return false;
      }

      // 2. Domain
      if (filters.domain !== 'All Domains' && j.domain !== filters.domain) {
        return false;
      }

      // 3. Portal
      if (filters.portal !== 'All Portals' && j.sourcePortal !== filters.portal) {
        return false;
      }

      // 4. Work Mode
      if (filters.workMode !== 'All Modes' && j.workMode !== filters.workMode) {
        return false;
      }

      // 5. Min AI Score
      if ((j.matchScore || 85) < filters.minMatchScore) {
        return false;
      }

      return true;
    });
  }, [jobs, searchQuery, filters]);

  const handleReset = () => {
    setSearchQuery('');
    setSelectedQuickFilter('⚡ All Jobs');
    setFilters({
      domain: 'All Domains',
      portal: 'All Portals',
      workMode: 'All Modes',
      experienceLevel: 'All Levels',
      minMatchScore: 50
    });
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto overflow-x-hidden">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Search className="w-6 h-6 text-blue-500" />
              Search Opportunities
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Aggregating live postings from LinkedIn, Naukri, Indeed, Wellfound, Foundit, & Glassdoor.</p>
          </div>

          <button
            onClick={() => setShowEngineVisualizer(!showEngineVisualizer)}
            className="px-3.5 py-2 rounded-xl text-xs font-bold border border-purple-500/30 bg-purple-500/10 text-purple-600 dark:text-purple-400 hover:bg-purple-500/20 transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4" />
            <span>{showEngineVisualizer ? 'Hide AI Engine Visualizer' : 'Show AI Engine Visualizer'}</span>
          </button>
        </div>

        {/* Clean, Prominent Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-4 top-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Type job title, company, or key skill (e.g. SystemVerilog, UVM, PyTorch, React)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-10 py-3.5 text-sm rounded-2xl glass-card bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Quick Filter Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
          {quickFilters.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleQuickFilterClick(q)}
              className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all border ${
                selectedQuickFilter === q.label
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20 scale-105'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700/60 hover:bg-slate-100'
              }`}
            >
              {q.label}
            </button>
          ))}
        </div>

        {/* AI Engine Visualizer (Toggleable) */}
        {showEngineVisualizer && (
          <AIMatchVisualizer />
        )}

        {/* Main Search Grid */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          <JobFilterSidebar
            filters={filters}
            onChange={setFilters}
            onReset={handleReset}
            totalResultsCount={filteredJobs.length}
          />

          {/* Job List */}
          <div className="flex-1 space-y-4">
            {filteredJobs.length === 0 ? (
              <div className="p-12 text-center rounded-3xl glass-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                <Sparkles className="w-10 h-10 text-slate-400 mx-auto" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">No jobs match your search criteria</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">Try resetting filters or searching for alternative tech keywords.</p>
                <button
                  onClick={handleReset}
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold shadow-md hover:bg-blue-500"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {filteredJobs.map(job => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onSelectJob={(j) => setSelectedJobForModal(j)}
                  />
                ))}
              </div>
            )}
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
  );
}

export default function JobsPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400 animate-pulse">
          <Sparkles className="w-5 h-5 text-purple-500" />
          <span>Loading Job Search Engine...</span>
        </div>
      </div>
    }>
      <JobsContent />
    </Suspense>
  );
}
