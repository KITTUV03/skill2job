'use client';

import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { ResumeUploader } from '@/components/ResumeUploader';
import { ProtectedRoute } from '@/components/ProtectedRoute';

export default function ResumePage() {
  return (
    <ProtectedRoute>
      <div className="flex min-h-[calc(100vh-4rem)]">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">AI Resume Upload & Parsing Profile</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Upload your resume to extract skills, certifications, experience, and calculate job match scores.
            </p>
          </div>
          <ResumeUploader />
        </main>
      </div>
    </ProtectedRoute>
  );
}
