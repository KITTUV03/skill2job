import { Job } from '../types';

export const INITIAL_JOBS: Job[] = [
  // VLSI & Semiconductor
  {
    id: 'job-vlsi-01',
    title: 'Senior Physical Design Engineer',
    company: 'NVIDIA',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=60',
    location: 'Bengaluru, India / San Jose, CA',
    domain: 'VLSI / Semiconductor',
    employmentType: 'Full-Time',
    workMode: 'Hybrid',
    experienceLevel: '4-7 Yrs',
    salary: '₹32 - ₹48 LPA / $150k - $210k',
    skills: ['Verilog', 'Synopsys ICC2', 'Cadence Innovus', 'STA', 'Timing Closure', 'SystemVerilog', 'Floorplanning'],
    description: 'We are seeking a Senior Physical Design Engineer to lead sub-system floorplanning, place & route, timing closure, and physical verification for next-generation AI GPU architecture chips on 3nm/5nm processes.',
    responsibilities: [
      'Lead netlist-to-GDSII implementation including floorplanning, power grid synthesis, placement, CTS, routing, and IR-drop analysis.',
      'Work closely with logic design teams for timing closure, power optimization, and formal verification.',
      'Perform STA using Primetime and execute DRC/LVS/ERC fixes using Calibre.'
    ],
    benefits: ['ESOPs & Stock Grants', 'Health & Dental Coverage', 'Flexible Work Schedule', 'Relocation Assistance'],
    sourcePortal: 'LinkedIn',
    applicationUrl: 'https://linkedin.com/jobs/nvidia-pd-eng',
    postedDate: '2026-09-18T08:00:00Z',
    lastUpdated: '2026-09-18T18:30:00Z',
    isActive: true,
    isNew: true
  },
  {
    id: 'job-vlsi-02',
    title: 'Design Verification Lead (UVM / SystemVerilog)',
    company: 'Qualcomm',
    logo: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=120&auto=format&fit=crop&q=60',
    location: 'Hyderabad, India',
    domain: 'VLSI / Semiconductor',
    employmentType: 'Full-Time',
    workMode: 'Onsite',
    experienceLevel: '5-9 Yrs',
    salary: '₹28 - ₹42 LPA',
    skills: ['SystemVerilog', 'UVM', 'PCIe', 'AXI', 'Covergroup', 'SVA', 'Verilog', 'C++'],
    description: 'Join Qualcomm Snapdragon SoC verification group. Build scalable UVM environments, scoreboards, and assertion packages for high-speed interconnect protocols.',
    responsibilities: [
      'Architect testbenches using SystemVerilog UVM for complex IP modules and subsystems.',
      'Develop test plans, code coverage, and functional coverage metrics.',
      'Debug RTL simulation mismatches and verify reset/low-power sequences.'
    ],
    benefits: ['Performance Bonus', 'Comprehensive Health Insurance', 'Annual Learning Allowance'],
    sourcePortal: 'Naukri',
    applicationUrl: 'https://naukri.com/qualcomm-dv-lead',
    postedDate: '2026-09-17T14:20:00Z',
    lastUpdated: '2026-09-18T12:00:00Z',
    isActive: true
  },
  {
    id: 'job-vlsi-03',
    title: 'RTL Design Engineer (SoC Architecture)',
    company: 'Intel Corporation',
    logo: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=120&auto=format&fit=crop&q=60',
    location: 'Austin, TX / Remote',
    domain: 'VLSI / Semiconductor',
    employmentType: 'Full-Time',
    workMode: 'Remote',
    experienceLevel: '2-5 Yrs',
    salary: '$135,000 - $175,000',
    skills: ['Verilog', 'SystemVerilog', 'RTL Design', 'Linting', 'Spyglass', 'Synthesis', 'RISC-V'],
    description: 'Design key execution units for Intel Xeon processors. Translate architectural specifications into clean, low-power synthesizable RTL.',
    responsibilities: [
      'Implement synthesizable Verilog/SystemVerilog logic for CPU core microarchitectures.',
      'Run linting, CDC, and low-power checks using SpyGlass and Conformal.',
      'Collaborate with DV engineers to resolve logic bugs early in the cycle.'
    ],
    benefits: ['401(k) Matching', 'Unlimited PTO', 'Wellness Stipend'],
    sourcePortal: 'Company Career Page',
    applicationUrl: 'https://intel.com/careers/rtl-engineer',
    postedDate: '2026-09-16T11:00:00Z',
    lastUpdated: '2026-09-18T09:15:00Z',
    isActive: true
  },

  // AI & Machine Learning
  {
    id: 'job-aiml-01',
    title: 'Staff AI / LLM Architect',
    company: 'OpenAI (Demo Partner)',
    logo: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=120&auto=format&fit=crop&q=60',
    location: 'San Francisco, CA / Remote',
    domain: 'AI / Machine Learning',
    employmentType: 'Full-Time',
    workMode: 'Remote',
    experienceLevel: '5+ Yrs',
    salary: '$220,000 - $310,000 + Equity',
    skills: ['PyTorch', 'Transformers', 'LLM Fine-Tuning', 'CUDA', 'Python', 'vLLM', 'LangChain', 'RAG'],
    description: 'Drive high-throughput inference optimization and custom model fine-tuning engines for enterprise generative AI workloads.',
    responsibilities: [
      'Architect RAG workflows, agentic tool pipelines, and fine-tuning pipelines using PyTorch & vLLM.',
      'Optimize GPU memory layout, FP8 quantization, and KV cache distribution.',
      'Deploy low-latency AI endpoints using TensorRT-LLM and Triton Inference Server.'
    ],
    benefits: ['Generous Stock Grants', 'Full Remote Work Setup', 'Unlimited AI Compute Budget'],
    sourcePortal: 'Wellfound',
    applicationUrl: 'https://wellfound.com/jobs/openai-llm-architect',
    postedDate: '2026-09-18T10:30:00Z',
    lastUpdated: '2026-09-18T19:00:00Z',
    isActive: true,
    isNew: true
  },
  {
    id: 'job-aiml-02',
    title: 'Senior Machine Learning Engineer (Computer Vision)',
    company: 'Tesla AI Team',
    logo: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=120&auto=format&fit=crop&q=60',
    location: 'Palo Alto, CA',
    domain: 'AI / Machine Learning',
    employmentType: 'Full-Time',
    workMode: 'Onsite',
    experienceLevel: '3-6 Yrs',
    salary: '$170,000 - $240,000',
    skills: ['PyTorch', 'C++', 'OpenCV', 'Deep Learning', 'TensorRT', 'Object Detection', 'Autonomous Driving'],
    description: 'Work on real-time neural networks for Tesla Autopilot and Optimus humanoid robot visual perception pipelines.',
    responsibilities: [
      'Develop multi-camera 3D occupancy vector networks and temporal tracking models.',
      'Profile and optimize deep neural net inference for custom FSD onboard hardware.',
      'Train models on massive petabyte-scale video streams.'
    ],
    benefits: ['Tesla Stock Plan', 'Onsite Gym & Gourmet Meals', 'Relocation Package'],
    sourcePortal: 'LinkedIn',
    applicationUrl: 'https://linkedin.com/jobs/tesla-ml-engineer',
    postedDate: '2026-09-17T09:15:00Z',
    lastUpdated: '2026-09-18T15:45:00Z',
    isActive: true
  },
  {
    id: 'job-aiml-03',
    title: 'Lead MLOps & LLM Infrastructure Engineer',
    company: 'Weights & Biases',
    logo: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=120&auto=format&fit=crop&q=60',
    location: 'London, UK / Remote',
    domain: 'AI / Machine Learning',
    employmentType: 'Full-Time',
    workMode: 'Remote',
    experienceLevel: '4+ Yrs',
    salary: '£110,000 - £150,000',
    skills: ['Kubernetes', 'Docker', 'MLflow', 'Python', 'Ray', 'AWS', 'TensorFlow', 'CI/CD'],
    description: 'Build enterprise-grade model evaluation, distributed training cluster orchestration, and LLM telemetry pipelines.',
    responsibilities: [
      'Scale Kubernetes clusters with GPU node auto-scaling for multi-node PyTorch job runs.',
      'Maintain automated data versioning, prompt evaluation, and model registry infrastructure.'
    ],
    benefits: ['Flexible Working Hours', 'Learning Budget', 'Home Office Allowance'],
    sourcePortal: 'Glassdoor',
    applicationUrl: 'https://glassdoor.com/jobs/wandb-mlops',
    postedDate: '2026-09-15T16:00:00Z',
    lastUpdated: '2026-09-17T20:00:00Z',
    isActive: true
  },

  // Software Engineering
  {
    id: 'job-swe-01',
    title: 'Senior Full Stack Engineer (Next.js / React / Node)',
    company: 'Stripe',
    logo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=120&auto=format&fit=crop&q=60',
    location: 'New York, NY / Remote',
    domain: 'Software Engineering',
    employmentType: 'Full-Time',
    workMode: 'Remote',
    experienceLevel: '3-6 Yrs',
    salary: '$160,000 - $220,000',
    skills: ['TypeScript', 'React', 'Next.js', 'Node.js', 'GraphQL', 'PostgreSQL', 'Tailwind CSS', 'Redis'],
    description: 'Architect sleek financial dashboards and global developer tools powering millions of internet businesses worldwide.',
    responsibilities: [
      'Build ultra-responsive web applications using React, Next.js App Router, and TypeScript.',
      'Design REST & GraphQL APIs backed by PostgreSQL with low-latency Redis caching.',
      'Collaborate with product designers to ship modern, accessible UI components.'
    ],
    benefits: ['Competitive Salary & Equity', 'Health & Wellness Benefit', '401(k) Match'],
    sourcePortal: 'Indeed',
    applicationUrl: 'https://indeed.com/jobs/stripe-fullstack-eng',
    postedDate: '2026-09-18T07:45:00Z',
    lastUpdated: '2026-09-18T18:00:00Z',
    isActive: true,
    isNew: true
  },
  {
    id: 'job-swe-02',
    title: 'Staff Backend Systems Engineer (Distributed Systems)',
    company: 'Uber',
    logo: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=120&auto=format&fit=crop&q=60',
    location: 'Bengaluru, India / Seattle, WA',
    domain: 'Software Engineering',
    employmentType: 'Full-Time',
    workMode: 'Hybrid',
    experienceLevel: '6-10 Yrs',
    salary: '₹45 - ₹65 LPA / $190k - $250k',
    skills: ['Go', 'Java', 'Distributed Systems', 'Kafka', 'gRPC', 'PostgreSQL', 'Microservices', 'Redis'],
    description: 'Engineers on Uber Core Mobility handle millions of concurrent ride-hailing and dispatch transactions per second with sub-100ms latency.',
    responsibilities: [
      'Design fault-tolerant Go microservices and geo-spatial indexing systems.',
      'Optimize Kafka event stream consumer performance and database transaction throughput.',
      'Participate in high-severity incident response and system reliability reviews.'
    ],
    benefits: ['Uber Credits', 'Medical & Life Insurance', 'Equity Grants'],
    sourcePortal: 'Foundit',
    applicationUrl: 'https://foundit.in/jobs/uber-staff-backend',
    postedDate: '2026-09-16T12:30:00Z',
    lastUpdated: '2026-09-18T11:00:00Z',
    isActive: true
  },
  {
    id: 'job-swe-03',
    title: 'Frontend Platform Lead (Design Systems & Web Vitals)',
    company: 'Atlassian',
    logo: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=120&auto=format&fit=crop&q=60',
    location: 'Sydney, Australia / Remote',
    domain: 'Software Engineering',
    employmentType: 'Full-Time',
    workMode: 'Remote',
    experienceLevel: '5+ Yrs',
    salary: 'A$160,000 - A$210,000',
    skills: ['React', 'TypeScript', 'Design Systems', 'Core Web Vitals', 'Webpack/Vite', 'CSS Architecture'],
    description: 'Build the foundational component library and UI infrastructure used by Jira, Confluence, and Trello frontend teams.',
    responsibilities: [
      'Own the design system library with strict WCAG AA accessibility standards.',
      'Improve core web vitals (LCP, FID, CLS) across all micro-frontends.'
    ],
    benefits: ['Work from Anywhere Policy', 'Mental Health Days', 'Parental Leave'],
    sourcePortal: 'LinkedIn',
    applicationUrl: 'https://linkedin.com/jobs/atlassian-fe-lead',
    postedDate: '2026-09-17T11:00:00Z',
    lastUpdated: '2026-09-18T14:30:00Z',
    isActive: true
  },

  // Embedded Systems & Electronics
  {
    id: 'job-emb-01',
    title: 'Senior Embedded Firmware Engineer (C/C++ & RTOS)',
    company: 'Apple (Hardware Tech)',
    logo: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=120&auto=format&fit=crop&q=60',
    location: 'Cupertino, CA',
    domain: 'Embedded Systems',
    employmentType: 'Full-Time',
    workMode: 'Onsite',
    experienceLevel: '3-7 Yrs',
    salary: '$165,000 - $225,000',
    skills: ['Embedded C', 'C++', 'FreeRTOS', 'ARM Cortex-M', 'I2C', 'SPI', 'UART', 'GDB', 'oscilloscope'],
    description: 'Develop low-power firmware for Apple Vision Pro & Watch sensor microcontrollers and wireless communication chips.',
    responsibilities: [
      'Write bare-metal and RTOS C code for ARM Cortex microcontrollers.',
      'Interface with hardware engineers to bring up new PCB revisions, analyze signals with logic analyzers.',
      'Optimize battery life and low-power sleep state transitions.'
    ],
    benefits: ['Employee Discount on Apple Products', 'Stock Purchase Plan', 'Top Tier Health Benefits'],
    sourcePortal: 'Company Career Page',
    applicationUrl: 'https://apple.com/careers/embedded-eng',
    postedDate: '2026-09-18T09:00:00Z',
    lastUpdated: '2026-09-18T17:00:00Z',
    isActive: true,
    isNew: true
  },
  {
    id: 'job-emb-02',
    title: 'Embedded Linux Driver Specialist (Kernel & Yocto)',
    company: 'Bosch Mobility',
    logo: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=120&auto=format&fit=crop&q=60',
    location: 'Stuttgart, Germany / Remote',
    domain: 'Embedded Systems',
    employmentType: 'Full-Time',
    workMode: 'Hybrid',
    experienceLevel: '4-8 Yrs',
    salary: '€75,000 - €95,000',
    skills: ['Linux Kernel', 'Device Drivers', 'C', 'Yocto', 'CAN bus', 'AUTOSAR', 'U-Boot'],
    description: 'Develop automotive Linux kernel drivers and BSP packages for Next-Gen ADAS domain controllers.',
    responsibilities: [
      'Create custom Linux kernel modules, device tree overlays, and platform drivers.',
      'Configure Yocto Project BSP layers and optimize Linux boot times under 1.5 seconds.'
    ],
    benefits: ['30 Days Paid Vacation', 'Pension Scheme', 'Transit Pass'],
    sourcePortal: 'Naukri',
    applicationUrl: 'https://naukri.com/jobs/bosch-embedded-linux',
    postedDate: '2026-09-15T10:00:00Z',
    lastUpdated: '2026-09-17T16:00:00Z',
    isActive: true
  },

  // Data Science & Analytics
  {
    id: 'job-ds-01',
    title: 'Senior Data Scientist (Predictive Analytics & Causal Inference)',
    company: 'Airbnb',
    logo: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=120&auto=format&fit=crop&q=60',
    location: 'San Francisco, CA / Remote',
    domain: 'Data Science & Analytics',
    employmentType: 'Full-Time',
    workMode: 'Remote',
    experienceLevel: '3-6 Yrs',
    salary: '$155,000 - $215,000',
    skills: ['Python', 'SQL', 'A/B Testing', 'Causal Inference', 'Scikit-Learn', 'Snowflake', 'Tableau', 'Pandas'],
    description: 'Drive host pricing recommendations, demand forecasting models, and algorithmic search ranking experiments.',
    responsibilities: [
      'Design complex randomized control trials (A/B testing) and compute uplift metrics.',
      'Build end-to-end predictive machine learning pipelines in Python and SQL on Snowflake.'
    ],
    benefits: ['Annual Travel Credit $2,000', 'Equity', 'Health Insurance'],
    sourcePortal: 'Glassdoor',
    applicationUrl: 'https://glassdoor.com/jobs/airbnb-data-scientist',
    postedDate: '2026-09-17T15:00:00Z',
    lastUpdated: '2026-09-18T10:00:00Z',
    isActive: true
  },

  // Finance & FinTech
  {
    id: 'job-fin-01',
    title: 'Quantitative Developer (High-Frequency Trading Engine)',
    company: 'Jane Street / Citadel',
    logo: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=120&auto=format&fit=crop&q=60',
    location: 'New York, NY',
    domain: 'Finance & FinTech',
    employmentType: 'Full-Time',
    workMode: 'Onsite',
    experienceLevel: '3-8 Yrs',
    salary: '$250,000 - $450,000 + Bonus',
    skills: ['C++', 'Python', 'Low Latency', 'Multithreading', 'Financial Modeling', 'OCaml', 'Linux'],
    description: 'Build ultra-low latency execution engines, market data feeds, and quantitative algorithmic strategy execution engines.',
    responsibilities: [
      'Write zero-allocation C++ memory managers and microsecond-level order routing systems.',
      'Optimize network stack interactions with kernel bypass NIC cards.'
    ],
    benefits: ['Industry Leading Discretionary Bonus', 'Free Breakfast & Lunch', 'Gym Access'],
    sourcePortal: 'LinkedIn',
    applicationUrl: 'https://linkedin.com/jobs/janestreet-quant-dev',
    postedDate: '2026-09-18T06:00:00Z',
    lastUpdated: '2026-09-18T16:20:00Z',
    isActive: true,
    isNew: true
  },

  // Electronics & Hardware
  {
    id: 'job-elec-01',
    title: 'Hardware Electronics Design Engineer (PCB & RF)',
    company: 'SpaceX (Starlink)',
    logo: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?w=120&auto=format&fit=crop&q=60',
    location: 'Hawthorne, CA',
    domain: 'Electronics & Hardware',
    employmentType: 'Full-Time',
    workMode: 'Onsite',
    experienceLevel: '3-6 Yrs',
    salary: '$140,000 - $190,000',
    skills: ['Altium Designer', 'PCB Layout', 'RF Circuits', 'Schematics', 'Signal Integrity', 'EMC/EMI testing'],
    description: 'Design high-speed multi-layer PCB boards for satellite phased-array antennas and power management modules.',
    responsibilities: [
      'Design high-density interconnect (HDI) PCBs with impedance control and thermal considerations.',
      'Execute chamber EMI/EMC compliance testing and root-cause signal integrity issues.'
    ],
    benefits: ['Stock Options', '401(k)', 'Comprehensive Medical'],
    sourcePortal: 'Indeed',
    applicationUrl: 'https://indeed.com/jobs/spacex-pcb-engineer',
    postedDate: '2026-09-16T14:00:00Z',
    lastUpdated: '2026-09-18T08:00:00Z',
    isActive: true
  },

  // Marketing & Growth
  {
    id: 'job-mkt-01',
    title: 'Head of Product Marketing & AI Growth',
    company: 'Notion',
    logo: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=120&auto=format&fit=crop&q=60',
    location: 'San Francisco, CA / Remote',
    domain: 'Marketing & Growth',
    employmentType: 'Full-Time',
    workMode: 'Remote',
    experienceLevel: '5+ Yrs',
    salary: '$175,000 - $230,000',
    skills: ['Product Marketing', 'Growth Analytics', 'SEO', 'Go-To-Market Strategy', 'Funnel Optimization', 'Copywriting'],
    description: 'Lead positioning, developer messaging, and product launch campaigns for Notion AI workspace tools.',
    responsibilities: [
      'Craft compelling value propositions and interactive product visual walk-throughs.',
      'Analyze acquisition funnels, retention cohorts, and organic search growth.'
    ],
    benefits: ['Equity Options', 'Wellness Allowance', 'Unlimited Workspace Budget'],
    sourcePortal: 'Wellfound',
    applicationUrl: 'https://wellfound.com/jobs/notion-head-pmm',
    postedDate: '2026-09-17T18:00:00Z',
    lastUpdated: '2026-09-18T13:00:00Z',
    isActive: true
  }
];
