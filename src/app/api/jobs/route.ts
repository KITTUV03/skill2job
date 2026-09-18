import { NextRequest, NextResponse } from 'next/server';
import { INITIAL_JOBS } from '@/lib/jobData';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get('domain');
  const search = searchParams.get('search');
  const portal = searchParams.get('portal');
  const workMode = searchParams.get('workMode');

  let filtered = [...INITIAL_JOBS];

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

  return NextResponse.json({
    success: true,
    total: filtered.length,
    jobs: filtered
  });
}
