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
  Globe
} from 'lucide-react';
import { Job } from '@/types';
import { useApp } from '@/lib/store';

interface JobDetailModalProps {
  job: Job;
  onClose: () => void;
}

export const JobDetailModal: React.FC<JobDetailModalProps> = ({ job, onClose }) => {
  const { savedJobIds, toggleSaveJob, addApplication, applications } = useApp();
  const isSaved = savedJobIds.includes(job.id);
  const isApplied = applications.some(a => a.jobId === job.id);

  const matchScore = job.matchScore || 88;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-3xl max-h-[90vh] rounded-3xl glass-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between gap-4 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-start gap-4">
            <img
              src={job.logo}
              alt={job.company}
              className="w-14 h-14 rounded-2xl object-cover ring-2 ring-slate-200 dark:ring-slate-800 shadow-md shrink-0"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{job.company}</span>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                  {job.sourcePortal}
                </span>
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">{job.title}</h2>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 dark:text-slate-300 mt-2">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {job.location}</span>
                <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5 text-slate-400" /> {job.experienceLevel} • {job.workMode}</span>
                <span className="flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400"><DollarSign className="w-3.5 h-3.5" /> {job.salary}</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-200/60 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          
          {/* AI Match Score Breakdown Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-cyan-500/10 border border-blue-500/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400 animate-pulse" />
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">AI Resume Compatibility</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">High alignment with your uploaded skills vector</p>
              </div>
            </div>
            <span className="px-3 py-1 text-sm font-extrabold rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md">
              {matchScore}% Match
            </span>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Job Description</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {job.description}
            </p>
          </div>

          {/* Responsibilities */}
          {job.responsibilities && job.responsibilities.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Key Responsibilities</h3>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                {job.responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Required Skills */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Required Skills & Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill, idx) => (
                <span key={idx} className="px-3 py-1 text-xs font-semibold rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Benefits */}
          {job.benefits && job.benefits.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Benefits & Perks</h3>
              <div className="flex flex-wrap gap-2">
                {job.benefits.map((b, idx) => (
                  <span key={idx} className="px-3 py-1 text-xs font-medium rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    ✓ {b}
                  </span>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Sticky Apply Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/90 flex items-center justify-between gap-4">
          <button
            onClick={() => toggleSaveJob(job.id)}
            className={`px-4 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-colors ${
              isSaved
                ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:bg-slate-100'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-500' : ''}`} />
            <span>{isSaved ? 'Saved' : 'Save Job'}</span>
          </button>

          <div className="flex items-center gap-3">
            <a
              href={job.applicationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 flex items-center gap-1 transition-colors"
            >
              <Globe className="w-4 h-4" />
              Source Link
            </a>

            <button
              onClick={() => {
                addApplication(job);
                onClose();
              }}
              disabled={isApplied}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-2 ${
                isApplied
                  ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 cursor-default'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-blue-500/25 active:scale-95'
              }`}
            >
              <Send className="w-4 h-4" />
              <span>{isApplied ? 'Application Submitted ✓' : 'Apply Now Directly'}</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
