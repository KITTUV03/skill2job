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
  Zap
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
    <aside className="w-64 shrink-0 hidden md:flex flex-col border-r border-[#EAE4D7] bg-[#FDFBF7] p-4 min-h-[calc(100vh-4rem)]">
      
      {/* Navigation Links */}
      <div className="space-y-1.5 flex-1">
        <div className="px-3 py-2 text-[11px] font-extrabold tracking-wider text-stone-600 uppercase">
          Navigation
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
                  ? 'bg-amber-500/15 text-amber-900 border border-amber-500/30 font-extrabold shadow-sm'
                  : 'text-stone-700 hover:bg-stone-200/60 hover:text-stone-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                  isActive ? 'text-amber-700' : item.highlight ? 'text-amber-600' : 'text-stone-500 group-hover:text-stone-900'
                }`} />
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && (
                <span className={`px-2 py-0.5 text-[10px] font-extrabold rounded-full ${
                  isActive 
                    ? 'bg-amber-600 text-white' 
                    : item.badge === 'AI' 
                    ? 'bg-indigo-500/10 text-indigo-700 border border-indigo-500/20' 
                    : 'bg-stone-200 text-stone-800'
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
        <div className="p-4 rounded-2xl glass-card bg-white border border-[#EAE4D7] shadow-sm">
          <div className="flex items-center gap-2 mb-1.5">
            <Zap className="w-4 h-4 text-amber-600 animate-pulse" />
            <span className="text-xs font-extrabold text-stone-900">Live Harvester Sync</span>
          </div>
          <p className="text-[11px] text-stone-500 mb-3 leading-relaxed">
            Auto-syncing LinkedIn, Naukri & Indeed job listings.
          </p>
          <button
            onClick={triggerManualScrape}
            className="w-full py-2 px-3 text-xs font-bold rounded-xl bg-[#1C1917] hover:bg-stone-800 text-white border border-stone-800 shadow-sm transition-all flex items-center justify-center gap-1.5 active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Trigger Harvest Sync
          </button>
        </div>
      </div>
    </aside>
  );
};
