import { Job, JobPortalSource, ScraperStatus, ScraperLog } from '../types';

export const INITIAL_SCRAPER_STATUSES: ScraperStatus[] = [
  { portal: 'LinkedIn', status: 'Active', lastSync: '2 minutes ago', jobCount: 1420, health: 99 },
  { portal: 'Naukri', status: 'Active', lastSync: '5 minutes ago', jobCount: 1850, health: 98 },
  { portal: 'Indeed', status: 'Active', lastSync: '1 minute ago', jobCount: 940, health: 96 },
  { portal: 'Wellfound', status: 'Active', lastSync: '12 minutes ago', jobCount: 520, health: 100 },
  { portal: 'Foundit', status: 'Active', lastSync: '8 minutes ago', jobCount: 680, health: 94 },
  { portal: 'Glassdoor', status: 'Active', lastSync: '15 minutes ago', jobCount: 410, health: 97 },
  { portal: 'Company Career Page', status: 'Active', lastSync: 'Just now', jobCount: 2100, health: 100 },
];

export const INITIAL_SCRAPER_LOGS: ScraperLog[] = [
  {
    id: 'log-101',
    timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
    portal: 'LinkedIn',
    jobsHarvested: 14,
    status: 'SUCCESS',
    message: 'Ingested 14 new VLSI & AI/ML opportunities. 0 duplicates removed.'
  },
  {
    id: 'log-102',
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    portal: 'Naukri',
    jobsHarvested: 22,
    status: 'SUCCESS',
    message: 'Ingested 22 Semiconductor & Embedded Systems postings from Bengaluru & Hyderabad.'
  },
  {
    id: 'log-103',
    timestamp: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    portal: 'Wellfound',
    jobsHarvested: 8,
    status: 'SUCCESS',
    message: 'Ingested 8 Remote AI Startup positions.'
  }
];

// Helper to generate a new live job on demand during automated sync cycles
export function generateDynamicJob(portal: JobPortalSource): Job {
  const dynamicTitles = [
    { title: 'Principal ASIC Verification Engineer', domain: 'VLSI / Semiconductor' as const, company: 'AMD / Xilinx', salary: '₹38 - ₹55 LPA' },
    { title: 'Generative AI Systems Researcher', domain: 'AI / Machine Learning' as const, company: 'Anthropic', salary: '$210,000 - $290,000' },
    { title: 'Lead Distributed Cloud Infrastructure Architect', domain: 'Software Engineering' as const, company: 'Databricks', salary: '$195,000 - $265,000' },
    { title: 'Embedded AUTOSAR CyberSecurity Specialist', domain: 'Embedded Systems' as const, company: 'Continental Tech', salary: '€80,000 - €105,000' },
    { title: 'Senior FinTech Algorithmic Trader', domain: 'Finance & FinTech' as const, company: 'Two Sigma', salary: '$280,000 - $420,000' },
  ];

  const pick = dynamicTitles[Math.floor(Math.random() * dynamicTitles.length)];
  const timestamp = new Date().toISOString();
  const randomId = `job-live-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  return {
    id: randomId,
    title: pick.title,
    company: pick.company,
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=60',
    location: 'Bengaluru / San Jose / Remote',
    domain: pick.domain,
    employmentType: 'Full-Time',
    workMode: 'Hybrid',
    experienceLevel: '3-7 Yrs',
    salary: pick.salary,
    skills: ['SystemVerilog', 'UVM', 'PyTorch', 'TypeScript', 'Linux', 'Python', 'C++'],
    description: `[LIVE AGGREGATED FROM ${portal.toUpperCase()}] Real-time fetched job listing automatically processed and indexed into RoleRadar search cluster.`,
    responsibilities: [
      'Architect key system modules and execute automated testing pipelines.',
      'Collaborate across cross-functional engineering teams.'
    ],
    benefits: ['Full Medical', 'Performance Stock Grants', 'Flexible Hours'],
    sourcePortal: portal,
    applicationUrl: `https://${portal.toLowerCase().replace(/\s+/g, '')}.com/jobs/${randomId}`,
    postedDate: timestamp,
    lastUpdated: timestamp,
    isActive: true,
    isNew: true
  };
}
