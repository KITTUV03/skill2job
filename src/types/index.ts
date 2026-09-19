export type JobDomain = 
  | 'VLSI / Semiconductor'
  | 'Software Engineering'
  | 'AI / Machine Learning'
  | 'Data Science & Analytics'
  | 'Embedded Systems'
  | 'Electronics & Hardware'
  | 'Finance & FinTech'
  | 'Marketing & Growth';

export type JobPortalSource = 
  | 'LinkedIn'
  | 'Naukri'
  | 'Indeed'
  | 'Wellfound'
  | 'Foundit'
  | 'Glassdoor'
  | 'Company Career Page';

export type EmploymentType = 'Full-Time' | 'Part-Time' | 'Contract' | 'Internship' | 'Remote';

export type WorkMode = 'Remote' | 'Hybrid' | 'Onsite';

export interface MatchBreakdown {
  overallScore: number; // 0-100
  skillMatchScore: number; // 0-100
  experienceMatchScore: number; // 0-100
  locationMatchScore: number; // 0-100
  matchedSkills: string[];
  missingSkills: string[];
}

export interface Job {
  id: string;
  title: string;
  company: string;
  logo: string; // URL or fallback SVG icon key
  location: string;
  domain: JobDomain;
  employmentType: EmploymentType;
  workMode: WorkMode;
  experienceLevel: string; // e.g. "0-2 Yrs", "3-5 Yrs", "5+ Yrs"
  salary: string; // e.g. "$120,000 - $160,000" or "₹18 - ₹25 LPA"
  skills: string[];
  description: string;
  responsibilities: string[];
  benefits: string[];
  sourcePortal: JobPortalSource;
  applicationUrl: string;
  postedDate: string; // ISO date or string
  lastUpdated: string;
  isActive: boolean;
  isNew?: boolean;
  matchScore?: number;
  matchBreakdown?: MatchBreakdown;
  postedTimeAgo?: string;
  lastVerifiedAgo?: string;
}

export interface ResumeProfile {
  id: string;
  fileName: string;
  uploadedAt: string;
  rawText: string;
  skills: string[];
  experienceYears: number;
  education: {
    degree: string;
    institution: string;
    year: string;
  }[];
  certifications: string[];
  projects: {
    title: string;
    description: string;
    techStack: string[];
  }[];
  preferredRoles: string[];
  targetDomains: JobDomain[];
  locationPreference: string;
  expectedSalary?: string;
}

export type ApplicationStatus = 
  | 'Applied' 
  | 'Under Review' 
  | 'Interview Scheduled' 
  | 'Offer Received' 
  | 'Rejected';

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  logo: string;
  location: string;
  status: ApplicationStatus;
  appliedDate: string;
  notes?: string;
  matchScore: number;
  salary: string;
  sourcePortal: JobPortalSource;
}

export interface ScraperStatus {
  portal: JobPortalSource;
  status: 'Active' | 'Syncing' | 'Paused' | 'Error';
  lastSync: string;
  jobCount: number;
  health: number; // percentage 0-100
}

export interface ScraperLog {
  id: string;
  timestamp: string;
  portal: JobPortalSource;
  jobsHarvested: number;
  status: 'SUCCESS' | 'WARNING' | 'ERROR';
  message: string;
}

export interface SystemStats {
  totalJobs: number;
  newToday: number;
  activeCompanies: number;
  totalApplications: number;
  matchSuccessRate: number; // percentage e.g. 94.2
  lastSyncedText: string;
  activeJobsText: string;
  newJobsTodayText: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  title: string;
  location: string;
  resumeProfile?: ResumeProfile;
  savedJobIds: string[];
}
