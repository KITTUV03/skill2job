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
  Globe
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

  const handleApplyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    addApplication(job);
    
    // Direct redirect to portal URL (LinkedIn, Naukri, Indeed, Wellfound, etc.)
    if (job.applicationUrl) {
      window.open(job.applicationUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const portalBadgeStyles: Record<string, string> = {
    LinkedIn: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    Naukri: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
    Indeed: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20',
    Wellfound: 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20',
    Foundit: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20',
    Glassdoor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    'Company Career Page': 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20'
  };

  return (
    <div className="group relative p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary-500/50 shadow-sm hover:shadow-xl transition-all duration-200">
      
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        
        <div className="flex items-start gap-3.5 flex-1 min-w-0">
          <img
            src={job.logo}
            alt={job.company}
            className="w-11 h-11 rounded-xl object-cover ring-1 ring-slate-200 dark:ring-slate-700 shadow-sm shrink-0"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{job.company}</span>
              <span className={`px-2 py-0.5 text-[10px] font-extrabold rounded-full border ${portalBadgeStyles[job.sourcePortal] || 'bg-slate-100 text-slate-700'}`}>
                {job.sourcePortal}
              </span>
              {job.isNew && (
                <span className="px-2 py-0.5 text-[10px] font-extrabold rounded-full bg-emerald-600 text-white animate-pulse">
                  NEW
                </span>
              )}
            </div>

            <h3 
              onClick={() => onSelectJob && onSelectJob(job)}
              className="text-base font-black text-slate-900 dark:text-white truncate cursor-pointer hover:text-primary-600 transition-colors mt-0.5"
            >
              {job.title}
            </h3>
          </div>
        </div>

        {/* AI Score Badge - Prominently Displayed */}
        <div className="flex flex-col items-end shrink-0">
          <div className={`px-3 py-1 rounded-xl font-black text-xs flex items-center gap-1 shadow-sm ${
            matchScore >= 90
              ? 'bg-primary-600 text-white shadow-primary-600/25'
              : matchScore >= 80
              ? 'bg-secondary-500/15 text-secondary-600 dark:text-secondary-400 border border-secondary-500/30'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
          }`}>
            <Sparkles className="w-3 h-3 text-accent-400" />
            <span>{matchScore}% Match</span>
          </div>
        </div>

      </div>

      {/* Details Meta */}
      <div className="mt-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
        <div className="flex items-center gap-1.5 truncate">
          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate">{job.location}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>{job.experienceLevel} • {job.workMode}</span>
        </div>
        <div className="flex items-center gap-1.5 font-bold text-emerald-600 dark:text-emerald-400">
          <DollarSign className="w-3.5 h-3.5 shrink-0" />
          <span>{job.salary}</span>
        </div>
      </div>

      {/* Tech Skill Badges */}
      <div className="mt-3.5 flex flex-wrap gap-1.5">
        {job.skills.slice(0, 5).map((skill, idx) => (
          <span
            key={idx}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
          >
            {skill}
          </span>
        ))}
        {job.skills.length > 5 && (
          <span className="px-2 py-1 text-xs font-bold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400">
            +{job.skills.length - 5}
          </span>
        )}
      </div>

      {/* Footer Actions */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        
        <button
          onClick={() => toggleSaveJob(job.id)}
          className={`px-3 py-1.5 rounded-xl border transition-colors flex items-center gap-1.5 text-xs font-bold ${
            isSaved
              ? 'bg-amber-500/15 text-amber-600 border-amber-500/30'
              : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:text-primary-600'
          }`}
        >
          <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-amber-500' : ''}`} />
          <span>{isSaved ? 'Saved' : 'Bookmark'}</span>
        </button>

        <div className="flex items-center gap-2">
          {onSelectJob && (
            <button
              onClick={() => onSelectJob(job)}
              className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Details
            </button>
          )}

          <button
            onClick={handleApplyClick}
            className="px-4 py-2 rounded-xl text-xs font-black bg-primary-600 hover:bg-primary-500 text-white transition-all shadow-md shadow-primary-600/20 flex items-center gap-1.5 active:scale-95"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Apply Now ({job.sourcePortal})</span>
            <ExternalLink className="w-3 h-3 text-primary-200" />
          </button>
        </div>

      </div>

    </div>
  );
};
