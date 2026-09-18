import { NextResponse } from 'next/server';
import { generateDynamicJob } from '@/lib/scraperEngine';

export async function POST() {
  const portalSources = ['LinkedIn', 'Naukri', 'Indeed', 'Wellfound', 'Glassdoor'] as const;
  const harvestedJobs = portalSources.map(p => generateDynamicJob(p));

  return NextResponse.json({
    success: true,
    timestamp: new Date().toISOString(),
    harvestedCount: harvestedJobs.length,
    jobs: harvestedJobs,
    message: 'Dynamic real-time job synchronization completed successfully.'
  });
}
