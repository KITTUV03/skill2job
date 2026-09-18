'use client';

import React from 'react';
import Link from 'next/link';
import { Radar, Github, Twitter, Linkedin, Mail, Heart, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-purple-600 to-cyan-400 p-0.5">
                <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                  <Radar className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                Role<span className="text-gradient">Radar</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              RoleRadar is an enterprise AI job search and dynamic harvesting platform. We analyze your resume using neural models and continuously scrape opportunities across LinkedIn, Naukri, Indeed, Wellfound, Foundit, and company career portals.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Supported Domains */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">Job Domains</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/jobs?domain=VLSI+%2F+Semiconductor" className="hover:text-blue-400 transition-colors">VLSI / Semiconductor</Link></li>
              <li><Link href="/jobs?domain=AI+%2F+Machine+Learning" className="hover:text-blue-400 transition-colors">AI & Machine Learning</Link></li>
              <li><Link href="/jobs?domain=Software+Engineering" className="hover:text-blue-400 transition-colors">Software Engineering</Link></li>
              <li><Link href="/jobs?domain=Embedded+Systems" className="hover:text-blue-400 transition-colors">Embedded Systems</Link></li>
              <li><Link href="/jobs?domain=Data+Science+%26+Analytics" className="hover:text-blue-400 transition-colors">Data Science</Link></li>
              <li><Link href="/jobs?domain=Finance+%26+FinTech" className="hover:text-blue-400 transition-colors">Finance & FinTech</Link></li>
            </ul>
          </div>

          {/* Aggregation Portals */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">Harvester Connectors</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> LinkedIn Jobs API</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Naukri Live Sync</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Indeed Global</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Wellfound Startup Engine</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Foundit Aggregator</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Company Career Pages</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">Platform & Legal</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/dashboard" className="hover:text-blue-400 transition-colors">Candidate Dashboard</Link></li>
              <li><Link href="/resume" className="hover:text-blue-400 transition-colors">Resume AI Parser</Link></li>
              <li><Link href="/admin" className="hover:text-blue-400 transition-colors">Admin Sync Terminal</Link></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Contact Support</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} RoleRadar Inc. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Engineered with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for Next-Gen Job Seekers & Tech Talent.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
