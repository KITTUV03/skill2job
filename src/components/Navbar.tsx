'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { 
  Radar, 
  Search, 
  Bell, 
  User as UserIcon, 
  ShieldCheck, 
  Sparkles, 
  Briefcase, 
  Layers, 
  FileText,
  ChevronDown,
  LogIn,
  Bookmark,
  LogOut,
  Settings,
  Clock,
  Play
} from 'lucide-react';
import { useApp } from '@/lib/store';
import { AuthModal } from './AuthModal';

export const Navbar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, scraperLogs, isAuthenticated, logout, stats, isDemoMode, loadDemoResume } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      router.push(`/login?redirect=${encodeURIComponent(`/jobs?search=${encodeURIComponent(searchQuery.trim())}`)}`);
      return;
    }
    if (searchQuery.trim()) {
      router.push(`/jobs?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Nav links based on auth state
  const authenticatedLinks = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Search Jobs', href: '/jobs' },
    { label: 'Upload & Match', href: '/resume' },
    { label: 'Applications', href: '/applications' },
    { label: 'Settings', href: '/settings' },
    { label: 'Admin Harvester', href: '/admin' },
  ];

  const publicLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ];

  const navLinks = isAuthenticated ? authenticatedLinks : publicLinks;

  const handleDemoClick = async () => {
    await loadDemoResume('vlsi');
    router.push('/dashboard');
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full glass-panel backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0 active:scale-95 transition-transform">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary-600 via-primary-700 to-secondary-600 p-0.5 shadow-md shadow-primary-600/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0F172A] rounded-[10px] flex items-center justify-center">
                <Radar className="w-5 h-5 text-accent-500 animate-pulse" />
              </div>
            </div>
            <span className="font-black text-xl tracking-tight text-slate-900 dark:text-white">
              Role<span className="text-primary-600">Radar</span>
            </span>
          </Link>

          {/* Real-time Status Indicator Pill in Nav */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px] font-bold text-slate-600 dark:text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{stats.lastSyncedText || 'Last Synced 2 Minutes Ago'}</span>
          </div>

          {/* Quick Search Bar */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center flex-1 max-w-xs relative">
            <Search className="w-4 h-4 absolute left-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search skills, roles, companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-1.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500/30 transition-all shadow-sm"
            />
          </form>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 text-xs font-bold">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-xl transition-all ${
                    isActive
                      ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400 border border-primary-500/20 font-black shadow-sm'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            
            {/* Authenticated State */}
            {isAuthenticated ? (
              <>
                {/* Notifications Stream */}
                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 shadow-sm active:scale-95"
                    title="Live Aggregator Activity"
                  >
                    <Bell className="w-4 h-4" />
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500" />
                  </button>

                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl z-50 p-4 text-xs space-y-3 animate-fadeIn">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                        <span className="font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4 text-primary-600" /> Real-Time Harvester Stream
                        </span>
                        <span className="text-[10px] text-emerald-600 font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">Active</span>
                      </div>

                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {scraperLogs.slice(0, 5).map(log => (
                          <div key={log.id} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                            <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                              <span className="font-extrabold text-primary-600">{log.portal}</span>
                              <span>{new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                            <p className="text-slate-800 dark:text-slate-200 font-medium">{log.message}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* User Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm active:scale-95"
                  >
                    <img
                      src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                      alt={user.name || 'User'}
                      className="w-7 h-7 rounded-lg object-cover ring-1 ring-primary-500/40"
                    />
                    <span className="hidden sm:inline text-xs font-bold text-slate-800 dark:text-slate-200">
                      {user.name ? user.name.split(' ')[0] : 'Candidate'}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl z-50 p-2 text-xs animate-fadeIn">
                      <div className="p-3 border-b border-slate-200 dark:border-slate-800">
                        <p className="font-black text-slate-900 dark:text-white truncate">{user.name || 'Candidate'}</p>
                        <p className="text-slate-400 truncate">{user.email || 'Candidate Account'}</p>
                      </div>

                      <div className="py-1 space-y-0.5 font-semibold">
                        <Link href="/dashboard" onClick={() => setShowUserMenu(false)} className="block px-3 py-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
                          Dashboard
                        </Link>
                        <Link href="/jobs" onClick={() => setShowUserMenu(false)} className="block px-3 py-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
                          Job Feed
                        </Link>
                        <Link href="/resume" onClick={() => setShowUserMenu(false)} className="block px-3 py-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
                          Resume AI Matcher
                        </Link>
                        <Link href="/saved" onClick={() => setShowUserMenu(false)} className="block px-3 py-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
                          Saved Jobs
                        </Link>
                        <Link href="/applications" onClick={() => setShowUserMenu(false)} className="block px-3 py-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
                          Application Tracker
                        </Link>
                        <Link href="/settings" onClick={() => setShowUserMenu(false)} className="block px-3 py-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
                          Settings & Security
                        </Link>
                      </div>

                      <div className="pt-1 border-t border-slate-200 dark:border-slate-800">
                        <button
                          onClick={() => { logout(); setShowUserMenu(false); }}
                          className="w-full text-left px-3 py-2 rounded-xl text-rose-600 font-bold hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center gap-2"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Log Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              /* Public / Unauthenticated Actions */
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDemoClick}
                  className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-xl border border-primary-500/30 text-primary-600 dark:text-primary-400 bg-primary-500/10 hover:bg-primary-500/20 text-xs font-bold transition-colors"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Try Demo</span>
                </button>
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 rounded-xl bg-primary-600 hover:bg-primary-500 text-white text-xs font-black shadow-md shadow-primary-600/20 transition-all active:scale-95 flex items-center gap-1.5"
                >
                  <span>Get Started</span>
                </Link>
              </div>
            )}

          </div>
        </div>
      </header>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
};
