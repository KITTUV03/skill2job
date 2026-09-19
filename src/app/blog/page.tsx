import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Calendar, Clock, ArrowRight, Sparkles, User } from 'lucide-react';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'RoleRadar Career & AI Engineering Blog | Market Insights',
  description: 'Technical career playbooks, semiconductor hiring trends, AI engineering salary benchmarks, and resume optimization guides.'
};

export default function BlogPage() {
  const articles = [
    {
      slug: 'vlsi-semiconductor-market-2026',
      title: 'The 2026 VLSI & Physical Design Talent Market: What Silicon Giants Are Demanding',
      excerpt: 'As 2nm and 3nm chip designs reach tapeout, demand for high-frequency STA timing closure and Synopsys ICC2 engineers has exploded across NVIDIA, Qualcomm, and Apple.',
      category: 'Semiconductors & VLSI',
      date: 'September 18, 2026',
      readTime: '6 min read',
      author: 'RoleRadar Editorial Team'
    },
    {
      slug: 'ai-llm-systems-engineering-careers',
      title: 'From Software Engineer to Staff LLM Systems Architect: Required Tech Stacks',
      excerpt: 'A deep-dive into the transition from standard distributed systems to modern GPU cluster scaling, PyTorch 2.x compile graphs, CUDA kernels, and vLLM inference engines.',
      category: 'AI / Machine Learning',
      date: 'September 16, 2026',
      readTime: '8 min read',
      author: 'AI Engineering Lab'
    },
    {
      slug: 'ats-resume-optimization-guide',
      title: 'How Neural Job Matchers Parse Resumes in 2026 (And How to Beat Keyword Blindness)',
      excerpt: 'Why old-school ATS keyword-stuffing fails with modern vector similarity algorithms and how to structure your projects and taxonomy for maximum recruiter visibility.',
      category: 'Career Playbook',
      date: 'September 14, 2026',
      readTime: '5 min read',
      author: 'Career Intelligence Team'
    },
    {
      slug: 'embedded-firmware-automotive-iot',
      title: 'The High-Demand Renaissance in Embedded C and AUTOSAR Firmware',
      excerpt: 'How autonomous mobility and smart hardware are creating an unprecedented talent crunch for FreeRTOS and Linux kernel device driver engineers.',
      category: 'Embedded Systems',
      date: 'September 10, 2026',
      readTime: '7 min read',
      author: 'Hardware & Systems'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#0F172A]">
      
      {/* Blog Hero */}
      <section className="py-16 sm:py-20 bg-gradient-hero border-b border-slate-200 dark:border-slate-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-center">
          <span className="px-3.5 py-1 text-xs font-black rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-400 border border-primary-500/20 uppercase tracking-wider">
            RoleRadar Intelligence
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Engineering Careers & <span className="text-gradient">Market Insights</span>
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Actionable playbooks, salary benchmarks, and technological deep dives written for engineers and technical leaders.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1 w-full space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((art, idx) => (
            <article
              key={idx}
              className="p-8 rounded-3xl glass-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4 flex flex-col justify-between hover:border-primary-500/40 transition-all group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-primary-500/10 text-primary-600 dark:text-primary-400 border border-primary-500/20">
                    {art.category}
                  </span>
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {art.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {art.readTime}</span>
                  </div>
                </div>

                <h2 className="text-xl font-black text-slate-900 dark:text-white group-hover:text-primary-600 transition-colors">
                  {art.title}
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {art.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" /> {art.author}
                </span>

                <Link
                  href="/resume"
                  className="text-xs font-black text-primary-600 hover:text-primary-700 flex items-center gap-1"
                >
                  <span>Match Against These Roles</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
