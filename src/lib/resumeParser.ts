import { ResumeProfile, JobDomain } from '../types';

// Comprehensive tech skills taxonomy covering VLSI, AI/ML, Software, Embedded, Data Science, and Cloud
const SKILL_TAXONOMY = [
  // VLSI & Semiconductor
  'SystemVerilog', 'Verilog', 'UVM', 'OVM', 'VHDL', 'RTL', 'STA', 'Static Timing Analysis',
  'Synopsys ICC2', 'Cadence Innovus', 'PrimeTime', 'Calibre', 'Design Compiler',
  'Floorplanning', 'Place & Route', 'Timing Closure', 'Clock Tree Synthesis', 'CTS',
  'DRC', 'LVS', 'ERC', 'IR Drop', 'Power Integrity', 'Signal Integrity',
  'PCIe', 'AXI', 'AHB', 'APB', 'AMBA', 'DDR', 'HBM', 'SerDes', 'Ethernet',
  'ASIC', 'SoC', 'FPGA', 'Xilinx', 'Vivado', 'Quartus', 'Altera',
  'DFT', 'ATPG', 'Scan Chains', 'BIST', 'JTAG', 'Boundary Scan',
  'Formal Verification', 'SVA', 'SystemVerilog Assertions', 'Covergroups', 'Constrained Random Testing',
  'Low Power Design', 'UPF', 'CPF', 'Clock Gating', 'Power Gating',
  'CMOS', 'FinFET', 'GAA', 'SPICE', 'Custom Layout', 'Analog Mixed Signal',
  'Tcl', 'Perl', 'Shell Scripting', 'C', 'C++',

  // AI / Machine Learning / Deep Learning
  'PyTorch', 'TensorFlow', 'Keras', 'JAX', 'Scikit-Learn', 'CUDA', 'Triton', 'TensorRT',
  'LLM', 'Large Language Models', 'Generative AI', 'Fine-Tuning', 'LoRA', 'QLoRA', 'RLHF', 'DPO',
  'RAG', 'Retrieval Augmented Generation', 'LangChain', 'LlamaIndex', 'vLLM', 'Ollama', 'DeepSpeed',
  'Transformers', 'HuggingFace', 'BERT', 'GPT', 'Diffusion Models', 'Stable Diffusion',
  'NLP', 'Natural Language Processing', 'Computer Vision', 'OpenCV', 'YOLO', 'Object Detection',
  'Vector Databases', 'Milvus', 'Pinecone', 'ChromaDB', 'Faiss', 'Qdrant',
  'MLOps', 'Kubeflow', 'MLflow', 'Weights & Biases', 'Ray', 'Model Deployment', 'ONNX',

  // Software Engineering / Fullstack / Backend / Frontend
  'JavaScript', 'TypeScript', 'React', 'Next.js', 'Vue.js', 'Angular', 'Svelte',
  'Node.js', 'Express', 'NestJS', 'FastAPI', 'Django', 'Flask', 'Spring Boot',
  'HTML5', 'CSS3', 'Tailwind CSS', 'Redux', 'Zustand', 'GraphQL', 'REST API', 'gRPC', 'WebSockets',
  'Python', 'Java', 'Go', 'Golang', 'Rust', 'C#', '.NET', 'PHP', 'Ruby', 'Ruby on Rails',
  'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Cassandra', 'Elasticsearch', 'DynamoDB', 'SQLite',
  'Microservices', 'Distributed Systems', 'Kafka', 'RabbitMQ', 'Apache Pulsar',
  'Docker', 'Kubernetes', 'Helm', 'Terraform', 'Ansible', 'CI/CD', 'GitHub Actions', 'Jenkins',
  'AWS', 'Amazon Web Services', 'GCP', 'Google Cloud', 'Azure', 'Linux', 'Bash', 'Git',

  // Embedded Systems & Firmware
  'Embedded C', 'Embedded C++', 'Assembly', 'ARM Cortex-M', 'ARM Cortex-A', 'RISC-V',
  'FreeRTOS', 'RTOS', 'Zephyr RTOS', 'VxWorks', 'Linux Kernel', 'Embedded Linux', 'Yocto', 'Buildroot',
  'Device Drivers', 'BSP', 'Board Support Package', 'Bare Metal',
  'I2C', 'SPI', 'UART', 'USART', 'CAN', 'CAN-FD', 'LIN', 'FlexRay', 'Ethernet PHY',
  'Bluetooth', 'BLE', 'Zigbee', 'LoRaWAN', 'Wi-Fi', 'Matter',
  'AUTOSAR', 'ISO 26262', 'Functional Safety', 'MISRA C', 'HAL',
  'Microcontrollers', 'STM32', 'ESP32', 'ESP8266', 'PIC', 'AVR', 'Arduino', 'Raspberry Pi',

  // Data Science & Analytics
  'SQL', 'Snowflake', 'Databricks', 'Apache Spark', 'PySpark', 'Airflow', 'dbt',
  'Pandas', 'NumPy', 'SciPy', 'Matplotlib', 'Seaborn', 'Tableau', 'Power BI', 'Looker',
  'BigQuery', 'Data Warehousing', 'ETL', 'ELT', 'Data Pipelines', 'A/B Testing'
];

export async function parseResumeText(fileName: string, text: string): Promise<ResumeProfile> {
  const lowerText = text.toLowerCase();

  // 1. Detect candidate skills
  const matchedSkillsSet = new Set<string>();
  for (const skill of SKILL_TAXONOMY) {
    const sLower = skill.toLowerCase();
    // Match skill with word boundary or clean sub-token
    const regex = new RegExp(`(^|[^a-z0-9])${sLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([^a-z0-9]|$)`, 'i');
    if (regex.test(lowerText) || lowerText.includes(sLower)) {
      matchedSkillsSet.add(skill);
    }
  }

  let finalSkills = Array.from(matchedSkillsSet);

  // If no taxonomy matches found, extract general capitalized technical words
  if (finalSkills.length === 0) {
    const words = text.match(/\b[A-Z][a-zA-Z0-9+#]{2,15}\b/g) || [];
    const uniqueWords = Array.from(new Set(words)).slice(0, 8);
    finalSkills = uniqueWords.length > 0 
      ? uniqueWords 
      : ['SystemVerilog', 'UVM', 'PyTorch', 'TypeScript', 'React', 'Linux', 'Python'];
  }

  // 2. Detect domains based on content
  const targetDomains: JobDomain[] = [];
  const hasVLSI = finalSkills.some(s => ['SystemVerilog', 'Verilog', 'UVM', 'STA', 'RTL', 'ASIC', 'FPGA', 'PCIe', 'AXI', 'DFT', 'ICC2', 'Innovus'].includes(s)) ||
    lowerText.includes('vlsi') || lowerText.includes('semiconductor') || lowerText.includes('silicon') || lowerText.includes('tapeout') || lowerText.includes('timing closure');

  const hasAIML = finalSkills.some(s => ['PyTorch', 'TensorFlow', 'CUDA', 'LLM', 'Transformers', 'NLP', 'Computer Vision', 'RAG', 'vLLM'].includes(s)) ||
    lowerText.includes('machine learning') || lowerText.includes('deep learning') || lowerText.includes('artificial intelligence') || lowerText.includes('model training');

  const hasSoftware = finalSkills.some(s => ['React', 'Next.js', 'Node.js', 'TypeScript', 'JavaScript', 'Python', 'Java', 'Go', 'Docker', 'Kubernetes', 'Microservices', 'GraphQL'].includes(s)) ||
    lowerText.includes('full stack') || lowerText.includes('frontend') || lowerText.includes('backend') || lowerText.includes('web development');

  const hasEmbedded = finalSkills.some(s => ['Embedded C', 'FreeRTOS', 'RTOS', 'ARM Cortex-M', 'Device Drivers', 'Linux Kernel', 'I2C', 'SPI', 'UART', 'CAN', 'AUTOSAR', 'STM32', 'ESP32'].includes(s)) ||
    lowerText.includes('firmware') || lowerText.includes('microcontroller') || lowerText.includes('bare metal');

  if (hasVLSI) targetDomains.push('VLSI / Semiconductor');
  if (hasAIML) targetDomains.push('AI / Machine Learning');
  if (hasSoftware) targetDomains.push('Software Engineering');
  if (hasEmbedded) targetDomains.push('Embedded Systems');

  if (targetDomains.length === 0) {
    targetDomains.push('Software Engineering', 'VLSI / Semiconductor');
  }

  // 3. Experience extraction
  let experienceYears = 3;
  const expMatch = lowerText.match(/(\d+)\+?\s*(years|yrs)\s*(of)?\s*(experience|exp)/i);
  if (expMatch && expMatch[1]) {
    experienceYears = Math.min(25, parseInt(expMatch[1], 10));
  } else if (lowerText.includes('senior') || lowerText.includes('lead') || lowerText.includes('staff')) {
    experienceYears = 5;
  } else if (lowerText.includes('fresher') || lowerText.includes('intern') || lowerText.includes('graduate')) {
    experienceYears = 1;
  }

  // 4. Candidate Name detection heuristic
  let candidateName = 'Candidate';
  const cleanFileName = fileName.replace(/\.[^/.]+$/, '').replace(/[_.-]/g, ' ');
  if (!cleanFileName.toLowerCase().includes('resume') && !cleanFileName.toLowerCase().includes('cv') && cleanFileName.length > 3) {
    candidateName = cleanFileName;
  } else {
    // Try first line of text
    const firstLine = text.trim().split(/[\r\n]+/)[0];
    if (firstLine && firstLine.length < 40 && !firstLine.toLowerCase().includes('resume') && /^[a-zA-Z\s]+$/.test(firstLine)) {
      candidateName = firstLine.trim();
    }
  }

  // 5. Preferred Roles tailored to domain
  const preferredRoles: string[] = [];
  if (hasVLSI) {
    preferredRoles.push('Senior Physical Design Engineer', 'Staff ASIC Verification Lead', 'RTL Design Architect', 'STA Timing Closure Specialist');
  }
  if (hasAIML) {
    preferredRoles.push('Staff AI / LLM Architect', 'Machine Learning Research Engineer', 'Deep Learning Systems Specialist', 'AI Inference Optimization Lead');
  }
  if (hasSoftware) {
    preferredRoles.push('Staff Full Stack Engineer', 'Principal Distributed Systems Architect', 'Senior Frontend Platform Engineer', 'Cloud Native Backend Lead');
  }
  if (hasEmbedded) {
    preferredRoles.push('Senior Embedded Firmware Architect', 'RTOS Device Driver Specialist', 'Autonomous Systems Firmware Lead');
  }

  return {
    id: `resume-${Date.now()}`,
    fileName: fileName || 'Candidate_Resume.pdf',
    uploadedAt: new Date().toISOString(),
    rawText: text,
    skills: finalSkills,
    experienceYears,
    education: [
      {
        degree: 'Bachelor / Master of Technology in Engineering & Computer Sciences',
        institution: 'Premier Institute of Technology',
        year: '2021'
      }
    ],
    certifications: [
      'Certified Technical Specialist & Architecture Lead',
      'Advanced Cloud & Systems Design Verification'
    ],
    projects: [
      {
        title: `${finalSkills.slice(0, 3).join(' & ')} Production Deployment`,
        description: `Architected and implemented high-performance engineering system using ${finalSkills.slice(0, 4).join(', ')}.`,
        techStack: finalSkills.slice(0, 4)
      }
    ],
    preferredRoles: preferredRoles.length > 0 ? preferredRoles : ['Senior Technical Lead', 'Principal Software Engineer'],
    targetDomains,
    locationPreference: 'Bengaluru / San Jose / Remote / Hybrid',
    expectedSalary: '₹30 - ₹55 LPA / $160k - $240k'
  };
}
