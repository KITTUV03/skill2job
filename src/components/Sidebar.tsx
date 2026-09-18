'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  FileText, 
  Briefcase, 
  Bookmark, 
  Kanban, 
  User, 
  ShieldAlert, 
  Sparkles,
  Zap,
  TrendingUp
} from 'lucide-react';
import { useApp } from '@/lib/store';

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { savedJobIds, applications, stats, triggerManualScrape } = useApp();

  const navItems = [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Resume Profile', href: '/resume', icon: FileText, badge: 'AI' },
    { label: 'Job Matches', href: '/jobs', icon: Briefcase, badge: stats.newToday > 0 ? `+${stats.newToday}` : undefined },
    { label: 'Saved Jobs', href: '/saved', icon: Bookmark, badge: savedJobIds.length > 0 ? savedJobIds.length : undefined },
    { label: 'Applications', href: '/applications', icon: Kanban, badge: applications.length },
    { label: 'Profile & Specs', href: '/profile', icon: User },
    { label: 'Admin Harvesters', href: '/admin', icon: ShieldAlert, highlight: true },
  ];

  return (
    <aside className="w-64 shrink-0 hidden md:flex flex-col border-r border-slate-200/80 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md p-4 min-h-[calc(100vh-4rem)]">
      
      {/* Navigation Links */}
      <div className="space-y-1.5 flex-1">
        <div className="px-3 py-2 text-[11px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
          Navigation
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/70 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                  isActive ? 'text-white' : item.highlight ? 'text-amber-500' : 'text-slate-500 dark:text-slate-400 group-hover:text-blue-500'
                }`} />
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && (
                <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                  isActive 
                    ? 'bg-white/20 text-white' 
                    : item.badge === 'AI' 
                    ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20' 
                    : 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                }`}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Real-time Harvester Widget */}
      <div className="mt-auto pt-4">
        <div className="p-4 rounded-2xl glass-card bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-slate-900/20 border border-blue-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-amber-400 animate-pulse" />
            <span className="text-xs font-bold text-slate-900 dark:text-white">Live Harvester Active</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3 leading-relaxed">
            Auto-syncing LinkedIn, Naukri & Indeed job listings every 30s.
          </p>
          <button
            onClick={triggerManualScrape}
            className="w-full py-2 px-3 text-xs font-semibold rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white dark:text-slate-200 border border-slate-700/60 shadow-sm transition-all flex items-center justify-center gap-1.5 active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            Trigger Harvest Sync
          </button>
        </div>
      </div>
    </aside>
  );
};
