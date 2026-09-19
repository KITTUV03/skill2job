'use client';

import React from 'react';
import { 
  X, 
  MapPin, 
  Briefcase, 
  DollarSign, 
  Calendar, 
  Building2, 
  CheckCircle2, 
  Send, 
  Bookmark, 
  Sparkles,
  Globe,
  Clock,
  Award,
  AlertCircle
} from 'lucide-react';
import { Job } from '@/types';
import { useApp } from '@/lib/store';

interface JobDetailModalProps {
  job: Job;
  onClose: () => void;
}

export const JobDetailModal: React.FC<JobDetailModalProps> = ({ job, onClose }) => {
  const { savedJobIds, toggleSaveJob, addApplication, applications, resumeProfile } = useApp();
  const isSaved = savedJobIds.includes(job.id);
  const isApplied = applications.some(a => a.jobId === job.id);

  const matchScore = job.matchScore || 88;

  const resumeSkills = (resumeProfile?.skills || ['SystemVerilog', 'UVM', 'PyTorch', 'React', 'STA Timing']).map(s => s.toLowerCase());
  const jobSkills = job.skills || [];

  const matchedSkills = jobSkills.filter(s => 
    resumeSkills.some(rs => rs.includes(s.toLowerCase()) || s.toLowerCase().includes(rs))
  );
  const missingSkills = jobSkills.filter(s => !matchedSkills.includes(s));

  const handleApplyClick = () => {
    const success = addApplication(job);
    if (success) {
      if (job.applicationUrl) {
        window.open(job.applicationUrl, '_blank', 'noopener,noreferrer');
      }
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-3xl max-h-[90vh] rounded-3xl glass-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between gap-4 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-start gap-4 min-w-0">
            <img
              src={job.logo}
              alt={job.company}
              className="w-14 h-14 rounded-2xl object-cover ring-2 ring-slate-200 dark:ring-slate-800 shadow-md shrink-0"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="text-xs font-black text-slate-800 dark:text-slate-200">{job.company}</span>
                <span className="px-2.5 py-0.5 text-[10px] font-extrabold rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-400 border border-primary-500/20">
                  {job.sourcePortal}
                </span>
                <span className="text-[11px] text-slate-400 flex items-center gap-1 font-medium">
                  <Clock className="w-3 h-3" /> {job.postedTimeAgo || 'Posted 15 Minutes Ago'}
                </span>
              </div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white truncate">{job.title}</h2>
              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600 dark:text-slate-300 mt-2">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {job.location}</span>
                <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5 text-slate-400" /> {job.experienceLevel} • {job.workMode}</span>
                <span className="flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400"><DollarSign className="w-3.5 h-3.5" /> {job.salary}</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          
          {/* AI Match Score Breakdown Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-primary-600/10 via-secondary-600/10 to-accent-500/10 border border-primary-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400 animate-pulse shrink-0" />
              <div>
                <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">AI Compatibility Vector: {matchScore}% Overall Match</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {matchedSkills.length} matching qualifications detected • High interview probability
                </p>
              </div>
            </div>
            <span className="px-3.5 py-1 text-xs font-black rounded-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-md shrink-0">
              {matchScore}% Match
            </span>
          </div>

          {/* Skill Breakdown */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Skill Compatibility Analysis</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-500/20 space-y-2">
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Matched Skills ({matchedSkills.length})
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {matchedSkills.length > 0 ? matchedSkills.map((s, i) => (
                    <span key={i} className="px-2 py-0.5 text-[11px] font-semibold rounded-md bg-emerald-500/15 text-emerald-800 dark:text-emerald-300">
                      {s}
                    </span>
                  )) : (
                    <span className="text-xs text-slate-400">General qualification alignment</span>
                  )}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-500/20 space-y-2">
                <span className="text-xs font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-600" /> Missing / Bonus Skills ({missingSkills.length})
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {missingSkills.length > 0 ? missingSkills.map((s, i) => (
                    <span key={i} className="px-2 py-0.5 text-[11px] font-semibold rounded-md bg-amber-500/15 text-amber-800 dark:text-amber-300">
                      {s}
                    </span>
                  )) : (
                    <span className="text-xs text-emerald-600 font-semibold">100% skill coverage!</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Job Description</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {job.description}
            </p>
          </div>

          {/* Responsibilities */}
          {job.responsibilities && job.responsibilities.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Key Responsibilities</h3>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                {job.responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-600 mt-2 shrink-0" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Benefits */}
          {job.benefits && job.benefits.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Compensation & Perks</h3>
              <div className="flex flex-wrap gap-2">
                {job.benefits.map((benefit, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-xs font-medium rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                  >
                    {benefit}
                  </span>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Sticky Apply Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/90 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => toggleSaveJob(job.id)}
            className={`px-4 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all ${
              isSaved
                ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:bg-slate-100'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-500' : ''}`} />
            <span>{isSaved ? 'Saved' : 'Save Job'}</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleApplyClick}
              disabled={isApplied}
              className={`px-6 py-2.5 rounded-xl text-xs font-black shadow-md transition-all flex items-center gap-2 ${
                isApplied
                  ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 cursor-default'
                  : 'bg-primary-600 hover:bg-primary-500 text-white shadow-primary-600/25 active:scale-95'
              }`}
            >
              <Send className="w-4 h-4" />
              <span>{isApplied ? 'Application Tracked ✓' : `Apply on ${job.sourcePortal}`}</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
