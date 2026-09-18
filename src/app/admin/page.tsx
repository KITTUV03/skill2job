'use client';

import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { ScraperStatusTerminal } from '@/components/ScraperStatusTerminal';

export default function AdminPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <Sidebar />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Admin Harvester & Job Sync Panel</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Monitor multi-portal scraper connections, trigger manual syncs, and view ingestion logs.</p>
        </div>
        <ScraperStatusTerminal />
      </main>
    </div>
  );
}
