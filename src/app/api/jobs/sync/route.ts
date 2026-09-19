import { NextResponse } from 'next/server';
import { syncScheduler } from '@/lib/jobAggregator/syncScheduler';
import { globalJobAggregator } from '@/lib/jobAggregator/engine';

export async function POST() {
  try {
    const syncResults = await syncScheduler.executeSyncCycle();
    const metrics = syncScheduler.getMetrics();
    const relativeTime = syncScheduler.getRelativeSyncTime();

    const totalNew = syncResults.reduce((acc, r) => acc + r.newJobsAdded, 0);
    const totalDuplicates = syncResults.reduce((acc, r) => acc + r.duplicatesSkipped, 0);

    return NextResponse.json({
      success: true,
      timestamp: metrics.lastSyncedTimestamp,
      relativeSyncTime: `Last Synced ${relativeTime}`,
      metrics: {
        totalActiveJobs: metrics.totalActiveJobs,
        newJobsAddedToday: metrics.newJobsAddedToday,
        companiesHiring: metrics.companiesHiring,
        displayActiveJobsText: `${metrics.totalActiveJobs.toLocaleString()} Active Jobs`,
        displayNewJobsText: `${metrics.newJobsAddedToday.toLocaleString()} New Jobs Added Today`,
        displayLastSyncedText: `Last Synced ${relativeTime}`
      },
      summary: {
        totalProvidersSynced: syncResults.length,
        newJobsIngested: totalNew,
        duplicatesPrevented: totalDuplicates,
        totalActiveDatabaseJobs: metrics.totalActiveJobs
      },
      queue: syncScheduler.getQueue(),
      providerResults: syncResults,
      message: `Multi-portal synchronization executed. ${totalNew} new jobs ingested, ${totalDuplicates} duplicates filtered.`
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || 'Sync failed' },
      { status: 500 }
    );
  }
}

export async function GET() {
  const metrics = syncScheduler.getMetrics();
  const relativeTime = syncScheduler.getRelativeSyncTime();

  return NextResponse.json({
    success: true,
    metrics: {
      totalActiveJobs: metrics.totalActiveJobs,
      newJobsAddedToday: metrics.newJobsAddedToday,
      companiesHiring: metrics.companiesHiring,
      displayActiveJobsText: `${metrics.totalActiveJobs.toLocaleString()} Active Jobs`,
      displayNewJobsText: `${metrics.newJobsAddedToday.toLocaleString()} New Jobs Added Today`,
      displayLastSyncedText: `Last Synced ${relativeTime}`
    },
    queue: syncScheduler.getQueue(),
    recentLogs: globalJobAggregator.getRecentSyncLogs(),
    registeredProviders: globalJobAggregator.getRegisteredProviders().map(p => p.metadata)
  });
}
