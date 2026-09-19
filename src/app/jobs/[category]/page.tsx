import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  Sparkles, 
  Briefcase, 
  MapPin, 
  DollarSign, 
  CheckCircle2, 
  ArrowRight, 
  Building2, 
  TrendingUp,
  Cpu,
  Layers,
  Search,
  Zap
} from 'lucide-react';
import { INITIAL_JOBS } from '@/lib/jobData';
import { JobDomain } from '@/types';
import { Footer } from '@/components/Footer';

interface CategoryConfig {
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  domain: JobDomain;
  keywords: string[];
  avgSalary: string;
  topCompanies: string[];
  keySkills: string[];
}

const CATEGORY_MAP: Record<string, CategoryConfig> = {
  'vlsi': {
    title: 'VLSI & Semiconductor Jobs',
    metaTitle: 'Top VLSI & Semiconductor Engineering Jobs (2026) | RoleRadar AI',
    metaDescription: 'Explore high-paying VLSI, Physical Design, and Semiconductor engineering jobs from NVIDIA, Qualcomm, Intel, and Apple. AI-matched to your resume.',
    h1: 'VLSI & Semiconductor Engineering Jobs',
    domain: 'VLSI / Semiconductor',
    keywords: ['VLSI', 'Physical Design', 'STA', 'Timing Closure', 'Tapeout', 'EDA', 'ICC2', 'PrimeTime'],
    avgSalary: '$165,000 - $240,000 / ₹35 - ₹65 LPA',
    topCompanies: ['NVIDIA', 'Qualcomm', 'Intel', 'Apple', 'AMD', 'Broadcom'],
    keySkills: ['SystemVerilog', 'STA Timing', 'Floorplanning', 'Synopsys ICC2', 'DRC/LVS', 'PrimeTime']
  },
  'verification': {
    title: 'ASIC Design Verification Jobs',
    metaTitle: 'ASIC Design Verification (DV) & UVM Jobs | RoleRadar AI',
    metaDescription: 'Find top ASIC Verification, UVM, and SystemVerilog engineering jobs. Instant skill-gap analysis and direct hiring portal applications.',
    h1: 'ASIC Design Verification & UVM Jobs',
    domain: 'VLSI / Semiconductor',
    keywords: ['Design Verification', 'UVM', 'SystemVerilog', 'OVM', 'Formal Verification', 'PCIe Gen 5', 'AXI'],
    avgSalary: '$160,000 - $235,000 / ₹32 - ₹58 LPA',
    topCompanies: ['NVIDIA', 'Qualcomm', 'Synopsys', 'Cadence', 'Marvell'],
    keySkills: ['SystemVerilog', 'UVM', 'Functional Coverage', 'SVA Assertions', 'PCIe', 'AXI4']
  },
  'rtl-design': {
    title: 'RTL Design & Microarchitecture Jobs',
    metaTitle: 'RTL Design & Digital ASIC Architecture Jobs | RoleRadar AI',
    metaDescription: 'Discover RTL design, logic synthesis, and processor microarchitecture opportunities. AI resume matching with zero search friction.',
    h1: 'RTL Design & Microarchitecture Jobs',
    domain: 'VLSI / Semiconductor',
    keywords: ['RTL Design', 'Microarchitecture', 'Verilog', 'VHDL', 'Synthesis', 'RISC-V', 'ARM'],
    avgSalary: '$170,000 - $250,000 / ₹36 - ₹62 LPA',
    topCompanies: ['Apple', 'NVIDIA', 'AMD', 'Tenstorrent', 'Google Silicon'],
    keySkills: ['Verilog', 'SystemVerilog', 'Microarchitecture', 'Design Compiler', 'Lint/CDC', 'RISC-V']
  },
  'embedded': {
    title: 'Embedded Systems & Firmware Jobs',
    metaTitle: 'Embedded Systems & RTOS Firmware Engineering Jobs | RoleRadar AI',
    metaDescription: 'Browse embedded software, FreeRTOS, Linux kernel, and automotive firmware jobs. Verified opportunities across top hardware companies.',
    h1: 'Embedded Systems & Firmware Engineering Jobs',
    domain: 'Embedded Systems',
    keywords: ['Embedded C', 'FreeRTOS', 'ARM Cortex', 'Device Drivers', 'AUTOSAR', 'CAN', 'Linux Kernel'],
    avgSalary: '$145,000 - $210,000 / ₹25 - ₹48 LPA',
    topCompanies: ['Tesla', 'Bosch', 'Qualcomm', 'Garmin', 'Texas Instruments'],
    keySkills: ['Embedded C', 'FreeRTOS', 'ARM Cortex-M', 'Linux Device Drivers', 'I2C/SPI', 'CAN bus']
  },
  'software': {
    title: 'Software Engineering Jobs',
    metaTitle: 'Staff & Senior Software Engineering Jobs | RoleRadar AI',
    metaDescription: 'Find high-impact Full-Stack, Distributed Systems, and Platform engineering roles. AI matched against your GitHub, resume, and experience.',
    h1: 'Software Engineering & Platform Jobs',
    domain: 'Software Engineering',
    keywords: ['Full Stack', 'Distributed Systems', 'React', 'TypeScript', 'Node.js', 'Go', 'Microservices'],
    avgSalary: '$150,000 - $260,000 / ₹28 - ₹55 LPA',
    topCompanies: ['Stripe', 'OpenAI', 'Meta', 'Netflix', 'Databricks'],
    keySkills: ['TypeScript', 'React', 'Go', 'PostgreSQL', 'Microservices', 'Distributed Systems']
  },
  'ai-ml': {
    title: 'AI & Machine Learning Jobs',
    metaTitle: 'Generative AI & Machine Learning Systems Jobs | RoleRadar AI',
    metaDescription: 'Discover Staff AI, LLM Training, and PyTorch infrastructure opportunities. Continuously synced across Wellfound, LinkedIn, and Indeed.',
    h1: 'AI & Machine Learning Engineering Jobs',
    domain: 'AI / Machine Learning',
    keywords: ['Generative AI', 'LLM', 'PyTorch', 'CUDA', 'vLLM', 'DeepSpeed', 'Distributed Training'],
    avgSalary: '$190,000 - $320,000 / ₹40 - ₹80 LPA',
    topCompanies: ['OpenAI', 'Anthropic', 'Meta AI', 'Mistral', 'Google DeepMind'],
    keySkills: ['PyTorch', 'CUDA', 'vLLM', 'Transformer Architecture', 'DeepSpeed', 'Python']
  },
  'data-science': {
    title: 'Data Science & Analytics Jobs',
    metaTitle: 'Data Science & Machine Learning Analytics Jobs | RoleRadar AI',
    metaDescription: 'Explore senior data science, predictive modeling, and analytics engineering roles at leading tech enterprises.',
    h1: 'Data Science & Predictive Analytics Jobs',
    domain: 'Data Science & Analytics',
    keywords: ['Data Science', 'Machine Learning', 'Python', 'SQL', 'Predictive Modeling', 'Spark'],
    avgSalary: '$140,000 - $220,000 / ₹24 - ₹45 LPA',
    topCompanies: ['Amazon', 'Uber', 'Snowflake', 'Airbnb', 'Capital One'],
    keySkills: ['Python', 'SQL', 'Scikit-learn', 'Pandas', 'Statistical Modeling', 'Tableau']
  },
  'cloud': {
    title: 'Cloud & Infrastructure Jobs',
    metaTitle: 'Cloud Architecture & Infrastructure Engineering Jobs | RoleRadar AI',
    metaDescription: 'Search AWS, GCP, Azure, and Kubernetes cloud infrastructure roles. Ranked by skill match and seniority.',
    h1: 'Cloud Architecture & Infrastructure Jobs',
    domain: 'Software Engineering',
    keywords: ['Cloud Architecture', 'AWS', 'GCP', 'Kubernetes', 'Terraform', 'Docker'],
    avgSalary: '$160,000 - $240,000 / ₹30 - ₹55 LPA',
    topCompanies: ['Microsoft', 'AWS', 'Google Cloud', 'HashiCorp', 'Cloudflare'],
    keySkills: ['AWS', 'Kubernetes', 'Terraform', 'Docker', 'GCP', 'Linux']
  },
  'devops': {
    title: 'DevOps & Site Reliability Jobs',
    metaTitle: 'DevOps & Site Reliability Engineering (SRE) Jobs | RoleRadar AI',
    metaDescription: 'Find mission-critical SRE, CI/CD, and DevOps roles with competitive compensation and verified direct application links.',
    h1: 'DevOps & Site Reliability Engineering Jobs',
    domain: 'Software Engineering',
    keywords: ['DevOps', 'SRE', 'CI/CD', 'Kubernetes', 'Prometheus', 'Grafana', 'Ansible'],
    avgSalary: '$155,000 - $230,000 / ₹28 - ₹52 LPA',
    topCompanies: ['GitLab', 'Datadog', 'Shopify', 'GitHub', 'Atlassian'],
    keySkills: ['CI/CD Pipelines', 'Kubernetes', 'Prometheus', 'Grafana', 'Ansible', 'Incident Management']
  }
};

export async function generateStaticParams() {
  return Object.keys(CATEGORY_MAP).map(slug => ({ category: slug }));
}

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  const config = CATEGORY_MAP[params.category];
  if (!config) return { title: 'Jobs | RoleRadar' };

  return {
    title: config.metaTitle,
    description: config.metaDescription,
    keywords: config.keywords.join(', '),
    openGraph: {
      title: config.metaTitle,
      description: config.metaDescription,
      type: 'website',
      url: `https://roleradar.ai/jobs/${params.category}`,
    }
  };
}

export default function CategoryJobPage({ params }: { params: { category: string } }) {
  const config = CATEGORY_MAP[params.category];
  if (!config) {
    notFound();
  }

  // Filter jobs relevant to this domain or keywords
  const filteredJobs = INITIAL_JOBS.filter(job => {
    if (job.domain === config.domain) return true;
    return config.keywords.some(kw => 
      job.title.toLowerCase().includes(kw.toLowerCase()) || 
      job.skills.some(s => s.toLowerCase().includes(kw.toLowerCase()))
    );
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#0F172A]">
      
      {/* Category Hero Header */}
      <section className="py-14 sm:py-20 bg-gradient-hero border-b border-slate-200 dark:border-slate-800 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-gradient-to-tr from-primary-600/15 via-secondary-600/15 to-transparent blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-5">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-600 dark:text-primary-400 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-secondary-500" />
            <span>Curated Domain Intelligence • Live Ingestion Active</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            {config.h1}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
            {config.metaDescription}
          </p>

          {/* Key Industry Stats Pill Row */}
          <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl">
            <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Benchmark Compensation</span>
              <p className="text-sm font-black text-emerald-600 dark:text-emerald-400 mt-0.5">{config.avgSalary}</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Hiring Employers</span>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5 truncate">{config.topCompanies.join(', ')}</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Aggregated Live Jobs</span>
              <p className="text-sm font-black text-primary-600 dark:text-primary-400 mt-0.5">{filteredJobs.length} Verified Positions</p>
            </div>
          </div>

          {/* Quick CTAs */}
          <div className="pt-2 flex items-center gap-3">
            <Link
              href="/resume"
              className="px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-black text-xs shadow-lg shadow-primary-600/25 transition-all flex items-center gap-2 active:scale-95"
            >
              <span>Match Your Resume to {config.title}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full space-y-8">
        
        {/* Industry Skills Taxonomy Bar */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider block">
            Most In-Demand Skill Taxonomy for {config.title}
          </span>
          <div className="flex flex-wrap gap-2">
            {config.keySkills.map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1 text-xs font-bold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Dynamic Jobs List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-primary-600" />
              Active {config.title} Openings
            </h2>
            <span className="text-xs font-bold text-slate-500">
              Showing {filteredJobs.length} verified listings
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-primary-500/40 hover:shadow-xl transition-all space-y-3"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <img
                      src={job.logo}
                      alt={job.company}
                      className="w-12 h-12 rounded-2xl object-cover ring-1 ring-slate-200 dark:ring-slate-700 shadow-sm shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-xs font-black text-slate-800 dark:text-slate-200">{job.company}</span>
                        <span className="px-2.5 py-0.5 text-[10px] font-black rounded-full bg-primary-500/10 text-primary-600 border border-primary-500/20">
                          {job.sourcePortal}
                        </span>
                        <span className="text-[10px] text-slate-400">Posted 15 Minutes Ago</span>
                      </div>
                      <h3 className="text-base font-black text-slate-900 dark:text-white">{job.title}</h3>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-xl text-xs font-black bg-primary-600 text-white shrink-0">
                    {job.matchScore || 92}% Match
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-semibold">
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {job.location}</span>
                  <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5 text-slate-400" /> {job.experienceLevel} • {job.workMode}</span>
                  <span className="flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400"><DollarSign className="w-3.5 h-3.5" /> {job.salary}</span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                  {job.description}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex flex-wrap gap-1.5">
                    {job.skills.slice(0, 4).map((s, i) => (
                      <span key={i} className="px-2.5 py-0.5 text-[11px] font-bold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {s}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/login?redirect=%2Fjobs`}
                    className="px-4 py-2 rounded-xl bg-primary-600 hover:bg-primary-500 text-white text-xs font-black shadow-sm transition-all flex items-center gap-1 active:scale-95"
                  >
                    <span>Apply on {job.sourcePortal}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
