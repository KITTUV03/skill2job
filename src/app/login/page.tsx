'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Radar, Mail, Lock, ArrowRight, Eye, EyeOff, ShieldCheck, KeyRound, Loader2, Sparkles, X, User } from 'lucide-react';
import { useApp } from '@/lib/store';

export default function LoginPage() {
  const router = useRouter();
  const { loginWithCredentials, loginWithGoogle, loginWithLinkedIn, updatePassword, showNotification } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Google SSO Interactive Modal
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [googleEmail, setGoogleEmail] = useState('');
  const [googleName, setGoogleName] = useState('');

  // Password Reset Modal
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please enter both your email address and password.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const success = await loginWithCredentials(email.trim(), password);
      if (success) {
        router.push('/dashboard');
      } else {
        setErrorMessage('Authentication failed. Please check your credentials or register a new account.');
      }
    } catch (err: any) {
      setErrorMessage('Network error while connecting to authentication server.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSSOSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!googleEmail.trim()) return;
    loginWithGoogle({
      name: googleName.trim() || googleEmail.split('@')[0],
      email: googleEmail.trim()
    });
    setShowGoogleModal(false);
    router.push('/dashboard');
  };

  const fillDemoAccount = () => {
    setEmail('alex.vanderbilt@roleradar.ai');
    setPassword('CandidatePass2026!');
    setErrorMessage('');
  };

  const handlePasswordResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.trim()) {
      updatePassword(newPassword);
      setShowForgotModal(false);
      setPassword(newPassword);
      showNotification('Password updated. You may now sign in with your new password.', 'success');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-[#FDFBF7] dark:bg-slate-950 relative">
      
      {/* Login Card */}
      <div className="w-full max-w-md p-8 rounded-3xl glass-card bg-white dark:bg-slate-900 border border-[#EAE4D7] dark:border-slate-800 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 mb-1">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-600 to-indigo-700 p-0.5 shadow-md">
              <div className="w-full h-full bg-[#1C1917] rounded-[14px] flex items-center justify-center">
                <Radar className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <span className="font-black text-2xl tracking-tight text-stone-900 dark:text-white">
              Role<span className="text-gradient">Radar</span>
            </span>
          </Link>
          <h1 className="text-xl font-black text-stone-900 dark:text-white">Sign In to Your Account</h1>
          <p className="text-xs text-stone-500 dark:text-slate-400">Access personalized AI recommendations & multi-portal harvesters</p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-700 dark:text-red-400 text-xs font-semibold animate-fadeIn">
            {errorMessage}
          </div>
        )}

        {/* Social SSO Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setShowGoogleModal(true)}
            className="px-4 py-2.5 rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800/80 text-xs font-bold text-stone-800 dark:text-slate-200 hover:bg-stone-100 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            Google Sign-In
          </button>

          <button
            type="button"
            onClick={() => {
              loginWithLinkedIn({ name: 'Candidate Engineer', email: 'candidate@linkedin.com' });
              router.push('/dashboard');
            }}
            className="px-4 py-2.5 rounded-xl border border-blue-500/30 bg-blue-600/10 text-xs font-bold text-blue-700 dark:text-blue-400 hover:bg-blue-600/20 transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
            </svg>
            LinkedIn Login
          </button>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="border-t border-stone-200 dark:border-slate-800 w-full" />
          <span className="bg-white dark:bg-slate-900 px-3 text-[11px] text-stone-400 uppercase font-bold tracking-wider absolute">
            Or credentials
          </span>
        </div>

        {/* Credentials Form */}
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
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-stone-50 dark:bg-slate-800 text-stone-900 dark:text-white border border-stone-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-stone-700 dark:text-slate-300">Password</label>
              <button
                type="button"
                onClick={() => {
                  setResetEmail(email);
                  setShowForgotModal(true);
                }}
                className="text-[11px] font-bold text-amber-700 dark:text-amber-400 hover:underline"
              >
                Reset Password?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-3 text-stone-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 text-xs rounded-xl bg-stone-50 dark:bg-slate-800 text-stone-900 dark:text-white border border-stone-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
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

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" defaultChecked className="rounded accent-amber-600" />
              <label htmlFor="remember" className="text-xs text-stone-600 dark:text-slate-400">Remember me for 30 days</label>
            </div>

            <button
              type="button"
              onClick={fillDemoAccount}
              className="text-[11px] font-bold text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 underline"
            >
              ⚡ Fill Demo Account
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-[#1C1917] text-white text-xs font-black shadow-lg hover:bg-stone-800 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                <span>Authenticating with MySQL...</span>
              </>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <div className="text-center pt-2 text-xs text-stone-600 dark:text-slate-400">
          Don't have an account yet?{' '}
          <Link href="/signup" className="font-extrabold text-amber-700 dark:text-amber-400 hover:underline">
            Create Free Account
          </Link>
        </div>

      </div>

      {/* Google SSO Modal */}
      {showGoogleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-sm p-6 rounded-3xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <h3 className="text-sm font-black text-stone-900 dark:text-white">Sign in with Google</h3>
              </div>
              <button
                onClick={() => setShowGoogleModal(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleGoogleSSOSubmit} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700 dark:text-slate-300">Your Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-3 text-stone-400" />
                  <input
                    type="text"
                    placeholder="e.g. Priyanshu Sharma"
                    value={googleName}
                    onChange={(e) => setGoogleName(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 text-xs rounded-xl bg-stone-50 dark:bg-slate-800 text-stone-900 dark:text-white border border-stone-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700 dark:text-slate-300">Google Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-3 text-stone-400" />
                  <input
                    type="email"
                    required
                    placeholder="you@gmail.com"
                    value={googleEmail}
                    onChange={(e) => setGoogleEmail(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 text-xs rounded-xl bg-stone-50 dark:bg-slate-800 text-stone-900 dark:text-white border border-stone-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={!googleEmail.trim()}
                className="w-full py-2.5 rounded-xl bg-[#1C1917] text-white text-xs font-bold hover:bg-stone-800 transition-all flex items-center justify-center gap-2 mt-2"
              >
                Continue with Google
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-sm p-6 rounded-3xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-amber-600" />
                <h3 className="text-sm font-black text-stone-900 dark:text-white">Reset Account Password</h3>
              </div>
              <button
                onClick={() => setShowForgotModal(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handlePasswordResetSubmit} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700 dark:text-slate-300">Target Email</label>
                <input
                  type="email"
                  required
                  placeholder="your.email@domain.com"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl bg-stone-50 dark:bg-slate-800 text-stone-900 dark:text-white border border-stone-200 dark:border-slate-700"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700 dark:text-slate-300">New Password</label>
                <input
                  type="password"
                  required
                  placeholder="Enter new strong password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl bg-stone-50 dark:bg-slate-800 text-stone-900 dark:text-white border border-stone-200 dark:border-slate-700"
                />
              </div>

              <button
                type="submit"
                disabled={!newPassword.trim()}
                className="w-full py-2.5 rounded-xl bg-[#1C1917] text-white text-xs font-bold hover:bg-stone-800 transition-all flex items-center justify-center gap-2 mt-2"
              >
                Save New Password
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
