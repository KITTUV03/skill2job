import { IJobProvider, RawJobPayload, SyncResult } from './types';
import { 
  LinkedInJobsProvider, 
  IndeedJobsProvider, 
  NaukriJobsProvider, 
  WellfoundJobsProvider, 
  GlassdoorJobsProvider, 
  FounditJobsProvider, 
  CompanyCareerPageProvider,
  generateJobSignature 
} from './providers';
import { Job, ResumeProfile } from '../../types';
import { calculateMatchScore } from '../aiMatching';

export class DynamicJobAggregationEngine {
  private providers: Map<string, IJobProvider> = new Map();
  private jobsDatabase: Map<string, Job> = new Map();
  private knownSignatures: Set<string> = new Set();
  private syncLogs: SyncResult[] = [];

  constructor() {
    this.registerProvider(new LinkedInJobsProvider());
    this.registerProvider(new IndeedJobsProvider());
    this.registerProvider(new NaukriJobsProvider());
    this.registerProvider(new WellfoundJobsProvider());
    this.registerProvider(new GlassdoorJobsProvider());
    this.registerProvider(new FounditJobsProvider());
    this.registerProvider(new CompanyCareerPageProvider());
  }

  public registerProvider(provider: IJobProvider) {
    this.providers.set(provider.metadata.name, provider);
  }

  public getRegisteredProviders(): IJobProvider[] {
    return Array.from(this.providers.values());
  }

  /**
   * Performs full synchronization cycle across all registered providers with
   * deduplication, expiry checks, and signature tracking.
   */
  public async syncAllProviders(currentProfile?: ResumeProfile): Promise<SyncResult[]> {
    const results: SyncResult[] = [];
    const now = new Date();

    const providerEntries = Array.from(this.providers.entries());
    for (const [providerName, provider] of providerEntries) {
      if (!provider.metadata.enabled) continue;

      const syncResult: SyncResult = {
        provider: provider.metadata.name,
        totalFetched: 0,
        newJobsAdded: 0,
        existingUpdated: 0,
        duplicatesSkipped: 0,
        expiredRemoved: 0,
        timestamp: now.toISOString(),
        status: 'SUCCESS'
      };

      try {
        const rawListings = await provider.fetchJobs();
        syncResult.totalFetched = rawListings.length;

        for (const raw of rawListings) {
          const sig = generateJobSignature(raw.title, raw.company, raw.location);

          // Deduplication check
          if (this.knownSignatures.has(sig)) {
            syncResult.duplicatesSkipped++;
            continue;
          }

          // Convert raw payload to internal Job model
          const jobRecord: Job = {
            id: `job-agg-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
            title: raw.title,
            company: raw.company,
            logo: raw.companyLogo || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=60',
            location: raw.location,
            domain: raw.domain,
            employmentType: raw.employmentType,
            workMode: raw.workMode,
            experienceLevel: raw.experienceLevel,
            salary: raw.salary,
            skills: raw.skills,
            description: raw.description,
            responsibilities: raw.responsibilities,
            benefits: raw.benefits,
            sourcePortal: raw.sourcePortal,
            applicationUrl: raw.applicationUrl,
            postedDate: raw.postedDate,
            lastUpdated: now.toISOString(),
            isActive: true,
            isNew: true
          };

          // Calculate AI match score if resume profile exists
          if (currentProfile) {
            const breakdown = calculateMatchScore(jobRecord, currentProfile);
            jobRecord.matchScore = breakdown.overallScore;
            jobRecord.matchBreakdown = breakdown;
          } else {
            jobRecord.matchScore = 85;
          }

          this.knownSignatures.add(sig);
          this.jobsDatabase.set(jobRecord.id, jobRecord);
          syncResult.newJobsAdded++;
        }

        provider.metadata.lastSyncTimestamp = now.toISOString();
        provider.metadata.status = 'HEALTHY';
      } catch (err: any) {
        syncResult.status = 'FAILED';
        syncResult.error = err?.message || 'Unknown synchronization error';
        provider.metadata.status = 'DEGRADED';
      }

      results.push(syncResult);
      this.syncLogs.unshift(syncResult);
    }

    // Purge expired jobs older than 30 days
    this.cleanExpiredJobs();

    return results;
  }

  /**
   * Ingests a manual external batch of jobs into the persistent engine
   */
  public ingestJobsBatch(jobs: Job[], currentProfile?: ResumeProfile): number {
    let addedCount = 0;
    for (const job of jobs) {
      const sig = generateJobSignature(job.title, job.company, job.location);
      if (!this.knownSignatures.has(sig)) {
        this.knownSignatures.add(sig);

        if (currentProfile) {
          const breakdown = calculateMatchScore(job, currentProfile);
          job.matchScore = breakdown.overallScore;
          job.matchBreakdown = breakdown;
        }

        this.jobsDatabase.set(job.id, job);
        addedCount++;
      }
    }
    return addedCount;
  }

  /**
   * Recalculates match scores for all stored jobs against an updated profile
   * and returns them strictly sorted by matchScore descending.
   */
  public recalculateMatches(profile: ResumeProfile): Job[] {
    const updatedJobs: Job[] = [];
    const jobList = Array.from(this.jobsDatabase.values());
    for (const job of jobList) {
      const breakdown = calculateMatchScore(job, profile);
      job.matchScore = breakdown.overallScore;
      job.matchBreakdown = breakdown;
      updatedJobs.push(job);
    }
    return updatedJobs.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
  }

  /**
   * Removes listings older than 30 days
   */
  public cleanExpiredJobs(): number {
    const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
    let purgedCount = 0;

    const entries = Array.from(this.jobsDatabase.entries());
    for (const [id, job] of entries) {
      const postedTime = new Date(job.postedDate).getTime();
      if (!isNaN(postedTime) && postedTime < thirtyDaysAgo) {
        this.jobsDatabase.delete(id);
        purgedCount++;
      }
    }
    return purgedCount;
  }

  public getAllJobs(): Job[] {
    return Array.from(this.jobsDatabase.values()).sort(
      (a, b) => (b.matchScore || 0) - (a.matchScore || 0)
    );
  }

  public getRecentSyncLogs(): SyncResult[] {
    return this.syncLogs.slice(0, 20);
  }
}

// Global Singleton Instance
export const globalJobAggregator = new DynamicJobAggregationEngine();
