'use client';

import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { ApplicationKanban } from '@/components/ApplicationKanban';

export default function ApplicationsPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <Sidebar />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto overflow-x-hidden">
        <ApplicationKanban />
      </main>
    </div>
  );
}
