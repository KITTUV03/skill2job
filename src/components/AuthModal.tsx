'use client';

import React, { useState } from 'react';
import { 
  X, 
  Radar, 
  Mail, 
  Lock, 
  User as UserIcon, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  Sparkles,
  Loader2 
} from 'lucide-react';
import { useApp } from '@/lib/store';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'login' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialTab = 'login' }) => {
  const { loginWithCredentials, signupWithCredentials, loginWithGoogle, loginWithLinkedIn } = useApp();
  const [tab, setTab] = useState<'login' | 'signup'>(initialTab);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please fill in both email and password.');
      return;
    }
    setIsLoading(true);
    setErrorMessage('');
    const success = await loginWithCredentials(email.trim(), password);
    setIsLoading(false);
    if (success) {
      onClose();
    } else {
      setErrorMessage('Login failed. Please verify credentials or create an account.');
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please provide your name, email, and password.');
      return;
    }
    setIsLoading(true);
    setErrorMessage('');
    const success = await signupWithCredentials(name.trim() || 'Candidate', email.trim(), password);
    setIsLoading(false);
    if (success) {
      onClose();
    } else {
      setErrorMessage('Registration failed. Please try a different email.');
    }
  };

  const handleGoogleClick = () => {
    loginWithGoogle({
      name: name.trim() || 'Google Candidate',
      email: email.trim() || 'candidate.google@gmail.com'
    });
    onClose();
  };

  const handleLinkedInClick = () => {
    loginWithLinkedIn({
      name: name.trim() || 'LinkedIn Candidate',
      email: email.trim() || 'candidate.linkedin@domain.com'
    });
    onClose();
  };

  const fillDemoAccount = () => {
    setEmail('alex.vanderbilt@roleradar.ai');
    setPassword('CandidatePass2026!');
    setErrorMessage('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fadeIn">
      
      <div className="relative w-full max-w-md p-6 sm:p-8 rounded-3xl glass-card bg-[#FDFBF7] dark:bg-slate-900 border border-[#EAE4D7] dark:border-slate-800 shadow-2xl space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-xl bg-stone-100 dark:bg-slate-800 hover:bg-stone-200 text-stone-600 dark:text-slate-300 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 mb-1">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-600 to-indigo-700 p-0.5 shadow-md">
              <div className="w-full h-full bg-[#1C1917] rounded-[14px] flex items-center justify-center">
                <Radar className="w-5 h-5 text-amber-400 animate-pulse" />
              </div>
            </div>
            <span className="font-black text-2xl tracking-tight text-stone-900 dark:text-white">
              Role<span className="text-gradient">Radar</span>
            </span>
          </div>
          <h2 className="text-lg font-extrabold text-stone-900 dark:text-white">
            {tab === 'login' ? 'Authentication Required' : 'Create Candidate Account'}
          </h2>
          <p className="text-xs text-stone-600 dark:text-slate-400">
            Log in or sign up to access AI resume matching and direct multi-portal applications.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="grid grid-cols-2 gap-1 p-1 rounded-2xl bg-stone-200/70 dark:bg-slate-800 text-xs font-bold">
          <button
            onClick={() => {
              setTab('login');
              setErrorMessage('');
            }}
            className={`py-2 rounded-xl transition-all ${
              tab === 'login' ? 'bg-white dark:bg-slate-900 text-stone-900 dark:text-white shadow-sm' : 'text-stone-600 dark:text-slate-400'
            }`}
          >
            Log In
          </button>
          <button
            onClick={() => {
              setTab('signup');
              setErrorMessage('');
            }}
            className={`py-2 rounded-xl transition-all ${
              tab === 'signup' ? 'bg-white dark:bg-slate-900 text-stone-900 dark:text-white shadow-sm' : 'text-stone-600 dark:text-slate-400'
            }`}
          >
            Sign Up
          </button>
        </div>

        {errorMessage && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-700 dark:text-red-400 text-xs font-semibold">
            {errorMessage}
          </div>
        )}

        {/* Social SSO Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={handleGoogleClick}
            className="px-4 py-2.5 rounded-xl border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-stone-800 dark:text-slate-200 hover:bg-stone-50 transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            Google Login
          </button>

          <button
            type="button"
            onClick={handleLinkedInClick}
            className="px-4 py-2.5 rounded-xl border border-blue-500/30 bg-blue-600/10 text-xs font-bold text-blue-700 dark:text-blue-400 hover:bg-blue-600/20 transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
            </svg>
            LinkedIn
          </button>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="border-t border-stone-200 dark:border-slate-800 w-full" />
          <span className="bg-[#FDFBF7] dark:bg-slate-900 px-3 text-[11px] text-stone-400 uppercase font-bold tracking-wider absolute">
            Or credentials
          </span>
        </div>

        {/* Forms */}
        {tab === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-700 dark:text-slate-300">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-3 text-stone-400" />
                <input
                  type="email"
                  required
                  placeholder="you@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-white dark:bg-slate-800 text-stone-900 dark:text-white border border-stone-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-700 dark:text-slate-300">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-3 text-stone-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 text-xs rounded-xl bg-white dark:bg-slate-800 text-stone-900 dark:text-white border border-stone-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-stone-400 hover:text-stone-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={fillDemoAccount}
                className="text-stone-500 hover:text-stone-900 dark:hover:text-stone-200 underline font-bold"
              >
                ⚡ Fill Demo Account
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-[#1C1917] text-white text-xs font-black shadow-lg hover:bg-stone-800 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin text-amber-400" /> : <ArrowRight className="w-4 h-4" />}
              <span>{isLoading ? 'Verifying...' : 'Sign In'}</span>
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignupSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-700 dark:text-slate-300">Full Name</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 absolute left-3.5 top-3 text-stone-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Priyanshu Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-white dark:bg-slate-800 text-stone-900 dark:text-white border border-stone-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-700 dark:text-slate-300">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-3 text-stone-400" />
                <input
                  type="email"
                  required
                  placeholder="you@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-white dark:bg-slate-800 text-stone-900 dark:text-white border border-stone-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-700 dark:text-slate-300">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-3 text-stone-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Create strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 text-xs rounded-xl bg-white dark:bg-slate-800 text-stone-900 dark:text-white border border-stone-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-stone-400 hover:text-stone-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-[#1C1917] text-white text-xs font-black shadow-lg hover:bg-stone-800 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin text-amber-400" /> : <Sparkles className="w-4 h-4 text-amber-400" />}
              <span>{isLoading ? 'Creating Account...' : 'Register & Start Matching'}</span>
            </button>
          </form>
        )}

      </div>

    </div>
  );
};
