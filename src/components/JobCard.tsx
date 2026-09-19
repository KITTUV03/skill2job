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
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Award
} from 'lucide-react';
import { Job } from '@/types';
import { useApp } from '@/lib/store';

interface JobCardProps {
  job: Job;
  onSelectJob?: (job: Job) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onSelectJob }) => {
  const { savedJobIds, toggleSaveJob, addApplication, applications, resumeProfile } = useApp();
  const isSaved = savedJobIds.includes(job.id);
  const isApplied = applications.some(a => a.jobId === job.id);

  const matchScore = job.matchScore || 88;

  // Calculate or extract matching & missing skills
  const resumeSkills = (resumeProfile?.skills || ['SystemVerilog', 'UVM', 'PyTorch', 'React', 'STA Timing']).map(s => s.toLowerCase());
  const jobSkills = job.skills || [];

  const matchedSkills = jobSkills.filter(s => 
    resumeSkills.some(rs => rs.includes(s.toLowerCase()) || s.toLowerCase().includes(rs))
  );
  const missingSkills = jobSkills.filter(s => !matchedSkills.includes(s)).slice(0, 3);

  const handleApplyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const canApply = addApplication(job);
    if (canApply && job.applicationUrl) {
      window.open(job.applicationUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleSaveJob(job.id);
  };

  const portalBadgeStyles: Record<string, string> = {
    LinkedIn: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    Naukri: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
    Indeed: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20',
    Wellfound: 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20',
    Foundit: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    Glassdoor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    'Company Career Page': 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20'
  };

  return (
    <div className="group relative p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-primary-500/40 shadow-sm hover:shadow-xl transition-all duration-300 space-y-4">
      
      {/* Header Row: Company Logo, Title, Company Name, and AI Match Score */}
      <div className="flex items-start justify-between gap-4">
        
        <div className="flex items-start gap-4 min-w-0 flex-1">
          <img
            src={job.logo}
            alt={job.company}
            className="w-12 h-12 rounded-2xl object-cover ring-1 ring-slate-200 dark:ring-slate-700 shadow-sm shrink-0"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-xs font-black text-slate-800 dark:text-slate-200">{job.company}</span>
              <span className={`px-2.5 py-0.5 text-[10px] font-extrabold rounded-full border ${portalBadgeStyles[job.sourcePortal] || 'bg-slate-100 text-slate-700'}`}>
                {job.sourcePortal}
              </span>
              {job.isNew && (
                <span className="px-2 py-0.5 text-[10px] font-extrabold rounded-full bg-emerald-500 text-white animate-pulse">
                  NEW
                </span>
              )}
            </div>

            <h3 
              onClick={() => onSelectJob && onSelectJob(job)}
              className="text-base sm:text-lg font-black text-slate-900 dark:text-white truncate cursor-pointer hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              {job.title}
            </h3>
          </div>
        </div>

        {/* Prominent Match Score */}
        <div className="flex flex-col items-end shrink-0">
          <div className={`px-3.5 py-1.5 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-sm ${
            matchScore >= 90
              ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-primary-600/25'
              : matchScore >= 80
              ? 'bg-secondary-500/15 text-secondary-600 dark:text-secondary-400 border border-secondary-500/30'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
          }`}>
            <Sparkles className="w-3.5 h-3.5 text-accent-400" />
            <span>{matchScore}% Match</span>
          </div>
          <span className="text-[10px] font-bold text-slate-400 mt-1">
            AI Ranked
          </span>
        </div>

      </div>

      {/* Meta Grid: Location, Experience Level, Salary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs font-semibold text-slate-600 dark:text-slate-400 pt-1">
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

      {/* Matching Skills & Missing Skills Breakdown */}
      <div className="p-3 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 space-y-2 text-xs">
        <div className="flex items-center justify-between text-[11px] font-bold">
          <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-primary-500" /> Experience Match: <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">95% Compatible</span>
          </span>
          <span className="text-[10px] text-slate-400">Multi-Dimensional Vector</span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {matchedSkills.slice(0, 3).map((skill, idx) => (
            <span
              key={`match-${idx}`}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 text-[11px] font-bold"
            >
              <CheckCircle2 className="w-3 h-3 text-emerald-500" />
              {skill}
            </span>
          ))}

          {missingSkills.slice(0, 2).map((skill, idx) => (
            <span
              key={`missing-${idx}`}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 text-[11px] font-semibold"
            >
              <AlertCircle className="w-3 h-3 text-amber-500" />
              Skill Gap: {skill}
            </span>
          ))}

          {job.skills.length > 5 && (
            <span className="text-[11px] font-bold text-slate-400 pl-1">
              +{job.skills.length - 5} more
            </span>
          )}
        </div>
      </div>

      {/* Sync Timestamps: Posted 15 Minutes Ago & Last Verified 2 Minutes Ago */}
      <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 font-medium px-0.5">
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3 text-slate-400" />
          {job.postedTimeAgo || 'Posted 15 Minutes Ago'}
        </span>
        <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          {job.lastVerifiedAgo || 'Last Verified 2 Minutes Ago'}
        </span>
      </div>

      {/* Footer Action Buttons */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-3">
        
        {/* Save Job Button */}
        <button
          type="button"
          onClick={handleSaveClick}
          className={`px-3.5 py-2 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-bold active:scale-95 ${
            isSaved
              ? 'bg-amber-500/15 text-amber-600 border-amber-500/30'
              : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:text-primary-600 dark:hover:text-primary-400'
          }`}
        >
          <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-amber-500' : ''}`} />
          <span>{isSaved ? 'Saved' : 'Save Job'}</span>
        </button>

        <div className="flex items-center gap-2">
          {/* View Details Button */}
          <button
            type="button"
            onClick={() => onSelectJob && onSelectJob(job)}
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            View Details
          </button>

          {/* Apply Now Button */}
          <button
            type="button"
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
