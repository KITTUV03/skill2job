import { NextRequest, NextResponse } from 'next/server';
import { globalJobAggregator } from '@/lib/jobAggregator/engine';
import { INITIAL_JOBS } from '@/lib/jobData';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get('domain');
  const search = searchParams.get('search');
  const portal = searchParams.get('portal');
  const workMode = searchParams.get('workMode');
  const limit = parseInt(searchParams.get('limit') || '50', 10);
  const page = parseInt(searchParams.get('page') || '1', 10);

  let pool = globalJobAggregator.getAllJobs();
  if (pool.length === 0) {
    globalJobAggregator.ingestJobsBatch(INITIAL_JOBS);
    pool = globalJobAggregator.getAllJobs();
  }

  let filtered = [...pool];

  if (domain && domain !== 'All Domains') {
    filtered = filtered.filter(j => j.domain === domain);
  }

  if (portal && portal !== 'All Portals') {
    filtered = filtered.filter(j => j.sourcePortal === portal);
  }

  if (workMode && workMode !== 'All Modes') {
    filtered = filtered.filter(j => j.workMode === workMode);
  }

  if (search) {
    const term = search.toLowerCase();
    filtered = filtered.filter(j => 
      j.title.toLowerCase().includes(term) ||
      j.company.toLowerCase().includes(term) ||
      j.skills.some(s => s.toLowerCase().includes(term))
    );
  }

  // Sort descending by matchScore
  filtered.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));

  const total = filtered.length;
  const startIndex = (page - 1) * limit;
  const paginatedJobs = filtered.slice(startIndex, startIndex + limit);

  return NextResponse.json({
    success: true,
    page,
    limit,
    total,
    jobs: paginatedJobs
  });
}
