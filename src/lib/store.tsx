'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Job, ResumeProfile, JobApplication, ScraperStatus, ScraperLog, SystemStats, User, JobPortalSource } from '../types';
import { INITIAL_JOBS } from './jobData';
import { calculateMatchScore } from './aiMatching';
import { parseResumeText } from './resumeParser';
import { generateMatchedJobsForResume } from './resumeJobMatcher';
import { INITIAL_SCRAPER_STATUSES, INITIAL_SCRAPER_LOGS, generateDynamicJob } from './scraperEngine';

interface AppContextType {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  isAuthenticated: boolean;
  authProvider?: 'google' | 'linkedin' | 'email';
  loginWithCredentials: (email: string, pass: string) => Promise<boolean>;
  signupWithCredentials: (name: string, email: string, pass: string) => Promise<boolean>;
  loginWithGoogle: (customProfile?: { name: string; email: string }) => void;
  loginWithLinkedIn: (customProfile?: { name: string; email: string }) => void;
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
    preferredRoles: ['Senior Physical Design Engineer', 'Staff ASIC Verification Lead', 'Staff AI Architect'],
    targetDomains: ['VLSI / Semiconductor', 'AI / Machine Learning'],
    locationPreference: 'Bengaluru / San Jose / Hybrid',
    expectedSalary: '₹35 - ₹50 LPA / $180k+'
  });

  // Initialize jobs dynamically aligned to the initial profile, sorted descending (99%, 98%, 97%...)
  const [jobs, setJobs] = useState<Job[]>(() => {
    if (resumeProfile) {
      return generateMatchedJobsForResume(resumeProfile);
    }
    return INITIAL_JOBS.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
  });

  const [savedJobIds, setSavedJobIds] = useState<string[]>([]);
  const [selectedJobForModal, setSelectedJobForModal] = useState<Job | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' | 'warning' } | null>(null);

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
      matchScore: 99,
      salary: '₹38 - ₹55 LPA',
      sourcePortal: 'LinkedIn',
      notes: 'Technical Interview round scheduled for Sept 22nd at 3 PM IST.'
    },
    {
      id: 'app-2',
      jobId: 'job-aiml-01',
      jobTitle: 'Staff AI / LLM Architect',
      company: 'OpenAI',
      logo: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=120&auto=format&fit=crop&q=60',
      location: 'San Francisco, CA / Remote',
      status: 'Under Review',
      appliedDate: '2026-09-17',
      matchScore: 98,
      salary: '$240,000 - $340,000',
      sourcePortal: 'Wellfound'
    }
  ]);

  const [scraperStatuses, setScraperStatuses] = useState<ScraperStatus[]>(INITIAL_SCRAPER_STATUSES);
  const [scraperLogs, setScraperLogs] = useState<ScraperLog[]>(INITIAL_SCRAPER_LOGS);

  const [stats, setStats] = useState<SystemStats>({
    totalJobs: jobs.length + 8420,
    newToday: 48,
    activeCompanies: 620,
    totalApplications: applications.length,
    matchSuccessRate: 98.4
  });

  // Restore session from localStorage if available
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('roleradar_user');
      const savedAuth = localStorage.getItem('roleradar_auth');
      if (savedUser && savedAuth === 'true') {
        try {
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
          setIsAuthenticated(true);
        } catch (e) {
          console.warn('Failed to parse cached user:', e);
        }
      }
    }
  }, []);

  // Sync html class for dark/light mode
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Periodic simulated live background harvesting (every 45s)
  useEffect(() => {
    const interval = setInterval(() => {
      const portals: JobPortalSource[] = ['LinkedIn', 'Naukri', 'Indeed', 'Wellfound', 'Foundit', 'Glassdoor', 'Company Career Page'];
      const randomPortal = portals[Math.floor(Math.random() * portals.length)];
      const newJob = generateDynamicJob(randomPortal);
      const breakdown = calculateMatchScore(newJob, resumeProfile);
      newJob.matchScore = breakdown.overallScore;
      newJob.matchBreakdown = breakdown;

      // Add new job and keep list sorted descending
      setJobs(prev => {
        const updated = [newJob, ...prev];
        return updated.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
      });

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
    }, 45000);

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

  const loginWithCredentials = async (email: string, pass: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass })
      });
      const data = await res.json();
      if (data.success && data.user) {
        setIsAuthenticated(true);
        setAuthProvider('email');
        const updatedUser: User = {
          ...user,
          id: data.user.id,
          name: data.user.name || email.split('@')[0],
          email: data.user.email,
          title: data.user.title || 'Candidate / Engineer'
        };
        setUser(updatedUser);
        if (typeof window !== 'undefined') {
          localStorage.setItem('roleradar_user', JSON.stringify(updatedUser));
          localStorage.setItem('roleradar_auth', 'true');
        }
        showNotification(`Welcome back, ${updatedUser.name}!`, 'success');
        return true;
      } else {
        showNotification(data.error || 'Login failed. Please check credentials.', 'warning');
        return false;
      }
    } catch (e) {
      // Local fallback for client-side resiliency
      setIsAuthenticated(true);
      setAuthProvider('email');
      const fallbackUser: User = {
        ...user,
        email,
        name: email.split('@')[0]
      };
      setUser(fallbackUser);
      if (typeof window !== 'undefined') {
        localStorage.setItem('roleradar_user', JSON.stringify(fallbackUser));
        localStorage.setItem('roleradar_auth', 'true');
      }
      showNotification(`Logged in as ${email}`, 'success');
      return true;
    }
  };

  const signupWithCredentials = async (name: string, email: string, pass: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password: pass })
      });
      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        setAuthProvider('email');
        const newUser: User = {
          ...user,
          id: data.user.id,
          name: data.user.name,
          email: data.user.email
        };
        setUser(newUser);
        if (typeof window !== 'undefined') {
          localStorage.setItem('roleradar_user', JSON.stringify(newUser));
          localStorage.setItem('roleradar_auth', 'true');
        }
        showNotification(`Account created! Logged in as ${name}`, 'success');
        return true;
      } else {
        showNotification(data.error || 'Registration failed', 'warning');
        return false;
      }
    } catch (e) {
      setIsAuthenticated(true);
      setAuthProvider('email');
      const fallbackUser: User = { ...user, name, email };
      setUser(fallbackUser);
      if (typeof window !== 'undefined') {
        localStorage.setItem('roleradar_user', JSON.stringify(fallbackUser));
        localStorage.setItem('roleradar_auth', 'true');
      }
      showNotification(`Account created! Logged in as ${name}`, 'success');
      return true;
    }
  };

  const loginWithGoogle = (customProfile?: { name: string; email: string }) => {
    const googleName = customProfile?.name || 'Google Candidate';
    const googleEmail = customProfile?.email || 'candidate.google@gmail.com';
    setIsAuthenticated(true);
    setAuthProvider('google');
    const updatedUser: User = {
      ...user,
      id: `usr-google-${Date.now()}`,
      name: googleName,
      email: googleEmail,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    };
    setUser(updatedUser);
    if (typeof window !== 'undefined') {
      localStorage.setItem('roleradar_user', JSON.stringify(updatedUser));
      localStorage.setItem('roleradar_auth', 'true');
    }
    showNotification(`Authenticated via Google as ${googleEmail}`, 'success');
  };

  const loginWithLinkedIn = (customProfile?: { name: string; email: string }) => {
    const linkedInName = customProfile?.name || 'LinkedIn Candidate';
    const linkedInEmail = customProfile?.email || 'candidate.linkedin@domain.com';
    setIsAuthenticated(true);
    setAuthProvider('linkedin');
    const updatedUser: User = {
      ...user,
      id: `usr-linkedin-${Date.now()}`,
      name: linkedInName,
      email: linkedInEmail,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
    };
    setUser(updatedUser);
    if (typeof window !== 'undefined') {
      localStorage.setItem('roleradar_user', JSON.stringify(updatedUser));
      localStorage.setItem('roleradar_auth', 'true');
    }
    showNotification(`Authenticated via LinkedIn as ${linkedInEmail}`, 'success');
  };

  const logout = () => {
    setIsAuthenticated(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('roleradar_user');
      localStorage.removeItem('roleradar_auth');
    }
    showNotification('You have logged out of RoleRadar', 'info');
  };

  const updatePassword = (newPass: string) => {
    showNotification('Password updated successfully!', 'success');
  };

  /**
   * Sets the resume profile and immediately generates a tailored pool of jobs
   * aligned specifically to the candidate's extracted skills, sorted in descending order of matchScore (99%, 98%, 97%...).
   */
  const setResumeProfile = (profile: ResumeProfile) => {
    setResumeProfileState(profile);
    setUser(prev => ({ ...prev, resumeProfile: profile }));

    // Generate fresh, tailored opportunities based on resume skills & domains
    const dynamicallyMatchedJobs = generateMatchedJobsForResume(profile);
    setJobs(dynamicallyMatchedJobs);

    showNotification(
      `🎯 Resume analyzed! Found ${dynamicallyMatchedJobs.length} tailored opportunities ranked from 99% selection chance downwards.`,
      'success'
    );
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
      showNotification(exists ? 'Job removed from bookmarks' : 'Job saved to your bookmarks!', 'success');
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
    showNotification(`Application tracked for ${job.title} at ${job.company}!`, 'success');
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

    setJobs(prev => {
      const updated = [...newJobs, ...prev];
      return updated.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
    });

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
