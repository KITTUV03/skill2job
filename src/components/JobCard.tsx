'use client';

import React from 'react';
import { 
  Building2, 
  MapPin, 
  DollarSign, 
  Briefcase, 
  Bookmark, 
  Send, 
  ExternalLink, 
  Sparkles, 
  Globe,
  Zap
} from 'lucide-react';
import { Job } from '@/types';
import { useApp } from '@/lib/store';

interface JobCardProps {
  job: Job;
  onSelectJob?: (job: Job) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onSelectJob }) => {
  const { savedJobIds, toggleSaveJob, addApplication, applications } = useApp();
  const isSaved = savedJobIds.includes(job.id);
  const isApplied = applications.some(a => a.jobId === job.id);

  const matchScore = job.matchScore || 85;

  // Portal badge styling
  const portalColors: Record<string, string> = {
    LinkedIn: 'bg-blue-600/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    Naukri: 'bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
    Indeed: 'bg-purple-600/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
    Wellfound: 'bg-pink-600/10 text-pink-600 dark:text-pink-400 border-pink-500/20',
    Foundit: 'bg-amber-600/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    Glassdoor: 'bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    'Company Career Page': 'bg-cyan-600/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20'
  };

  return (
    <div className="group relative p-5 rounded-3xl glass-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 hover:border-blue-500/50 shadow-sm hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all duration-200">
      
      {/* Top Bar: Company Logo, Title & Match Score Badge */}
      <div className="flex items-start justify-between gap-4">
        
        <div className="flex items-start gap-3.5 flex-1 min-w-0">
          <img
            src={job.logo}
            alt={job.company}
            className="w-12 h-12 rounded-2xl object-cover ring-2 ring-slate-100 dark:ring-slate-800 shadow-sm shrink-0"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{job.company}</span>
              <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full border ${portalColors[job.sourcePortal] || 'bg-slate-100 text-slate-600'}`}>
                {job.sourcePortal}
              </span>
              {job.isNew && (
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500 text-white animate-pulse">
                  NEW
                </span>
              )}
            </div>

            <h3 
              onClick={() => onSelectJob && onSelectJob(job)}
              className="text-base font-bold text-slate-900 dark:text-white truncate cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors mt-0.5"
            >
              {job.title}
            </h3>
          </div>
        </div>

        {/* AI Match Score Radial Badge */}
        <div className="flex flex-col items-end shrink-0">
          <div className={`px-3 py-1 rounded-2xl font-extrabold text-xs flex items-center gap-1 shadow-sm ${
            matchScore >= 90
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-blue-500/20'
              : matchScore >= 80
              ? 'bg-purple-500/15 text-purple-600 dark:text-purple-300 border border-purple-500/30'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
          }`}>
            <Sparkles className="w-3 h-3 text-cyan-300" />
            <span>{matchScore}% Match</span>
          </div>
          <span className="text-[10px] font-medium text-slate-400 mt-1">AI Relevance</span>
        </div>

      </div>

      {/* Meta Specs: Location, Experience, Salary */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-600 dark:text-slate-300">
        <div className="flex items-center gap-1.5 truncate">
          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate">{job.location}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>{job.experienceLevel} • {job.workMode}</span>
        </div>
        <div className="flex items-center gap-1.5 font-semibold text-emerald-600 dark:text-emerald-400">
          <DollarSign className="w-3.5 h-3.5 shrink-0" />
          <span>{job.salary}</span>
        </div>
      </div>

      {/* Skills Badges */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {job.skills.slice(0, 5).map((skill, idx) => (
          <span
            key={idx}
            className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/60"
          >
            {skill}
          </span>
        ))}
        {job.skills.length > 5 && (
          <span className="px-2 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500">
            +{job.skills.length - 5} more
          </span>
        )}
      </div>

      {/* Card Footer Actions */}
      <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
        
        <button
          onClick={() => toggleSaveJob(job.id)}
          className={`p-2 rounded-xl border transition-colors flex items-center gap-1.5 text-xs font-medium ${
            isSaved
              ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30'
              : 'bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700/60 hover:text-amber-500'
          }`}
          title={isSaved ? 'Saved to bookmarks' : 'Save job'}
        >
          <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-amber-500' : ''}`} />
          <span>{isSaved ? 'Saved' : 'Bookmark'}</span>
        </button>

        <div className="flex items-center gap-2">
          {onSelectJob && (
            <button
              onClick={() => onSelectJob(job)}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Details
            </button>
          )}

          <button
            onClick={() => addApplication(job)}
            disabled={isApplied}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 ${
              isApplied
                ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 cursor-default'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-blue-500/20 active:scale-95'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isApplied ? 'Applied ✓' : 'Apply Now'}</span>
          </button>
        </div>

      </div>

    </div>
  );
};
