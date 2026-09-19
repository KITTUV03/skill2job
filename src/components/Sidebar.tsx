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
  Settings
} from 'lucide-react';
import { useApp } from '@/lib/store';

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { savedJobIds, applications, stats, triggerManualScrape } = useApp();

  const navItems = [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Resume AI Matcher', href: '/resume', icon: FileText, badge: 'AI' },
    { label: 'Job Feed', href: '/jobs', icon: Briefcase, badge: stats.newToday > 0 ? `+${stats.newToday}` : undefined },
    { label: 'Saved Jobs', href: '/saved', icon: Bookmark, badge: savedJobIds.length > 0 ? savedJobIds.length : undefined },
    { label: 'Applications', href: '/applications', icon: Kanban, badge: applications.length },
    { label: 'Candidate Profile', href: '/profile', icon: User },
    { label: 'Settings', href: '/settings', icon: Settings },
    { label: 'Admin Harvester', href: '/admin', icon: ShieldAlert, highlight: true },
  ];

  return (
    <aside className="w-64 shrink-0 hidden md:flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 min-h-[calc(100vh-4rem)]">
      
      {/* Navigation Links */}
      <div className="space-y-1.5 flex-1">
        <div className="px-3 py-2 text-[11px] font-black tracking-wider text-slate-400 uppercase">
          Platform Workspace
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all group active:scale-95 ${
                isActive
                  ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400 border border-primary-500/20 font-black shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                  isActive ? 'text-primary-600 dark:text-primary-400' : item.highlight ? 'text-secondary-600' : 'text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200'
                }`} />
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && (
                <span className={`px-2 py-0.5 text-[10px] font-black rounded-full ${
                  isActive 
                    ? 'bg-primary-600 text-white' 
                    : item.badge === 'AI' 
                    ? 'bg-secondary-500/15 text-secondary-700 dark:text-secondary-300 border border-secondary-500/20' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                }`}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Real-time Harvester Widget in Sidebar */}
      <div className="mt-auto pt-4">
        <div className="p-4 rounded-2xl glass-card bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary-600 animate-pulse" />
              <span className="text-xs font-black text-slate-900 dark:text-white">Multi-Portal Sync</span>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
            {stats.lastSyncedText} across 7 providers.
          </p>
          <button
            onClick={triggerManualScrape}
            className="w-full py-2 px-3 text-xs font-black rounded-xl bg-primary-600 hover:bg-primary-500 text-white shadow-md shadow-primary-600/20 transition-all flex items-center justify-center gap-1.5 active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-accent-300" />
            Sync Providers Now
          </button>
        </div>
      </div>
    </aside>
  );
};
