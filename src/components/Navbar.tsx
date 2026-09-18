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
  const { user, scraperLogs, isAuthenticated, logout } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/jobs?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const navLinks = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Explore Jobs', href: '/jobs' },
    { label: 'Upload & Match', href: '/resume' },
    { label: 'Applications Board', href: '/applications' },
    { label: 'Harvester Admin', href: '/admin' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-panel bg-slate-950/90 border-b border-slate-800 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0 active:scale-95 transition-transform">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 via-indigo-500 to-emerald-400 p-0.5 shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Radar className="w-5 h-5 text-sky-400 animate-pulse" />
            </div>
          </div>
          <span className="font-extrabold text-xl tracking-tight text-white">
            Role<span className="text-gradient">Radar</span>
          </span>
        </Link>

        {/* Global Quick Search Bar */}
        <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center flex-1 max-w-sm relative">
          <Search className="w-4 h-4 absolute left-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search SystemVerilog, UVM, PyTorch, React..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-900 text-slate-100 placeholder-slate-400 border border-slate-800 focus:outline-none focus:border-sky-500 transition-all"
          />
        </form>

        {/* Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1.5 text-xs font-semibold">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-2 rounded-xl transition-all active:scale-95 ${
                  isActive
                    ? 'bg-sky-500/10 text-sky-400 border border-sky-500/30 font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          
          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-xl text-slate-300 hover:bg-slate-800 transition-colors relative border border-slate-800 active:scale-95"
              title="Notifications"
            >
              <Bell className="w-4.5 h-4.5 text-slate-300" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl glass-card bg-slate-900 border border-slate-800 shadow-2xl z-50 p-4 text-xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-sky-400" /> Live Scraper Log Stream
                  </span>
                  <span className="text-[10px] text-emerald-400 font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10">Active</span>
                </div>

                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {scraperLogs.slice(0, 5).map(log => (
                    <div key={log.id} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                        <span className="font-bold text-sky-400">{log.portal}</span>
                        <span>{new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <p className="text-slate-300">{log.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Account State */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-800 transition-colors border border-slate-800 active:scale-95"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-7 h-7 rounded-lg object-cover ring-1 ring-sky-500/30"
              />
              <span className="hidden sm:inline text-xs font-semibold text-slate-200">{user.name.split(' ')[0]}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl glass-card bg-slate-900 border border-slate-800 shadow-2xl z-50 p-2 text-xs">
                <div className="p-3 border-b border-slate-800">
                  <p className="font-bold text-white">{user.name}</p>
                  <p className="text-slate-400 truncate">{user.email}</p>
                </div>

                <div className="py-1 space-y-0.5">
                  <Link href="/dashboard" onClick={() => setShowUserMenu(false)} className="block px-3 py-2 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white">
                    Dashboard
                  </Link>
                  <Link href="/jobs" onClick={() => setShowUserMenu(false)} className="block px-3 py-2 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white">
                    Explore Jobs
                  </Link>
                  <Link href="/resume" onClick={() => setShowUserMenu(false)} className="block px-3 py-2 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white">
                    Upload & Match Resume
                  </Link>
                  <Link href="/applications" onClick={() => setShowUserMenu(false)} className="block px-3 py-2 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white">
                    Applications Board
                  </Link>
                  <Link href="/admin" onClick={() => setShowUserMenu(false)} className="block px-3 py-2 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white">
                    Admin Harvester Console
                  </Link>
                </div>

                <div className="pt-1 border-t border-slate-800">
                  <Link href="/login" onClick={() => { logout(); setShowUserMenu(false); }} className="block px-3 py-2 rounded-xl text-rose-400 hover:bg-rose-950/30">
                    Log Out
                  </Link>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};
