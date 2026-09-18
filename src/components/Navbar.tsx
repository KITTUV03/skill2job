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
  LogIn
} from 'lucide-react';
import { useApp } from '@/lib/store';
import { AuthModal } from './AuthModal';

export const Navbar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, scraperLogs, isAuthenticated, logout } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

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
    <>
      <header className="sticky top-0 z-40 w-full glass-panel bg-[#FDFBF7]/95 border-b border-[#EAE4D7] backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0 active:scale-95 transition-transform">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-700 to-indigo-800 p-0.5 shadow-md shadow-amber-600/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#1C1917] rounded-[10px] flex items-center justify-center">
                <Radar className="w-5 h-5 text-amber-400 animate-pulse" />
              </div>
            </div>
            <span className="font-extrabold text-xl tracking-tight text-stone-900">
              Role<span className="text-gradient">Radar</span>
            </span>
          </Link>

          {/* Global Quick Search Bar */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center flex-1 max-w-sm relative">
            <Search className="w-4 h-4 absolute left-3.5 text-stone-400" />
            <input
              type="text"
              placeholder="Search SystemVerilog, UVM, PyTorch, React..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-white text-stone-900 placeholder-stone-400 border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all shadow-sm"
            />
          </form>

          {/* Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1.5 text-xs font-bold">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-xl transition-all active:scale-95 ${
                    isActive
                      ? 'bg-amber-500/15 text-amber-800 border border-amber-500/30 font-extrabold shadow-sm'
                      : 'text-stone-700 hover:text-stone-900 hover:bg-stone-200/60'
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
                className="p-2 rounded-xl text-stone-700 hover:bg-stone-200/70 transition-colors relative border border-stone-300 bg-white shadow-sm active:scale-95"
                title="Notifications"
              >
                <Bell className="w-4.5 h-4.5 text-stone-700" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500" />
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl glass-card bg-white border border-stone-200 shadow-2xl z-50 p-4 text-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                    <span className="font-bold text-stone-900 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-600" /> Live Scraper Log Stream
                    </span>
                    <span className="text-[10px] text-emerald-700 font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">Active</span>
                  </div>

                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {scraperLogs.slice(0, 5).map(log => (
                      <div key={log.id} className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                        <div className="flex items-center justify-between text-[10px] text-stone-500 mb-1">
                          <span className="font-bold text-amber-700">{log.portal}</span>
                          <span>{new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <p className="text-stone-800 font-medium">{log.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Auth / Account State */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-stone-200/70 transition-colors border border-stone-300 bg-white shadow-sm active:scale-95"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-7 h-7 rounded-lg object-cover ring-1 ring-amber-500/40"
                  />
                  <span className="hidden sm:inline text-xs font-bold text-stone-800">{user.name.split(' ')[0]}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-stone-500" />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl glass-card bg-white border border-stone-200 shadow-2xl z-50 p-2 text-xs">
                    <div className="p-3 border-b border-stone-200">
                      <p className="font-extrabold text-stone-900">{user.name}</p>
                      <p className="text-stone-500 truncate">{user.email}</p>
                    </div>

                    <div className="py-1 space-y-0.5 font-semibold">
                      <Link href="/dashboard" onClick={() => setShowUserMenu(false)} className="block px-3 py-2 rounded-xl text-stone-700 hover:bg-stone-100 hover:text-stone-900">
                        Dashboard
                      </Link>
                      <Link href="/jobs" onClick={() => setShowUserMenu(false)} className="block px-3 py-2 rounded-xl text-stone-700 hover:bg-stone-100 hover:text-stone-900">
                        Explore Jobs
                      </Link>
                      <Link href="/resume" onClick={() => setShowUserMenu(false)} className="block px-3 py-2 rounded-xl text-stone-700 hover:bg-stone-100 hover:text-stone-900">
                        Upload & Match Resume
                      </Link>
                      <Link href="/applications" onClick={() => setShowUserMenu(false)} className="block px-3 py-2 rounded-xl text-stone-700 hover:bg-stone-100 hover:text-stone-900">
                        Applications Board
                      </Link>
                      <Link href="/admin" onClick={() => setShowUserMenu(false)} className="block px-3 py-2 rounded-xl text-stone-700 hover:bg-stone-100 hover:text-stone-900">
                        Harvester Admin Console
                      </Link>
                    </div>

                    <div className="pt-1 border-t border-stone-200">
                      <button
                        onClick={() => { logout(); setShowUserMenu(false); }}
                        className="w-full text-left px-3 py-2 rounded-xl text-rose-600 font-bold hover:bg-rose-50"
                      >
                        Log Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="px-4 py-2 rounded-xl bg-[#1C1917] hover:bg-stone-800 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5 active:scale-95"
              >
                <LogIn className="w-3.5 h-3.5 text-amber-400" />
                <span>Sign In / Register</span>
              </button>
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
