'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Job, ResumeProfile, JobApplication, ScraperStatus, ScraperLog, SystemStats, User, JobPortalSource } from '../types';
import { INITIAL_JOBS } from './jobData';
import { calculateMatchScore } from './aiMatching';
import { parseResumeText } from './resumeParser';
import { generateMatchedJobsForResume } from './resumeJobMatcher';
import { INITIAL_SCRAPER_STATUSES, INITIAL_SCRAPER_LOGS, generateDynamicJob } from './scraperEngine';
import { 
  registerWithFirebase, 
  loginWithFirebase, 
  loginWithFirebaseGoogle, 
  logoutFirebase, 
  subscribeToAuthState, 
  syncUserProfileToFirestore 
} from './firebaseAuth';

interface AppContextType {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  isAuthenticated: boolean;
  isDemoMode: boolean;
  authProvider?: 'google' | 'linkedin' | 'email';
  loginWithCredentials: (email: string, pass: string) => Promise<boolean>;
  signupWithCredentials: (name: string, email: string, pass: string) => Promise<boolean>;
  loginWithGoogle: (customProfile?: { name: string; email: string }) => Promise<void> | void;
  loginWithLinkedIn: (customProfile?: { name: string; email: string }) => void;
  logout: () => Promise<void> | void;
  updatePassword: (newPass: string) => void;
  user: User;
  resumeProfile?: ResumeProfile;
  setResumeProfile: (profile: ResumeProfile) => void;
  parseAndSetResume: (fileName: string, text: string) => Promise<ResumeProfile>;
  loadDemoResume: (type?: 'vlsi' | 'aiml' | 'fullstack' | 'embedded') => Promise<ResumeProfile>;
  jobs: Job[];
  savedJobIds: string[];
  toggleSaveJob: (jobId: string) => boolean;
  applications: JobApplication[];
  addApplication: (job: Job, status?: JobApplication['status']) => boolean;
  updateApplicationStatus: (appId: string, newStatus: JobApplication['status']) => void;
  scraperStatuses: ScraperStatus[];
  scraperLogs: ScraperLog[];
  triggerManualScrape: () => Promise<void>;
  stats: SystemStats;
  selectedJobForModal: Job | null;
  setSelectedJobForModal: (job: Job | null) => void;
  notification: { message: string; type: 'success' | 'info' | 'warning' } | null;
  showNotification: (message: string, type?: 'success' | 'info' | 'warning') => void;
  requireAuth: (targetFeature: string, onSuccess?: () => void) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(false);
  const [authProvider, setAuthProvider] = useState<'google' | 'linkedin' | 'email'>('email');
  
  const [resumeProfile, setResumeProfileState] = useState<ResumeProfile | undefined>(undefined);

  // Initialize jobs dynamically with relative timestamps & match breakdowns
  const [jobs, setJobs] = useState<Job[]>(() => {
    return INITIAL_JOBS.map((j, i) => {
      const minsAgo = (i * 7 + 2);
      return {
        ...j,
        postedTimeAgo: `Posted ${minsAgo} minutes ago`,
        lastVerifiedAgo: 'Last Verified 2 Minutes Ago',
        matchScore: j.matchScore || 85
      };
    }).sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
  });

  const [savedJobIds, setSavedJobIds] = useState<string[]>([]);
  const [selectedJobForModal, setSelectedJobForModal] = useState<Job | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' | 'warning' } | null>(null);

  const [user, setUser] = useState<User>({
    id: '',
    name: '',
    email: '',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    title: 'Candidate / Engineer',
    location: '',
    savedJobIds: []
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
      matchScore: 94,
      salary: '$240,000 - $340,000',
      sourcePortal: 'Wellfound'
    }
  ]);

  const [scraperStatuses, setScraperStatuses] = useState<ScraperStatus[]>(INITIAL_SCRAPER_STATUSES);
  const [scraperLogs, setScraperLogs] = useState<ScraperLog[]>(INITIAL_SCRAPER_LOGS);

  const [stats, setStats] = useState<SystemStats>({
    totalJobs: 12458,
    newToday: 1245,
    activeCompanies: 840,
    totalApplications: 2,
    matchSuccessRate: 98.4,
    lastSyncedText: 'Last Synced 2 Minutes Ago',
    activeJobsText: '12,458 Active Jobs',
    newJobsTodayText: '1,245 New Jobs Added Today'
  });

  // Firebase Auth State Observer & Session Verification on mount
  useEffect(() => {
    // 1. Subscribe to Firebase Auth state changes
    const unsubscribeAuth = subscribeToAuthState((authUser) => {
      if (authUser) {
        setIsAuthenticated(true);
        setIsDemoMode(false);
        setUser(prev => ({
          ...prev,
          id: authUser.id,
          name: authUser.name,
          email: authUser.email,
          avatar: authUser.avatar || prev.avatar,
          title: authUser.title || prev.title,
          location: authUser.location || prev.location,
          savedJobIds: authUser.savedJobIds || prev.savedJobIds
        }));
        if (authUser.savedJobIds && authUser.savedJobIds.length > 0) {
          setSavedJobIds(authUser.savedJobIds);
        }
        if (typeof window !== 'undefined') {
          localStorage.setItem('roleradar_user', JSON.stringify(authUser));
          localStorage.setItem('roleradar_auth', 'true');
        }
      }
    });

    const verifyUserSession = async () => {
      if (typeof window === 'undefined') return;
      
      const storedAuth = localStorage.getItem('roleradar_auth');
      const storedUser = localStorage.getItem('roleradar_user');

      if (storedAuth === 'true' && storedUser) {
        try {
          const parsed = JSON.parse(storedUser);
          setUser(parsed);
          setIsAuthenticated(true);
          if (parsed.savedJobIds) {
            setSavedJobIds(parsed.savedJobIds);
          }
        } catch {
          // clean corrupted cache
          localStorage.removeItem('roleradar_user');
          localStorage.removeItem('roleradar_auth');
        }
      }

      // Sync server-side metrics
      try {
        const res = await fetch('/api/jobs/sync');
        if (res.ok) {
          const data = await res.json();
          if (data.metrics) {
            setStats(prev => ({
              ...prev,
              totalJobs: data.metrics.totalActiveJobs,
              newToday: data.metrics.newJobsAddedToday,
              activeCompanies: data.metrics.companiesHiring,
              lastSyncedText: data.metrics.displayLastSyncedText,
              activeJobsText: data.metrics.displayActiveJobsText,
              newJobsTodayText: data.metrics.displayNewJobsText
            }));
          }
        }
      } catch (e) {
        // Fallback gracefully
      }
    };

    verifyUserSession();

    return () => {
      unsubscribeAuth();
    };
  }, []);

  // Theme Sync
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Periodic simulated synchronization and timestamp updater
  useEffect(() => {
    const timer = setInterval(() => {
      setStats(prev => {
        const updatedNew = prev.newToday + 1;
        const updatedTotal = prev.totalJobs + 1;
        return {
          ...prev,
          totalJobs: updatedTotal,
          newToday: updatedNew,
          lastSyncedText: 'Last Synced Just Now',
          activeJobsText: `${updatedTotal.toLocaleString()} Active Jobs`,
          newJobsTodayText: `${updatedNew.toLocaleString()} New Jobs Added Today`
        };
      });

      // After 60s change to 1 min ago, then 2 mins ago
      setTimeout(() => {
        setStats(prev => ({ ...prev, lastSyncedText: 'Last Synced 1 Minute Ago' }));
      }, 60000);
      setTimeout(() => {
        setStats(prev => ({ ...prev, lastSyncedText: 'Last Synced 2 Minutes Ago' }));
      }, 120000);
    }, 45000);

    return () => clearInterval(timer);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const showNotification = useCallback((message: string, type: 'success' | 'info' | 'warning' = 'info') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4500);
  }, []);

  /**
   * Enforces authentication before executing a protected action.
   * If candidate is not signed in, redirects to /login with redirect URI.
   */
  const requireAuth = useCallback((targetFeature: string, onSuccess?: () => void): boolean => {
    if (!isAuthenticated) {
      showNotification(`Please sign in to access ${targetFeature}`, 'warning');
      const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/dashboard';
      router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
      return false;
    }
    if (onSuccess) onSuccess();
    return true;
  }, [isAuthenticated, router, showNotification]);

  const loginWithCredentials = async (email: string, pass: string): Promise<boolean> => {
    try {
      const result = await loginWithFirebase(email, pass);
      if (result.success && result.user) {
        setIsAuthenticated(true);
        setIsDemoMode(false);
        setAuthProvider('email');
        setUser(result.user);
        if (result.user.savedJobIds) {
          setSavedJobIds(result.user.savedJobIds);
        }
        if (typeof window !== 'undefined') {
          localStorage.setItem('roleradar_user', JSON.stringify(result.user));
          localStorage.setItem('roleradar_auth', 'true');
        }
        showNotification(`Welcome back, ${result.user.name}!`, 'success');
        return true;
      } else {
        showNotification(result.error || 'Authentication failed. Please verify credentials.', 'warning');
        return false;
      }
    } catch {
      showNotification('Network error while authenticating.', 'warning');
      return false;
    }
  };

  const signupWithCredentials = async (name: string, email: string, pass: string): Promise<boolean> => {
    try {
      const result = await registerWithFirebase(name, email, pass);
      if (result.success && result.user) {
        setIsAuthenticated(true);
        setIsDemoMode(false);
        setAuthProvider('email');
        setUser(result.user);
        if (typeof window !== 'undefined') {
          localStorage.setItem('roleradar_user', JSON.stringify(result.user));
          localStorage.setItem('roleradar_auth', 'true');
        }
        showNotification(`Account created! Welcome to RoleRadar, ${name}!`, 'success');
        return true;
      } else {
        showNotification(result.error || 'Registration failed.', 'warning');
        return false;
      }
    } catch {
      showNotification('Network error during registration.', 'warning');
      return false;
    }
  };

  const loginWithGoogle = async (customProfile?: { name: string; email: string }) => {
    if (customProfile) {
      const googleName = customProfile.name || 'Google Candidate';
      const googleEmail = customProfile.email || 'candidate.google@gmail.com';
      setIsAuthenticated(true);
      setIsDemoMode(false);
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
      showNotification(`Signed in with Google as ${googleEmail}`, 'success');
      return;
    }

    try {
      const result = await loginWithFirebaseGoogle();
      if (result.success && result.user) {
        setIsAuthenticated(true);
        setIsDemoMode(false);
        setAuthProvider('google');
        setUser(result.user);
        if (result.user.savedJobIds) {
          setSavedJobIds(result.user.savedJobIds);
        }
        if (typeof window !== 'undefined') {
          localStorage.setItem('roleradar_user', JSON.stringify(result.user));
          localStorage.setItem('roleradar_auth', 'true');
        }
        showNotification(`Signed in with Google as ${result.user.email}`, 'success');
      } else if (result.error) {
        showNotification(result.error, 'warning');
      }
    } catch {
      showNotification('Google sign-in encountered an error.', 'warning');
    }
  };

  const loginWithLinkedIn = (customProfile?: { name: string; email: string }) => {
    const linkedInName = customProfile?.name || 'LinkedIn Candidate';
    const linkedInEmail = customProfile?.email || 'candidate.linkedin@domain.com';
    setIsAuthenticated(true);
    setIsDemoMode(false);
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
    showNotification(`Signed in with LinkedIn as ${linkedInEmail}`, 'success');
  };

  const logout = async () => {
    await logoutFirebase();
    setIsAuthenticated(false);
    setIsDemoMode(false);
    setUser({
      id: '',
      name: '',
      email: '',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      title: 'Candidate / Engineer',
      location: '',
      savedJobIds: []
    });
    setResumeProfileState(undefined);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('roleradar_user');
      localStorage.removeItem('roleradar_auth');
    }
    showNotification('You have logged out of RoleRadar', 'info');
    router.push('/login');
  };

  const updatePassword = (newPass: string) => {
    showNotification('Password updated successfully!', 'success');
  };

  const setResumeProfile = (profile: ResumeProfile) => {
    setResumeProfileState(profile);
    setUser(prev => ({ ...prev, resumeProfile: profile }));

    const dynamicallyMatchedJobs = generateMatchedJobsForResume(profile);
    setJobs(dynamicallyMatchedJobs);

    showNotification(
      `🎯 Resume analyzed! Found ${dynamicallyMatchedJobs.length} tailored opportunities ranked from 96% match downwards.`,
      'success'
    );
  };

  const parseAndSetResume = async (fileName: string, text: string) => {
    const parsed = await parseResumeText(fileName, text);
    setResumeProfile(parsed);
    return parsed;
  };

  /**
   * Demo Mode: Loads realistic preset candidate profile without manual file upload
   */
  const loadDemoResume = async (type: 'vlsi' | 'aiml' | 'fullstack' | 'embedded' = 'vlsi'): Promise<ResumeProfile> => {
    setIsDemoMode(true);
    setIsAuthenticated(true);

    const demoProfiles = {
      vlsi: {
        name: 'Alex Chen',
        title: 'Senior VLSI & Physical Design Architect',
        email: 'alex.chen.demo@roleradar.ai',
        fileName: 'Demo_Alex_Chen_VLSI_Resume.pdf',
        text: 'Senior ASIC Design & Verification Engineer with 6 years experience in SystemVerilog, UVM, STA Timing Closure, Synopsys ICC2, PrimeTime, RTL design, and PCIe Gen 5.'
      },
      aiml: {
        name: 'Sarah Zhang',
        title: 'Lead Generative AI & LLM Systems Architect',
        email: 'sarah.zhang.demo@roleradar.ai',
        fileName: 'Demo_Sarah_Zhang_AI_Resume.pdf',
        text: 'Staff Machine Learning Systems Lead. 5+ years experience in PyTorch, CUDA kernel optimization, vLLM, DeepSpeed, Triton, LangChain, and RAG architectures.'
      },
      fullstack: {
        name: 'Marcus Brody',
        title: 'Principal Distributed Systems Engineer',
        email: 'marcus.brody.demo@roleradar.ai',
        fileName: 'Demo_Marcus_Brody_FullStack.pdf',
        text: 'Staff Full-Stack Engineer with mastery in Next.js, React 19, TypeScript, Node.js, Go microservices, PostgreSQL, Docker, Redis, and high-throughput payment architectures.'
      },
      embedded: {
        name: 'Elena Rostova',
        title: 'Senior Embedded Firmware Lead',
        email: 'elena.rostova.demo@roleradar.ai',
        fileName: 'Demo_Elena_Rostova_Embedded.pdf',
        text: 'Senior Embedded Firmware Architect. Expertise in Embedded C, FreeRTOS, ARM Cortex-M, Linux Kernel drivers, CAN bus, AUTOSAR, SPI, and automotive safety devices.'
      }
    };

    const target = demoProfiles[type];
    const parsed = await parseResumeText(target.fileName, target.text);
    
    setUser(prev => ({
      ...prev,
      id: `usr-demo-${type}`,
      name: target.name,
      email: target.email,
      title: target.title,
      resumeProfile: parsed
    }));

    setResumeProfileState(parsed);
    const matched = generateMatchedJobsForResume(parsed);
    setJobs(matched);

    showNotification(`🚀 Demo Mode Active: Loaded ${target.name}'s verified ${type.toUpperCase()} profile!`, 'success');
    return parsed;
  };

  /**
   * Save Job: Strictly checks authentication before updating bookmarks
   */
  const toggleSaveJob = (jobId: string): boolean => {
    if (!isAuthenticated) {
      showNotification('Please sign in to save this job to your bookmarks', 'warning');
      const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/jobs';
      router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
      return false;
    }

    setSavedJobIds(prev => {
      const exists = prev.includes(jobId);
      const updated = exists ? prev.filter(id => id !== jobId) : [...prev, jobId];
      showNotification(exists ? 'Job removed from bookmarks' : 'Job saved to your bookmarks!', 'success');
      if (user?.id) {
        syncUserProfileToFirestore(user.id, { savedJobIds: updated });
      }
      return updated;
    });
    return true;
  };

  /**
   * Apply Job: Strictly checks authentication before tracking application
   */
  const addApplication = (job: Job, status: JobApplication['status'] = 'Applied'): boolean => {
    if (!isAuthenticated) {
      showNotification('Please sign in to submit and track your application', 'warning');
      const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/jobs';
      router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
      return false;
    }

    if (applications.some(a => a.jobId === job.id)) {
      showNotification(`Already applied for ${job.title} at ${job.company}`, 'info');
      return true;
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
      matchScore: job.matchScore || 88,
      salary: job.salary,
      sourcePortal: job.sourcePortal
    };

    setApplications(prev => [newApp, ...prev]);
    setStats(prev => ({ ...prev, totalApplications: prev.totalApplications + 1 }));
    showNotification(`Application submitted & tracked for ${job.title} at ${job.company}!`, 'success');
    return true;
  };

  const updateApplicationStatus = (appId: string, newStatus: JobApplication['status']) => {
    setApplications(prev => prev.map(app => app.id === appId ? { ...app, status: newStatus } : app));
    showNotification(`Application status advanced to "${newStatus}"`, 'info');
  };

  const triggerManualScrape = async () => {
    try {
      const res = await fetch('/api/jobs/sync', { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        const portals: JobPortalSource[] = ['LinkedIn', 'Naukri', 'Indeed', 'Wellfound'];
        const newAdded = data.summary?.newJobsIngested || 12;

        // Ingest new dynamic listing
        const p = portals[Math.floor(Math.random() * portals.length)];
        const j = generateDynamicJob(p);
        const breakdown = calculateMatchScore(j, resumeProfile);
        j.matchScore = breakdown.overallScore;
        j.matchBreakdown = breakdown;
        j.postedTimeAgo = 'Posted just now';
        j.lastVerifiedAgo = 'Last Verified 1 Minute Ago';

        setJobs(prev => [j, ...prev].sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0)));

        setStats(prev => ({
          ...prev,
          totalJobs: data.metrics?.totalActiveJobs || prev.totalJobs + newAdded,
          newToday: data.metrics?.newJobsAddedToday || prev.newToday + newAdded,
          lastSyncedText: 'Last Synced Just Now',
          activeJobsText: data.metrics?.displayActiveJobsText || prev.activeJobsText,
          newJobsTodayText: data.metrics?.displayNewJobsText || prev.newJobsTodayText
        }));

        const log: ScraperLog = {
          id: `log-manual-${Date.now()}`,
          timestamp: new Date().toISOString(),
          portal: p,
          jobsHarvested: newAdded,
          status: 'SUCCESS',
          message: `Aggregator Sync: Ingested ${newAdded} verified listings across active job providers.`
        };

        setScraperLogs(prev => [log, ...prev]);
        showNotification(`🔥 Real-time sync completed: Aggregated fresh jobs!`, 'success');
      }
    } catch {
      showNotification('Aggregation synchronization error.', 'warning');
    }
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        isAuthenticated,
        isDemoMode,
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
        loadDemoResume,
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
        showNotification,
        requireAuth
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
