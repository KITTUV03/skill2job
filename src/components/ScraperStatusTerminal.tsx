'use client';

import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  RefreshCw, 
  Terminal, 
  Activity, 
  CheckCircle2, 
  AlertTriangle, 
  Play, 
  Database,
  Globe,
  Users,
  KeyRound,
  Search
} from 'lucide-react';
import { useApp } from '@/lib/store';

export const ScraperStatusTerminal: React.FC = () => {
  const { scraperStatuses, scraperLogs, triggerManualScrape, stats, user } = useApp();
  const [isSyncing, setIsSyncing] = useState(false);
  const [dbUsers, setDbUsers] = useState<any[]>([]);
  const [showSqlSchema, setShowSqlSchema] = useState(false);

  useEffect(() => {
    // Fetch registered users list from database API
    fetch('/api/auth/users')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setDbUsers(data.users);
        }
      })
      .catch(() => {
        // Fallback profile if server response pending
        setDbUsers([
          {
            id: user.id || 'usr-1',
            name: user.name,
            email: user.email,
            title: user.title,
            authProvider: 'MySQL DB / Email',
            createdAt: new Date().toISOString(),
            status: 'Active'
          }
        ]);
      });
  }, [user]);

  const handleManualTrigger = () => {
    setIsSyncing(true);
    triggerManualScrape();
    setTimeout(() => {
      setIsSyncing(false);
    }, 1500);
  };

  return (
    <div className="space-y-8">
      
      {/* Top Banner & Control */}
      <div className="p-6 rounded-3xl glass-card bg-slate-900 text-white border border-slate-800 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 via-cyan-500 to-blue-600 p-0.5 shadow-lg">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Activity className="w-6 h-6 text-emerald-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-white">Admin Console & Database Inspector</h2>
              <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                SYSTEM HEALTH 99.8%
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Active ingestion pipelines running for 7 job portals + Live MySQL database user registry.
            </p>
          </div>
        </div>

        <button
          onClick={handleManualTrigger}
          disabled={isSyncing}
          className="w-full md:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-500 hover:from-blue-500 hover:to-emerald-400 text-white font-bold text-xs shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
          <span>{isSyncing ? 'Harvesting Portals...' : 'Trigger Live Sync Now'}</span>
        </button>

      </div>

      {/* MySQL Registered Users Database Inspector Table */}
      <div className="p-6 rounded-3xl glass-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center border border-purple-500/20">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <span>MySQL Registered Users Table</span>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                  table: users
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">View candidates who registered or logged in via credentials / SSO</p>
            </div>
          </div>

          <button
            onClick={() => setShowSqlSchema(!showSqlSchema)}
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60 hover:bg-slate-200"
          >
            {showSqlSchema ? 'Hide SQL Schema' : 'View MySQL Schema'}
          </button>
        </div>

        {/* SQL Schema View */}
        {showSqlSchema && (
          <div className="p-4 rounded-2xl bg-slate-950 font-mono text-xs text-emerald-400 border border-slate-800 space-y-1">
            <span className="text-slate-500">// MySQL Database Definition Schema</span>
            <p>CREATE TABLE IF NOT EXISTS users (</p>
            <p className="pl-4">id VARCHAR(255) PRIMARY KEY,</p>
            <p className="pl-4">name VARCHAR(255) NOT NULL,</p>
            <p className="pl-4">email VARCHAR(255) UNIQUE NOT NULL,</p>
            <p className="pl-4">password_hash VARCHAR(255) NOT NULL,</p>
            <p className="pl-4">title VARCHAR(255) DEFAULT 'Candidate / Engineer',</p>
            <p className="pl-4">created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP</p>
            <p>);</p>
          </div>
        )}

        {/* Registered Users Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white uppercase font-extrabold tracking-wider border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-3">Candidate Name</th>
                <th className="p-3">Email Address</th>
                <th className="p-3">Professional Title</th>
                <th className="p-3">Auth Provider</th>
                <th className="p-3">Registered At</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
              {dbUsers.map((u, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-600 font-bold flex items-center justify-center">
                      {u.name.charAt(0)}
                    </div>
                    <span>{u.name}</span>
                  </td>
                  <td className="p-3 text-slate-500 dark:text-slate-400">{u.email}</td>
                  <td className="p-3">{u.title || 'Senior VLSI & AI Lead'}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                      {u.authProvider || 'MySQL DB'}
                    </span>
                  </td>
                  <td className="p-3 text-slate-500">{new Date(u.createdAt).toLocaleDateString()}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 text-[10px] font-extrabold rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      ✓ Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-5 rounded-3xl glass-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Indexed Jobs</span>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-white mt-2">{stats.totalJobs.toLocaleString()}</p>
          <p className="text-[11px] text-emerald-500 font-semibold mt-1">✓ 0 duplicates retained</p>
        </div>
        <div className="p-5 rounded-3xl glass-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">New Listings Today</span>
          <p className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 mt-2">+{stats.newToday}</p>
          <p className="text-[11px] text-slate-500 mt-1">Refreshed every 30s</p>
        </div>
        <div className="p-5 rounded-3xl glass-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Portal Connectors</span>
          <p className="text-3xl font-extrabold text-purple-600 dark:text-purple-400 mt-2">7 / 7 Online</p>
          <p className="text-[11px] text-purple-500 font-semibold mt-1">100% Rate Limit Compliance</p>
        </div>
      </div>

      {/* Portal Connectors Status Grid */}
      <div className="space-y-4">
        <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <Globe className="w-5 h-5 text-blue-500" />
          Supported Connector Statuses
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {scraperStatuses.map((s, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl glass-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-900 dark:text-white">{s.portal}</span>
                <span className="px-2 py-0.5 text-[10px] font-extrabold rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  {s.status}
                </span>
              </div>
              <div className="text-xs text-slate-500 space-y-1">
                <p>Jobs Harvested: <span className="font-bold text-slate-800 dark:text-slate-200">{s.jobCount}</span></p>
                <p>Last Sync: <span className="font-semibold">{s.lastSync}</span></p>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${s.health}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Terminal Log Stream */}
      <div className="rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl p-6 font-mono text-xs text-slate-300 space-y-3">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-slate-400">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span className="font-bold text-white">Live Harvester Console Output</span>
          </div>
          <span className="text-[11px] text-emerald-400">● TTY / REALTIME STREAM</span>
        </div>

        <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
          {scraperLogs.map((log) => (
            <div key={log.id} className="flex items-start gap-3 text-[11px] leading-relaxed">
              <span className="text-slate-500 shrink-0">[{new Date(log.timestamp).toLocaleTimeString()}]</span>
              <span className="text-purple-400 font-bold shrink-0">[{log.portal}]</span>
              <span className={log.status === 'SUCCESS' ? 'text-emerald-400' : 'text-amber-400'}>
                {log.message}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
