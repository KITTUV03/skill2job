import { Job, JobDomain, JobPortalSource } from '../../types';

export interface JobProviderMetadata {
  id: string;
  name: JobPortalSource;
  endpoint?: string;
  enabled: boolean;
  rateLimitPerMinute: number;
  lastSyncTimestamp?: string;
  status: 'HEALTHY' | 'DEGRADED' | 'RATE_LIMITED' | 'INACTIVE';
}

export interface RawJobPayload {
  externalId: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  domain: JobDomain;
  employmentType: 'Full-Time' | 'Part-Time' | 'Contract' | 'Internship';
  workMode: 'Remote' | 'Hybrid' | 'Onsite';
  experienceLevel: string;
  salary: string;
  skills: string[];
  description: string;
  responsibilities: string[];
  benefits: string[];
  sourcePortal: JobPortalSource;
  applicationUrl: string;
  postedDate: string;
  expiresDate?: string;
}

export interface SyncResult {
  provider: JobPortalSource;
  totalFetched: number;
  newJobsAdded: number;
  existingUpdated: number;
  duplicatesSkipped: number;
  expiredRemoved: number;
  timestamp: string;
  status: 'SUCCESS' | 'PARTIAL' | 'FAILED';
  error?: string;
}

export interface IJobProvider {
  metadata: JobProviderMetadata;
  fetchJobs(criteria?: { domain?: string; query?: string; limit?: number }): Promise<RawJobPayload[]>;
  verifyHealth(): Promise<boolean>;
}
