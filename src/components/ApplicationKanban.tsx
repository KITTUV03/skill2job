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
  CheckCircle2
} from 'lucide-react';
import { ApplicationStatus, JobApplication } from '@/types';
import { useApp } from '@/lib/store';

export const ApplicationKanban: React.FC = () => {
  const { applications, updateApplicationStatus } = useApp();

  const columns: { status: ApplicationStatus; title: string; color: string; bg: string }[] = [
    { status: 'Applied', title: 'Applied Jobs', color: 'border-blue-500 text-blue-600', bg: 'bg-blue-500/10' },
    { status: 'Under Review', title: 'Under Review', color: 'border-purple-500 text-purple-600', bg: 'bg-purple-500/10' },
    { status: 'Interview Scheduled', title: 'Interview Scheduled', color: 'border-amber-500 text-amber-600', bg: 'bg-amber-500/10' },
    { status: 'Offer Received', title: 'Offer Received', color: 'border-emerald-500 text-emerald-600', bg: 'bg-emerald-500/10' },
    { status: 'Rejected', title: 'Archived / Rejected', color: 'border-slate-500 text-slate-500', bg: 'bg-slate-500/10' },
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
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Kanban className="w-5 h-5 text-blue-500" />
            Applications Tracker Board
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Track and advance your job application pipeline in real-time</p>
        </div>
        <div className="px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 text-xs font-bold">
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
              className="flex flex-col rounded-3xl glass-card bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-4 min-h-[500px]"
            >
              
              {/* Column Title */}
              <div className={`flex items-center justify-between pb-3 border-b-2 ${col.color} mb-3`}>
                <h3 className="font-bold text-xs text-slate-900 dark:text-white uppercase tracking-wider">{col.title}</h3>
                <span className={`px-2 py-0.5 text-xs font-extrabold rounded-full ${col.bg} ${col.color}`}>
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
                        className="p-4 rounded-2xl glass-card bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shadow-md space-y-2 group hover:border-blue-500/40 transition-all"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-slate-400">{app.sourcePortal}</span>
                          <span className="px-2 py-0.5 text-[10px] font-extrabold rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
                            {app.matchScore}% Match
                          </span>
                        </div>

                        <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-snug">{app.jobTitle}</h4>
                        <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">{app.company}</p>

                        <div className="text-[10px] text-slate-500 dark:text-slate-400 space-y-1 pt-1 border-t border-slate-100 dark:border-slate-700/60">
                          <div className="flex items-center gap-1"><MapPin className="w-3 h-3 text-slate-400" /> {app.location}</div>
                          <div className="flex items-center gap-1"><Calendar className="w-3 h-3 text-slate-400" /> Applied: {app.appliedDate}</div>
                          {app.notes && (
                            <p className="p-1.5 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-300 font-medium">
                              📌 {app.notes}
                            </p>
                          )}
                        </div>

                        {/* Move status buttons */}
                        <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-700/60">
                          {prev ? (
                            <button
                              onClick={() => updateApplicationStatus(app.id, prev)}
                              className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-900 transition-colors"
                              title={`Move to ${prev}`}
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </button>
                          ) : <div />}

                          {next ? (
                            <button
                              onClick={() => updateApplicationStatus(app.id, next)}
                              className="px-2 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold shadow-sm flex items-center gap-1 transition-all"
                              title={`Advance to ${next}`}
                            >
                              <span>Advance</span>
                              <ChevronRight className="w-3 h-3" />
                            </button>
                          ) : (
                            <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> Offer Complete
                            </span>
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
