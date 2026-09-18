'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { User, MapPin, Mail, Briefcase, Award, GraduationCap, Sparkles, CheckCircle2, Save } from 'lucide-react';
import { useApp } from '@/lib/store';

export default function ProfilePage() {
  const { user, resumeProfile, showNotification } = useApp();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [title, setTitle] = useState(user.title);
  const [location, setLocation] = useState(user.location);
  const [locationPref, setLocationPref] = useState(resumeProfile?.locationPreference || 'Bengaluru / San Jose / Hybrid');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showNotification('Candidate profile specifications updated!', 'success');
  };

  return (
    <ProtectedRoute>
      <div className="flex min-h-[calc(100vh-4rem)]">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 max-w-5xl mx-auto">
          
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">User Profile & Job Preferences</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Manage your candidate specs, target domain preferences, and location settings.</p>
          </div>

          <form onSubmit={handleSave} className="p-8 rounded-3xl glass-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
            
            <div className="flex items-center gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-20 h-20 rounded-2xl object-cover ring-4 ring-blue-500/20 shadow-md"
              />
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">{name}</h2>
                <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold">{title}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{email}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Professional Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Current Base Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700"
                />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Target Location Preferences</label>
                <input
                  type="text"
                  value={locationPref}
                  onChange={(e) => setLocationPref(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs font-bold shadow-md flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Profile Changes
              </button>
            </div>

          </form>

        </main>
      </div>
    </ProtectedRoute>
  );
}
