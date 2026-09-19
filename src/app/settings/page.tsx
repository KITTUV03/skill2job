'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  ShieldCheck, 
  KeyRound, 
  RefreshCw, 
  Save, 
  CheckCircle2,
  Trash2
} from 'lucide-react';
import { useApp } from '@/lib/store';

export default function SettingsPage() {
  const { user, updatePassword, showNotification, logout } = useApp();
  const [syncInterval, setSyncInterval] = useState('15');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [minMatchThreshold, setMinMatchThreshold] = useState('85');

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword) return;
    if (newPassword !== confirmPassword) {
      showNotification('Passwords do not match.', 'warning');
      return;
    }
    updatePassword(newPassword);
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleSavePreferences = () => {
    showNotification('System preferences updated successfully!', 'success');
  };

  return (
    <ProtectedRoute>
      <div className="flex min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-950">
        <Sidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 max-w-4xl mx-auto">
          
          <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
            <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <SettingsIcon className="w-6 h-6 text-primary-600" />
              Candidate & Platform Settings
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Configure synchronization parameters, job matching thresholds, and account security.
            </p>
          </div>

          <div className="space-y-6">
            
            {/* Aggregation & Match Preferences */}
            <div className="p-6 rounded-3xl glass-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
                <RefreshCw className="w-5 h-5 text-primary-600" />
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Real-Time Aggregation Preferences</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Sync Interval Frequency</label>
                  <select
                    value={syncInterval}
                    onChange={(e) => setSyncInterval(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium"
                  >
                    <option value="15">Every 15 Minutes (Recommended)</option>
                    <option value="30">Every 30 Minutes</option>
                    <option value="60">Every 60 Minutes</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Minimum AI Match Threshold</label>
                  <select
                    value={minMatchThreshold}
                    onChange={(e) => setMinMatchThreshold(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium"
                  >
                    <option value="90">90%+ (Highest Confidence Only)</option>
                    <option value="85">85%+ (Default Standard)</option>
                    <option value="75">75%+ (Broad Opportunities)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="email-alerts"
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                  className="rounded accent-primary-600 w-4 h-4"
                />
                <label htmlFor="email-alerts" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Notify me when new 95%+ matched opportunities arrive across providers
                </label>
              </div>

              <button
                type="button"
                onClick={handleSavePreferences}
                className="px-5 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white text-xs font-black shadow-md shadow-primary-600/20 transition-all flex items-center gap-2 active:scale-95"
              >
                <Save className="w-4 h-4" />
                <span>Save Preferences</span>
              </button>
            </div>

            {/* Account Security & Password */}
            <div className="p-6 rounded-3xl glass-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
                <KeyRound className="w-5 h-5 text-secondary-600" />
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Account Security & Credentials</h3>
              </div>

              <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-md text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">New Password</label>
                  <input
                    type="password"
                    placeholder="Enter new password (min 6 chars)"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Confirm New Password</label>
                  <input
                    type="password"
                    placeholder="Re-enter password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!newPassword}
                  className="px-5 py-2.5 rounded-xl bg-secondary-600 hover:bg-secondary-500 text-white text-xs font-black shadow-md shadow-secondary-600/20 transition-all disabled:opacity-50 active:scale-95"
                >
                  Update Password
                </button>
              </form>
            </div>

            {/* Danger Zone: Session Purge / Sign Out */}
            <div className="p-6 rounded-3xl glass-card bg-red-50/50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 space-y-3">
              <h3 className="font-extrabold text-sm text-red-700 dark:text-red-400">Session & Data Management</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                End all active authentication sessions or sign out of your current device.
              </p>
              <button
                type="button"
                onClick={logout}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all"
              >
                Sign Out of RoleRadar
              </button>
            </div>

          </div>

        </main>
      </div>
    </ProtectedRoute>
  );
}
