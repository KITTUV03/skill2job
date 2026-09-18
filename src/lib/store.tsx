'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Job, ResumeProfile, JobApplication, ScraperStatus, ScraperLog, SystemStats, User, JobPortalSource } from '../types';
import { INITIAL_JOBS } from './jobData';
import { calculateMatchScore } from './aiMatching';
import { parseResumeText } from './resumeParser';
import { INITIAL_SCRAPER_STATUSES, INITIAL_SCRAPER_LOGS, generateDynamicJob } from './scraperEngine';

interface AppContextType {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  isAuthenticated: boolean;
  authProvider?: 'google' | 'linkedin' | 'email';
  loginWithCredentials: (email: string, pass: string) => void;
  signupWithCredentials: (name: string, email: string, pass: string) => void;
  loginWithGoogle: () => void;
  loginWithLinkedIn: () => void;
  logout: () => void;
  updatePassword: (newPass: string) => void;
  user: User;
  resumeProfile?: ResumeProfile;
  setResumeProfile: (profile: ResumeProfile) => void;
  parseAndSetResume: (fileName: string, text: string) => Promise<ResumeProfile>;
  jobs: Job[];
  savedJobIds: string[];
  toggleSaveJob: (jobId: string) => void;
  applications: JobApplication[];
  addApplication: (job: Job, status?: JobApplication['status']) => void;
  updateApplicationStatus: (appId: string, newStatus: JobApplication['status']) => void;
  scraperStatuses: ScraperStatus[];
  scraperLogs: ScraperLog[];
  triggerManualScrape: () => void;
  stats: SystemStats;
  selectedJobForModal: Job | null;
  setSelectedJobForModal: (job: Job | null) => void;
  notification: { message: string; type: 'success' | 'info' | 'warning' } | null;
  showNotification: (message: string, type?: 'success' | 'info' | 'warning') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [authProvider, setAuthProvider] = useState<'google' | 'linkedin' | 'email'>('email');
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);
  const [savedJobIds, setSavedJobIds] = useState<string[]>(['job-vlsi-01', 'job-aiml-01']);
  const [selectedJobForModal, setSelectedJobForModal] = useState<Job | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' | 'warning' } | null>(null);

  // Default initial demo user profile
  const [resumeProfile, setResumeProfileState] = useState<ResumeProfile | undefined>({
    id: 'resume-demo-101',
    fileName: 'Alex_Vanderbilt_VLSI_AIML_Resume.pdf',
    uploadedAt: new Date().toISOString(),
    rawText: 'Experienced Senior Physical Design & Verification Lead with expertise in SystemVerilog, UVM, PyTorch, RTL, C++, STA, Synopsys ICC2, and Next.js.',
    skills: ['SystemVerilog', 'UVM', 'Verilog', 'STA', 'PyTorch', 'C++', 'Python', 'TypeScript', 'React', 'Linux Kernel'],
    experienceYears: 5,
    education: [
      { degree: 'B.Tech in Microelectronics & Computer Engineering', institution: 'IIT Madras', year: '2020' }
    ],
    certifications: [
      'Cadence Certified Innovus Physical Design Master',
      'Synopsys PrimeTime STA Specialist'
    ],
    projects: [
      {
        title: '3nm Multi-Core AI Accelerator Physical Closure',
        description: 'Achieved 2.4GHz timing closure and IR-drop compliance on 3nm tapeout.',
        techStack: ['SystemVerilog', 'Synopsys ICC2', 'STA', 'Python']
      }
    ],
    preferredRoles: ['Senior Physical Design Engineer', 'Design Verification Lead', 'Staff AI Architect'],
    targetDomains: ['VLSI / Semiconductor', 'AI / Machine Learning', 'Software Engineering'],
    locationPreference: 'Bengaluru / San Jose / Hybrid',
    expectedSalary: '₹35 - ₹50 LPA / $180k+'
  });

  const [user, setUser] = useState<User>({
    id: 'usr-1',
    name: 'Alex Vanderbilt',
    email: 'alex.vanderbilt@roleradar.ai',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    title: 'Senior VLSI & AI Systems Lead',
    location: 'Bengaluru, India',
    resumeProfile,
    savedJobIds
  });

  const [applications, setApplications] = useState<JobApplication[]>([
    {
      id: 'app-1',
      jobId: 'job-vlsi-01',
      jobTitle: 'Senior Physical Design Engineer',
      company: 'NVIDIA',
      logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=60',
      location: 'Bengaluru, India / San Jose, CA',
      status: 'Interview Scheduled',
      appliedDate: '2026-09-15',
      matchScore: 96,
      salary: '₹32 - ₹48 LPA',
      sourcePortal: 'LinkedIn',
      notes: 'Technical Interview round scheduled for Sept 22nd at 3 PM IST.'
    },
    {
      id: 'app-2',
      jobId: 'job-aiml-01',
      jobTitle: 'Staff AI / LLM Architect',
      company: 'OpenAI (Demo Partner)',
      logo: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=120&auto=format&fit=crop&q=60',
      location: 'San Francisco, CA / Remote',
      status: 'Under Review',
      appliedDate: '2026-09-17',
      matchScore: 94,
      salary: '$220,000 - $310,000',
      sourcePortal: 'Wellfound'
    },
    {
      id: 'app-3',
      jobId: 'job-swe-01',
      jobTitle: 'Senior Full Stack Engineer',
      company: 'Stripe',
      logo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=120&auto=format&fit=crop&q=60',
      location: 'New York, NY / Remote',
      status: 'Applied',
      appliedDate: '2026-09-18',
      matchScore: 88,
      salary: '$160,000 - $220,000',
      sourcePortal: 'Indeed'
    }
  ]);

  const [scraperStatuses, setScraperStatuses] = useState<ScraperStatus[]>(INITIAL_SCRAPER_STATUSES);
  const [scraperLogs, setScraperLogs] = useState<ScraperLog[]>(INITIAL_SCRAPER_LOGS);

  const [stats, setStats] = useState<SystemStats>({
    totalJobs: INITIAL_JOBS.length + 8420,
    newToday: 48,
    activeCompanies: 620,
    totalApplications: applications.length,
    matchSuccessRate: 94.8
  });

  // Calculate scores whenever jobs or resumeProfile change
  useEffect(() => {
    setJobs(prevJobs => 
      prevJobs.map(job => {
        const breakdown = calculateMatchScore(job, resumeProfile);
        return {
          ...job,
          matchScore: breakdown.overallScore,
          matchBreakdown: breakdown
        };
      })
    );
  }, [resumeProfile]);

  // Sync html class for dark/light mode
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Periodic simulated live background harvesting (runs every 30 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      const portals: JobPortalSource[] = ['LinkedIn', 'Naukri', 'Indeed', 'Wellfound', 'Foundit', 'Glassdoor', 'Company Career Page'];
      const randomPortal = portals[Math.floor(Math.random() * portals.length)];
      const newJob = generateDynamicJob(randomPortal);
      const breakdown = calculateMatchScore(newJob, resumeProfile);
      newJob.matchScore = breakdown.overallScore;
      newJob.matchBreakdown = breakdown;

      setJobs(prev => [newJob, ...prev]);
      setStats(prev => ({
        ...prev,
        totalJobs: prev.totalJobs + 1,
        newToday: prev.newToday + 1
      }));

      const newLog: ScraperLog = {
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString(),
        portal: randomPortal,
        jobsHarvested: 1,
        status: 'SUCCESS',
        message: `Real-time Sync: Extracted 1 new opportunity "${newJob.title}" at ${newJob.company}.`
      };

      setScraperLogs(prev => [newLog, ...prev.slice(0, 19)]);
      showNotification(`⚡ Live Job Ingested: "${newJob.title}" via ${randomPortal}`, 'info');
    }, 30000);

    return () => clearInterval(interval);
  }, [resumeProfile]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const showNotification = (message: string, type: 'success' | 'info' | 'warning' = 'info') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4500);
  };

  const loginWithCredentials = (email: string, pass: string) => {
    setIsAuthenticated(true);
    setAuthProvider('email');
    setUser(prev => ({ ...prev, email }));
    showNotification(`Welcome back! Logged in as ${email}`, 'success');
  };

  const signupWithCredentials = (name: string, email: string, pass: string) => {
    setIsAuthenticated(true);
    setAuthProvider('email');
    setUser(prev => ({ ...prev, name, email }));
    showNotification(`Account created! Logged in as ${name}`, 'success');
  };

  const loginWithGoogle = () => {
    setIsAuthenticated(true);
    setAuthProvider('google');
    setUser(prev => ({
      ...prev,
      name: 'Alex (Google SSO)',
      email: 'alex.google@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    }));
    showNotification('Authenticated via Google OAuth 2.0', 'success');
  };

  const loginWithLinkedIn = () => {
    setIsAuthenticated(true);
    setAuthProvider('linkedin');
    setUser(prev => ({
      ...prev,
      name: 'Alex (LinkedIn SSO)',
      email: 'alex.linkedin@roleradar.ai',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
    }));
    showNotification('Authenticated via LinkedIn Connect', 'success');
  };

  const logout = () => {
    setIsAuthenticated(false);
    showNotification('You have logged out of RoleRadar', 'info');
  };

  const updatePassword = (newPass: string) => {
    showNotification('Password updated successfully!', 'success');
  };

  const setResumeProfile = (profile: ResumeProfile) => {
    setResumeProfileState(profile);
    setUser(prev => ({ ...prev, resumeProfile: profile }));
    showNotification('AI Resume Parsed! Match scores recalculated across all jobs.', 'success');
  };

  const parseAndSetResume = async (fileName: string, text: string) => {
    const parsed = await parseResumeText(fileName, text);
    setResumeProfile(parsed);
    return parsed;
  };

  const toggleSaveJob = (jobId: string) => {
    setSavedJobIds(prev => {
      const exists = prev.includes(jobId);
      const updated = exists ? prev.filter(id => id !== jobId) : [...prev, jobId];
      showNotification(exists ? 'Job removed from saved bookmarks' : 'Job saved to your bookmarks!', 'success');
      return updated;
    });
  };

  const addApplication = (job: Job, status: JobApplication['status'] = 'Applied') => {
    if (applications.some(a => a.jobId === job.id)) {
      showNotification(`Already applied for ${job.title} at ${job.company}`, 'info');
      return;
    }

    const newApp: JobApplication = {
      id: `app-${Date.now()}`,
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      logo: job.logo,
      location: job.location,
      status,
      appliedDate: new Date().toISOString().split('T')[0],
      matchScore: job.matchScore || 85,
      salary: job.salary,
      sourcePortal: job.sourcePortal
    };

    setApplications(prev => [newApp, ...prev]);
    setStats(prev => ({ ...prev, totalApplications: prev.totalApplications + 1 }));
    showNotification(`Application submitted for ${job.title} at ${job.company}!`, 'success');
  };

  const updateApplicationStatus = (appId: string, newStatus: JobApplication['status']) => {
    setApplications(prev => prev.map(app => app.id === appId ? { ...app, status: newStatus } : app));
    showNotification(`Application status updated to "${newStatus}"`, 'info');
  };

  const triggerManualScrape = () => {
    const portals: JobPortalSource[] = ['LinkedIn', 'Naukri', 'Indeed', 'Wellfound'];
    const harvestedCount = Math.floor(Math.random() * 15) + 8;
    const newJobs: Job[] = [];

    for (let i = 0; i < 3; i++) {
      const p = portals[i % portals.length];
      const j = generateDynamicJob(p);
      const breakdown = calculateMatchScore(j, resumeProfile);
      j.matchScore = breakdown.overallScore;
      j.matchBreakdown = breakdown;
      newJobs.push(j);
    }

    setJobs(prev => [...newJobs, ...prev]);
    setStats(prev => ({
      ...prev,
      totalJobs: prev.totalJobs + harvestedCount,
      newToday: prev.newToday + harvestedCount
    }));

    const log: ScraperLog = {
      id: `log-manual-${Date.now()}`,
      timestamp: new Date().toISOString(),
      portal: 'LinkedIn',
      jobsHarvested: harvestedCount,
      status: 'SUCCESS',
      message: `Manual Trigger Complete: Aggregated ${harvestedCount} new jobs across LinkedIn, Naukri, & Indeed.`
    };

    setScraperLogs(prev => [log, ...prev]);
    showNotification(`🔥 Harvested ${harvestedCount} new listings from active portals!`, 'success');
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        isAuthenticated,
        authProvider,
        loginWithCredentials,
        signupWithCredentials,
        loginWithGoogle,
        loginWithLinkedIn,
        logout,
        updatePassword,
        user,
        resumeProfile,
        setResumeProfile,
        parseAndSetResume,
        jobs,
        savedJobIds,
        toggleSaveJob,
        applications,
        addApplication,
        updateApplicationStatus,
        scraperStatuses,
        scraperLogs,
        triggerManualScrape,
        stats,
        selectedJobForModal,
        setSelectedJobForModal,
        notification,
        showNotification
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
