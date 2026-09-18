import { NextResponse } from 'next/server';
import { globalJobAggregator } from '@/lib/jobAggregator/engine';

export async function POST() {
  try {
    const syncResults = await globalJobAggregator.syncAllProviders();
    const allJobs = globalJobAggregator.getAllJobs();

    const totalNew = syncResults.reduce((acc, r) => acc + r.newJobsAdded, 0);
    const totalDuplicates = syncResults.reduce((acc, r) => acc + r.duplicatesSkipped, 0);

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      summary: {
        totalProvidersSynced: syncResults.length,
        newJobsIngested: totalNew,
        duplicatesPrevented: totalDuplicates,
        totalActiveDatabaseJobs: allJobs.length
      },
      providerResults: syncResults,
      message: `Multi-portal synchronization executed. ${totalNew} new jobs added, ${totalDuplicates} duplicates filtered.`
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || 'Sync failed' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    recentLogs: globalJobAggregator.getRecentSyncLogs(),
    registeredProviders: globalJobAggregator.getRegisteredProviders().map(p => p.metadata)
  });
}
