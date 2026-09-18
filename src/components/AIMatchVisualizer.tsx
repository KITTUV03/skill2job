'use client';

import React from 'react';
import { Sparkles, Brain, ArrowDown, CheckCircle2, AlertCircle, Zap } from 'lucide-react';
import { useApp } from '@/lib/store';

export const AIMatchVisualizer: React.FC = () => {
  const { resumeProfile, jobs } = useApp();

  const sampleMatchedJobs = jobs.slice(0, 3);

  return (
    <div className="p-6 rounded-3xl glass-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
      
      {/* Engine Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-cyan-400 p-0.5 shadow-md">
            <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
              <Brain className="w-5 h-5 text-cyan-400 animate-pulse" />
            </div>
          </div>
          <div>
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">AI Neural Matching Engine</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Multi-dimensional vector scoring (Skills, Seniority, Location, Salary)</p>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
          Neural Model Active
        </span>
      </div>

      {/* Visual Pipeline Steps */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
        
        {/* Step 1: Resume Vector */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
          <span className="text-[10px] font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Step 1 • Parsed Input</span>
          <h4 className="text-xs font-bold text-slate-900 dark:text-white">Resume Skills Vector</h4>
          <div className="flex flex-wrap gap-1 pt-1">
            {(resumeProfile?.skills || ['SystemVerilog', 'UVM', 'PyTorch', 'React']).slice(0, 4).map((s, idx) => (
              <span key={idx} className="px-2 py-0.5 text-[10px] font-medium rounded bg-blue-500/10 text-blue-600 dark:text-blue-400">
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Arrow Down / Right */}
        <div className="hidden md:flex items-center justify-center">
          <ArrowDown className="w-5 h-5 text-purple-500 -rotate-90 animate-pulse" />
        </div>

        {/* Step 2: Processing Matrix */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
          <span className="text-[10px] font-extrabold text-purple-600 dark:text-purple-400 uppercase tracking-widest">Step 2 • Processing</span>
          <h4 className="text-xs font-bold text-slate-900 dark:text-white">Taxonomy Cross-Check</h4>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">Computing TF-IDF cosine similarity & domain requirement weights.</p>
        </div>

        {/* Step 3: Ranked Score output */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
          <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Step 3 • Output</span>
          <h4 className="text-xs font-bold text-slate-900 dark:text-white">Ranked Recommendation</h4>
          <span className="inline-block px-2.5 py-0.5 text-xs font-extrabold rounded-full bg-emerald-500 text-white">
            Top 96% Match
          </span>
        </div>

      </div>

      {/* Match Percentage Progress Meters */}
      <div className="space-y-3 pt-2">
        <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
          Top Opportunity Score Breakdown
        </h4>

        {sampleMatchedJobs.map((job) => {
          const breakdown = job.matchBreakdown || {
            overallScore: job.matchScore || 88,
            skillMatchScore: 92,
            experienceMatchScore: 85,
            locationMatchScore: 90,
            matchedSkills: job.skills.slice(0, 3),
            missingSkills: job.skills.slice(3, 5)
          };

          return (
            <div key={job.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="text-xs font-bold text-slate-900 dark:text-white">{job.title}</h5>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">{job.company} • {job.domain}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-extrabold text-blue-600 dark:text-blue-400">{breakdown.overallScore}% Overall Match</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-400 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${breakdown.overallScore}%` }}
                />
              </div>

              {/* Matched & Missing Skills tags */}
              <div className="flex flex-wrap gap-4 text-[11px] pt-1">
                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Matched ({breakdown.matchedSkills.length}): {breakdown.matchedSkills.join(', ')}</span>
                </div>
                {breakdown.missingSkills.length > 0 && (
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>To Acquire: {breakdown.missingSkills.join(', ')}</span>
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
