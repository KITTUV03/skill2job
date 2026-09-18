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
  ChevronDown
} from 'lucide-react';
import { useApp } from '@/lib/store';
import { ThemeToggle } from './ThemeToggle';

export const Navbar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, scraperLogs, stats } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/jobs?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const isDashboardRoute = pathname.startsWith('/dashboard') || 
                          pathname.startsWith('/jobs') || 
                          pathname.startsWith('/resume') || 
                          pathname.startsWith('/applications') ||
                          pathname.startsWith('/saved') ||
                          pathname.startsWith('/profile') ||
                          pathname.startsWith('/admin');

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-purple-600 to-cyan-400 p-0.5 shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
              <Radar className="w-5 h-5 text-cyan-400 animate-pulse-slow" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
                Role<span className="text-gradient">Radar</span>
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-semibold tracking-wide uppercase bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-sm">
                AI v2.4
              </span>
            </div>
          </div>
        </Link>

        {/* Global Search Bar (Dashboard view) */}
        {isDashboardRoute && (
          <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center flex-1 max-w-md relative">
            <Search className="w-4 h-4 absolute left-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search jobs, skills (SystemVerilog, PyTorch, React, STA)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm rounded-xl bg-slate-100 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 placeholder-slate-400 border border-slate-200 dark:border-slate-700/60 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all"
            />
          </form>
        )}

        {/* Navigation Links for Public Landing vs Dashboard */}
        {!isDashboardRoute ? (
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
            <Link href="/#features" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Features</Link>
            <Link href="/#how-it-works" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">How It Works</Link>
            <Link href="/#stats" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Stats</Link>
            <Link href="/jobs" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Explore Jobs</Link>
          </nav>
        ) : (
          <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-slate-600 dark:text-slate-300">
            <Link 
              href="/dashboard" 
              className={`hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${pathname === '/dashboard' ? 'text-blue-600 dark:text-blue-400 font-semibold' : ''}`}
            >
              Dashboard
            </Link>
            <Link 
              href="/jobs" 
              className={`hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${pathname === '/jobs' ? 'text-blue-600 dark:text-blue-400 font-semibold' : ''}`}
            >
              Jobs Feed
            </Link>
            <Link 
              href="/resume" 
              className={`hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${pathname === '/resume' ? 'text-blue-600 dark:text-blue-400 font-semibold' : ''}`}
            >
              Resume AI
            </Link>
            <Link 
              href="/applications" 
              className={`hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${pathname === '/applications' ? 'text-blue-600 dark:text-blue-400 font-semibold' : ''}`}
            >
              Kanban Tracker
            </Link>
          </nav>
        )}

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative border border-slate-200 dark:border-slate-700/60 shadow-sm"
              title="Live Job Sync Notifications"
            >
              <Bell className="w-5 h-5 text-slate-700 dark:text-slate-200" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl glass-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl z-50 p-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-500" />
                    <span className="font-semibold text-sm text-slate-900 dark:text-white">Live Harvester Alerts</span>
                  </div>
                  <span className="text-xs text-emerald-500 font-medium px-2 py-0.5 rounded-full bg-emerald-500/10">
                    Real-time Active
                  </span>
                </div>

                <div className="mt-3 space-y-2.5 max-h-72 overflow-y-auto pr-1">
                  {scraperLogs.slice(0, 5).map(log => (
                    <div key={log.id} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/50 text-xs">
                      <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
                        <span className="font-semibold text-blue-600 dark:text-blue-400">{log.portal}</span>
                        <span>{new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <p className="text-slate-700 dark:text-slate-200 font-medium">{log.message}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-800 text-center">
                  <Link 
                    href="/admin" 
                    onClick={() => setShowNotifications(false)}
                    className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Manage Job Harvesters & Scrapers →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* User Profile / Auth buttons */}
          {!isDashboardRoute ? (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-blue-600 transition-colors"
              >
                Log In
              </Link>
              <Link
                href="/dashboard"
                className="px-4 py-2 text-sm font-semibold rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-md shadow-blue-500/25 transition-all transform hover:-translate-y-0.5"
              >
                Launch App
              </Link>
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-700/60"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-lg object-cover ring-2 ring-blue-500/30"
                />
                <span className="hidden sm:inline text-xs font-semibold text-slate-800 dark:text-slate-200">{user.name.split(' ')[0]}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl glass-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl z-50 p-2 text-xs">
                  <div className="p-3 border-b border-slate-100 dark:border-slate-800">
                    <p className="font-bold text-slate-900 dark:text-white text-sm">{user.name}</p>
                    <p className="text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
                  </div>

                  <div className="py-1 space-y-0.5">
                    <Link
                      href="/dashboard"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      <Briefcase className="w-4 h-4 text-blue-500" />
                      Dashboard
                    </Link>
                    <Link
                      href="/resume"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      <FileText className="w-4 h-4 text-purple-500" />
                      Resume Profile
                    </Link>
                    <Link
                      href="/applications"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      <Layers className="w-4 h-4 text-cyan-500" />
                      Applications Tracker
                    </Link>
                    <Link
                      href="/admin"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      Admin Harvester Panel
                    </Link>
                  </div>

                  <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
                    <Link
                      href="/login"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30"
                    >
                      Log Out
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </header>
  );
};
