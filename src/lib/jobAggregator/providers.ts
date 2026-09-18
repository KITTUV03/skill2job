import { IJobProvider, JobProviderMetadata, RawJobPayload } from './types';
import { JobPortalSource, JobDomain } from '../../types';

// Helper to generate a deterministic content signature
export function generateJobSignature(title: string, company: string, location: string): string {
  const norm = `${title.toLowerCase().trim()}|${company.toLowerCase().trim()}|${location.toLowerCase().trim()}`;
  return norm.replace(/[^a-z0-9|]/g, '');
}

// 1. LinkedIn Jobs Provider
export class LinkedInJobsProvider implements IJobProvider {
  metadata: JobProviderMetadata = {
    id: 'provider-linkedin',
    name: 'LinkedIn',
    enabled: true,
    rateLimitPerMinute: 60,
    status: 'HEALTHY'
  };

  async fetchJobs(criteria?: { domain?: string; query?: string; limit?: number }): Promise<RawJobPayload[]> {
    const timestamp = new Date().toISOString();
    return [
      {
        externalId: `li-${Date.now()}-1`,
        title: 'Senior Physical Design & Timing Closure Engineer',
        company: 'NVIDIA',
        companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=60',
        location: 'Bengaluru, India / Santa Clara, CA',
        domain: 'VLSI / Semiconductor',
        employmentType: 'Full-Time',
        workMode: 'Hybrid',
        experienceLevel: '4-8 Yrs',
        salary: '₹38 - ₹55 LPA / $175k - $240k',
        skills: ['SystemVerilog', 'Synopsys ICC2', 'STA', 'Timing Closure', 'PrimeTime', 'Floorplanning'],
        description: 'Drive high-frequency timing closure and physical design tapeout for NVIDIA next-gen Blackwell GPU architecture.',
        responsibilities: ['Netlist-to-GDSII physical implementation', 'Execute STA using PrimeTime', 'Fix DRC/LVS violations using Calibre'],
        benefits: ['Stock Options', 'Comprehensive Medical', 'Relocation Support'],
        sourcePortal: 'LinkedIn',
        applicationUrl: 'https://www.linkedin.com/jobs/search/?keywords=NVIDIA%20Physical%20Design',
        postedDate: timestamp
      },
      {
        externalId: `li-${Date.now()}-2`,
        title: 'Staff Full Stack Platform Engineer',
        company: 'Stripe',
        companyLogo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=120&auto=format&fit=crop&q=60',
        location: 'San Francisco, CA / Remote',
        domain: 'Software Engineering',
        employmentType: 'Full-Time',
        workMode: 'Remote',
        experienceLevel: '5+ Yrs',
        salary: '$190,000 - $265,000',
        skills: ['TypeScript', 'React', 'Node.js', 'Go', 'PostgreSQL', 'Microservices'],
        description: 'Architect distributed payment infrastructure handling high transaction volumes with zero downtime.',
        responsibilities: ['Build robust microservice APIs', 'Enhance developer tooling', 'Optimize database queries and latency'],
        benefits: ['Equity Grants', 'Unlimited PTO', 'Home Office Stipend'],
        sourcePortal: 'LinkedIn',
        applicationUrl: 'https://www.linkedin.com/jobs/search/?keywords=Stripe%20Full%20Stack',
        postedDate: timestamp
      }
    ];
  }

  async verifyHealth(): Promise<boolean> {
    return true;
  }
}

// 2. Indeed Provider
export class IndeedJobsProvider implements IJobProvider {
  metadata: JobProviderMetadata = {
    id: 'provider-indeed',
    name: 'Indeed',
    enabled: true,
    rateLimitPerMinute: 80,
    status: 'HEALTHY'
  };

  async fetchJobs(): Promise<RawJobPayload[]> {
    const timestamp = new Date().toISOString();
    return [
      {
        externalId: `ind-${Date.now()}-1`,
        title: 'Staff AI / Machine Learning Training Systems Lead',
        company: 'Meta AI',
        companyLogo: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=120&auto=format&fit=crop&q=60',
        location: 'Menlo Park, CA / Remote',
        domain: 'AI / Machine Learning',
        employmentType: 'Full-Time',
        workMode: 'Remote',
        experienceLevel: '5+ Yrs',
        salary: '$210,000 - $305,000',
        skills: ['PyTorch', 'CUDA', 'Distributed Systems', 'Python', 'vLLM'],
        description: 'Lead GPU cluster optimization, PyTorch 2.x compile graphs, and large-scale model training infrastructure.',
        responsibilities: ['Scale multi-node GPU clusters', 'Optimize memory bandwidth', 'Deploy low-latency inference endpoints'],
        benefits: ['Competitive Equity', 'Health & Dental', 'Wellness Stipend'],
        sourcePortal: 'Indeed',
        applicationUrl: 'https://www.indeed.com/jobs?q=Meta%20AI%20Systems%20Engineer',
        postedDate: timestamp
      }
    ];
  }

  async verifyHealth(): Promise<boolean> {
    return true;
  }
}

// 3. Naukri Provider
export class NaukriJobsProvider implements IJobProvider {
  metadata: JobProviderMetadata = {
    id: 'provider-naukri',
    name: 'Naukri',
    enabled: true,
    rateLimitPerMinute: 100,
    status: 'HEALTHY'
  };

  async fetchJobs(): Promise<RawJobPayload[]> {
    const timestamp = new Date().toISOString();
    return [
      {
        externalId: `nk-${Date.now()}-1`,
        title: 'Staff ASIC Verification Lead (SystemVerilog / UVM)',
        company: 'Qualcomm',
        companyLogo: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=120&auto=format&fit=crop&q=60',
        location: 'Hyderabad / Bengaluru, India',
        domain: 'VLSI / Semiconductor',
        employmentType: 'Full-Time',
        workMode: 'Hybrid',
        experienceLevel: '5-9 Yrs',
        salary: '₹34 - ₹48 LPA',
        skills: ['SystemVerilog', 'UVM', 'PCIe', 'AXI', 'Covergroups', 'SVA'],
        description: 'Architect scalable UVM verification testbenches, assertions, and constrained random tests for Snapdragon SoCs.',
        responsibilities: ['Develop coverage-driven test plans', 'Debug simulation mismatches', 'Collaborate on tapeout signoff'],
        benefits: ['Annual Performance Bonus', 'Medical Insurance', 'Learning Budget'],
        sourcePortal: 'Naukri',
        applicationUrl: 'https://www.naukri.com/qualcomm-verification-jobs',
        postedDate: timestamp
      }
    ];
  }

  async verifyHealth(): Promise<boolean> {
    return true;
  }
}

// 4. Wellfound Provider
export class WellfoundJobsProvider implements IJobProvider {
  metadata: JobProviderMetadata = {
    id: 'provider-wellfound',
    name: 'Wellfound',
    enabled: true,
    rateLimitPerMinute: 45,
    status: 'HEALTHY'
  };

  async fetchJobs(): Promise<RawJobPayload[]> {
    const timestamp = new Date().toISOString();
    return [
      {
        externalId: `wf-${Date.now()}-1`,
        title: 'Staff LLM Alignment & AI Research Engineer',
        company: 'OpenAI',
        companyLogo: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=120&auto=format&fit=crop&q=60',
        location: 'San Francisco, CA / Remote',
        domain: 'AI / Machine Learning',
        employmentType: 'Full-Time',
        workMode: 'Remote',
        experienceLevel: '4+ Yrs',
        salary: '$240,000 - $340,000 + Equity',
        skills: ['PyTorch', 'Transformers', 'CUDA', 'RLHF', 'Fine-Tuning', 'Python'],
        description: 'Design and execute post-training alignment algorithms (RLHF, DPO) and scaling evaluations on frontier intelligence models.',
        responsibilities: ['Architect RLHF pipelines', 'Evaluate model safety and reasoning benchmarks', 'Optimize inference runtime'],
        benefits: ['Generous Equity', 'Complete Healthcare', 'Unlimited Vacation'],
        sourcePortal: 'Wellfound',
        applicationUrl: 'https://wellfound.com/jobs?q=OpenAI%20Research',
        postedDate: timestamp
      }
    ];
  }

  async verifyHealth(): Promise<boolean> {
    return true;
  }
}

// 5. Glassdoor Provider
export class GlassdoorJobsProvider implements IJobProvider {
  metadata: JobProviderMetadata = {
    id: 'provider-glassdoor',
    name: 'Glassdoor',
    enabled: true,
    rateLimitPerMinute: 50,
    status: 'HEALTHY'
  };

  async fetchJobs(): Promise<RawJobPayload[]> {
    const timestamp = new Date().toISOString();
    return [
      {
        externalId: `gd-${Date.now()}-1`,
        title: 'Senior RTL & Power Integrity Architect',
        company: 'Intel Corporation',
        companyLogo: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=120&auto=format&fit=crop&q=60',
        location: 'Bengaluru, India / Hillsboro, OR',
        domain: 'VLSI / Semiconductor',
        employmentType: 'Full-Time',
        workMode: 'Hybrid',
        experienceLevel: '3-7 Yrs',
        salary: '₹30 - ₹45 LPA / $150k - $205k',
        skills: ['Verilog', 'SystemVerilog', 'RTL', 'UPF', 'Low Power', 'STA'],
        description: 'Architect synthesizable low-power execution units and multi-die chiplet interconnect timing for Xeon data center products.',
        responsibilities: ['RTL coding in SystemVerilog', 'UPF power intent verification', 'CDC and lint signoff with Spyglass'],
        benefits: ['401(k) Matching', 'Employee Stock Purchase Plan', 'Tuition Assistance'],
        sourcePortal: 'Glassdoor',
        applicationUrl: 'https://www.glassdoor.com/Job/jobs.htm?sc.keyword=Intel%20RTL',
        postedDate: timestamp
      }
    ];
  }

  async verifyHealth(): Promise<boolean> {
    return true;
  }
}

// 6. Foundit Provider
export class FounditJobsProvider implements IJobProvider {
  metadata: JobProviderMetadata = {
    id: 'provider-foundit',
    name: 'Foundit',
    enabled: true,
    rateLimitPerMinute: 60,
    status: 'HEALTHY'
  };

  async fetchJobs(): Promise<RawJobPayload[]> {
    const timestamp = new Date().toISOString();
    return [
      {
        externalId: `fd-${Date.now()}-1`,
        title: 'EDA Verification Solutions Consultant (VCS / PrimeTime)',
        company: 'Synopsys',
        companyLogo: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=120&auto=format&fit=crop&q=60',
        location: 'Noida / Bengaluru, India',
        domain: 'VLSI / Semiconductor',
        employmentType: 'Full-Time',
        workMode: 'Hybrid',
        experienceLevel: '4-8 Yrs',
        salary: '₹28 - ₹42 LPA',
        skills: ['SystemVerilog', 'UVM', 'PrimeTime', 'Tcl', 'Perl', 'Formal Verification'],
        description: 'Partner with Tier-1 semiconductor clients to accelerate simulation throughput, coverage closure, and PrimeTime timing ECOs.',
        responsibilities: ['Simulation debugging with VCS', 'Automate timing constraints', 'Deliver customer verification training'],
        benefits: ['Comprehensive Medical Coverage', 'Wellness Programs', 'Flexible Hours'],
        sourcePortal: 'Foundit',
        applicationUrl: 'https://www.foundit.in/srp/results?query=Synopsys%20Verification',
        postedDate: timestamp
      }
    ];
  }

  async verifyHealth(): Promise<boolean> {
    return true;
  }
}

// 7. Company Career Page Direct Provider
export class CompanyCareerPageProvider implements IJobProvider {
  metadata: JobProviderMetadata = {
    id: 'provider-career-pages',
    name: 'Company Career Page',
    enabled: true,
    rateLimitPerMinute: 120,
    status: 'HEALTHY'
  };

  async fetchJobs(): Promise<RawJobPayload[]> {
    const timestamp = new Date().toISOString();
    return [
      {
        externalId: `cc-${Date.now()}-1`,
        title: 'Silicon Architecture Verification Specialist (Apple Silicon M-Series)',
        company: 'Apple',
        companyLogo: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=120&auto=format&fit=crop&q=60',
        location: 'Bengaluru, India / Cupertino, CA',
        domain: 'VLSI / Semiconductor',
        employmentType: 'Full-Time',
        workMode: 'Onsite',
        experienceLevel: '4-9 Yrs',
        salary: '₹42 - ₹62 LPA / $190k - $260k',
        skills: ['SystemVerilog', 'Verilog', 'RTL', 'SVA', 'PCIe', 'AXI'],
        description: 'Drive pre-silicon logic validation, cache coherency, and formal assertion coverage on next-gen Apple Silicon custom CPU/GPU cores.',
        responsibilities: ['Define verification architecture', 'Create constrained random sequences', 'Perform silicon bring-up triage'],
        benefits: ['Apple Employee Discount', 'Health and Wellness Coverage', 'Relocation Assistance'],
        sourcePortal: 'Company Career Page',
        applicationUrl: 'https://www.google.com/search?q=Apple+Silicon+Architecture+careers',
        postedDate: timestamp
      },
      {
        externalId: `cc-${Date.now()}-2`,
        title: 'Senior Autopilot Firmware & Real-Time RTOS Engineer',
        company: 'Tesla',
        companyLogo: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=120&auto=format&fit=crop&q=60',
        location: 'Austin, TX / Palo Alto, CA',
        domain: 'Embedded Systems',
        employmentType: 'Full-Time',
        workMode: 'Onsite',
        experienceLevel: '3-7 Yrs',
        salary: '$175,000 - $240,000',
        skills: ['Embedded C', 'RTOS', 'FreeRTOS', 'ARM Cortex-M', 'CAN', 'CAN-FD'],
        description: 'Develop safety-critical RTOS kernel drivers, CAN-FD bus telemetry, and low-latency camera sensor pipelines for Full Self-Driving.',
        responsibilities: ['Write bare-metal drivers', 'Verify hardware timing margins', 'Deploy automotive safety standards'],
        benefits: ['Tesla Stock Purchase', 'Comprehensive Benefits', 'Vehicle Allowance'],
        sourcePortal: 'Company Career Page',
        applicationUrl: 'https://www.google.com/search?q=Tesla+Autopilot+Firmware+careers',
        postedDate: timestamp
      }
    ];
  }

  async verifyHealth(): Promise<boolean> {
    return true;
  }
}
