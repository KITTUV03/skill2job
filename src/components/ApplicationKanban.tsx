'use client';

import React from 'react';
import { 
  Kanban, 
  MapPin, 
  DollarSign, 
  Calendar, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles,
  CheckCircle2,
  Building2,
  ExternalLink,
  Clock
} from 'lucide-react';
import { ApplicationStatus, JobApplication } from '@/types';
import { useApp } from '@/lib/store';

export const ApplicationKanban: React.FC = () => {
  const { applications, updateApplicationStatus } = useApp();

  const columns: { status: ApplicationStatus; title: string; color: string; badgeColor: string }[] = [
    { status: 'Applied', title: 'Applied', color: 'border-blue-500 text-blue-600 dark:text-blue-400', badgeColor: 'bg-blue-500/15 text-blue-700 dark:text-blue-300' },
    { status: 'Under Review', title: 'Under Review', color: 'border-purple-500 text-purple-600 dark:text-purple-400', badgeColor: 'bg-purple-500/15 text-purple-700 dark:text-purple-300' },
    { status: 'Interview Scheduled', title: 'Interview', color: 'border-amber-500 text-amber-600 dark:text-amber-400', badgeColor: 'bg-amber-500/15 text-amber-700 dark:text-amber-300' },
    { status: 'Offer Received', title: 'Offer', color: 'border-emerald-500 text-emerald-600 dark:text-emerald-400', badgeColor: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300' },
    { status: 'Rejected', title: 'Rejected', color: 'border-slate-500 text-slate-500', badgeColor: 'bg-slate-500/15 text-slate-600 dark:text-slate-400' },
  ];

  const getNextStatus = (current: ApplicationStatus): ApplicationStatus | null => {
    const map: Record<ApplicationStatus, ApplicationStatus | null> = {
      'Applied': 'Under Review',
      'Under Review': 'Interview Scheduled',
      'Interview Scheduled': 'Offer Received',
      'Offer Received': null,
      'Rejected': null
    };
    return map[current];
  };

  const getPrevStatus = (current: ApplicationStatus): ApplicationStatus | null => {
    const map: Record<ApplicationStatus, ApplicationStatus | null> = {
      'Applied': null,
      'Under Review': 'Applied',
      'Interview Scheduled': 'Under Review',
      'Offer Received': 'Interview Scheduled',
      'Rejected': 'Applied'
    };
    return map[current];
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Kanban className="w-5 h-5 text-primary-600" />
            Application Pipeline Tracker
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time status board across 5 stages: Applied, Under Review, Interview, Offer, Rejected
          </p>
        </div>
        <div className="px-3.5 py-1.5 rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-400 border border-primary-500/20 text-xs font-bold">
          Total Active Applications: {applications.length}
        </div>
      </div>

      {/* Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto pb-4">
        {columns.map(col => {
          const colApps = applications.filter(a => a.status === col.status);
          return (
            <div
              key={col.status}
              className="flex flex-col rounded-3xl glass-card bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-4 min-h-[480px]"
            >
              
              {/* Column Header */}
              <div className={`flex items-center justify-between pb-3 border-b-2 ${col.color} mb-3`}>
                <h3 className="font-extrabold text-xs text-slate-900 dark:text-white uppercase tracking-wider">{col.title}</h3>
                <span className={`px-2 py-0.5 text-xs font-black rounded-full ${col.badgeColor}`}>
                  {colApps.length}
                </span>
              </div>

              {/* Cards inside column */}
              <div className="space-y-3 flex-1 overflow-y-auto">
                {colApps.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-400 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                    No applications in this stage
                  </div>
                ) : (
                  colApps.map(app => {
                    const next = getNextStatus(app.status);
                    const prev = getPrevStatus(app.status);
                    return (
                      <div
                        key={app.id}
                        className="p-4 rounded-2xl glass-card bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shadow-md space-y-2.5 group hover:border-primary-500/40 transition-all"
                      >
                        <div className="flex items-center justify-between">
                          <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                            {app.sourcePortal}
                          </span>
                          <span className="text-[10px] font-black text-primary-600 dark:text-primary-400 flex items-center gap-0.5">
                            <Sparkles className="w-3 h-3 text-secondary-500" />
                            {app.matchScore}% Match
                          </span>
                        </div>

                        <div>
                          <h4 className="text-xs font-black text-slate-900 dark:text-white group-hover:text-primary-600 transition-colors">
                            {app.jobTitle}
                          </h4>
                          <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mt-0.5">{app.company}</p>
                        </div>

                        <div className="text-[10px] font-medium text-slate-500 dark:text-slate-400 space-y-1">
                          <div className="flex items-center gap-1 truncate">
                            <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                            <span className="truncate">{app.location}</span>
                          </div>
                          <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                            <DollarSign className="w-3 h-3 shrink-0" />
                            <span>{app.salary}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-400 shrink-0" />
                            <span>Applied: {app.appliedDate}</span>
                          </div>
                        </div>

                        {app.notes && (
                          <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[10px] font-medium text-amber-800 dark:text-amber-300">
                            📌 {app.notes}
                          </div>
                        )}

                        {/* Pipeline Advancement Controls */}
                        <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between gap-1">
                          {prev ? (
                            <button
                              onClick={() => updateApplicationStatus(app.id, prev)}
                              className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 text-[10px] font-bold flex items-center gap-0.5 transition-colors"
                              title={`Back to ${prev}`}
                            >
                              <ChevronLeft className="w-3.5 h-3.5" />
                              <span>Back</span>
                            </button>
                          ) : <div />}

                          {next && (
                            <button
                              onClick={() => updateApplicationStatus(app.id, next)}
                              className="px-2.5 py-1 rounded-lg bg-primary-600 hover:bg-primary-500 text-white text-[10px] font-bold flex items-center gap-1 transition-all shadow-sm active:scale-95"
                              title={`Advance to ${next}`}
                            >
                              <span>Next Stage</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>

                      </div>
                    );
                  })
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
