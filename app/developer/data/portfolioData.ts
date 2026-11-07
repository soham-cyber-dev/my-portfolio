export interface ProjectData {
  id: string;
  code: string;
  title: string;
  category: string;
  subtitle: string;
  description: string;
  features: string[];
  tags: string[];
  github: string;
  demoUrl?: string;
}

export interface ClientData {
  id: string;
  number: string;
  title: string;
  category: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  website: string;
  websiteUrl: string;
  image: string;
}

export interface SkillGroup {
  domain: string;
  code: string;
  level: number; // 0-100
  items: string[];
}

export const PORTFOLIO_DATA = {
  identity: {
    systemName: "SB-87 // ARCHIVAL WORKSTATION",
    serialNumber: "SN-1987-SB-2026",
    firmware: "v4.87.2-ANALOG",
    operator: "SOHAM BHUNIYA",
    title: "Full-Stack Software Developer & CSE Student",
    location: "Kolkata, West Bengal, India",
    coordinates: "22.5726° N, 88.3639° E",
    education: {
      degree: "B.Tech in Computer Science & Engineering",
      institution: "University of Engineering & Management (UEM), Kolkata",
      gradYear: "Class of 2026",
      status: "Final Phase Engineering",
    },
    leadership: {
      role: "Tech Lead",
      organization: "Google Developer Groups (GDG), UEM Kolkata",
      duties: "Leading tech workshops, architecture sessions, and community dev initiatives.",
    },
    philosophy:
      "Where engineering and creativity come together — that is where the interesting work happens. From normalized database schemas to fluid user interfaces, I prioritize clean architecture, performance, and maintainable software design.",
    bio: "Computer Science Engineering student and full-stack software developer based in Kolkata, India. Focusing on building robust web architectures, distributed APIs, and fluid, motion-rich frontend interfaces.",
    portrait: "/soham-portrait.jpg",
  },

  skills: [
    {
      domain: "FRONTEND ARCHITECTURE",
      code: "MOD-FE",
      level: 92,
      items: ["React", "Next.js (App Router)", "TypeScript", "JavaScript (ES6+)", "Tailwind CSS", "GSAP Animations", "HTML5 Canvas / WebGL"],
    },
    {
      domain: "BACKEND & DISTRIBUTED APIS",
      code: "MOD-BE",
      level: 88,
      items: ["Node.js", "Express.js", "RESTful Architecture", "JWT Route Security", "Microservices", "API Rate Limiting"],
    },
    {
      domain: "DATABASE & PERSISTENCE",
      code: "MOD-DB",
      level: 84,
      items: ["PostgreSQL", "MongoDB", "Mongoose", "Database Indexing", "Normalized Schemas", "Query Optimization"],
    },
    {
      domain: "SYSTEMS, CLOUD & DEVOPS",
      code: "MOD-SYS",
      level: 80,
      items: ["Docker Containers", "AWS Cloud Services", "Git / GitHub Versioning", "Linux / POSIX Shell", "Vercel Edge Deployments"],
    },
  ] as SkillGroup[],

  projects: [
    {
      id: "fullstack-app",
      code: "PRJ-01",
      title: "Full-Stack Web App",
      category: "Full-Stack Platform",
      subtitle: "End-to-End Architecture & REST API",
      description:
        "A responsive full-stack platform featuring robust JWT authentication, Express microservices, and MongoDB data persistence.",
      features: [
        "Token-based authentication & route security",
        "Normalized MongoDB schemas with indexing",
        "RESTful API endpoints with input validation",
        "Optimistic UI updates with Tailwind CSS",
      ],
      tags: ["React", "Node.js", "Express", "MongoDB", "REST API", "JWT"],
      github: "https://github.com/soham-cyber-dev/fullstack-app.git",
      demoUrl: "https://github.com/soham-cyber-dev/fullstack-app.git",
    },
    {
      id: "movie-discovery",
      code: "PRJ-02",
      title: "Movie Discovery",
      category: "Entertainment Platform",
      subtitle: "Cinematic Media Streaming",
      description:
        "An interactive movie browsing application with debounced search indexing, real-time TMDB API integration, and responsive media grids.",
      features: [
        "Real-time TMDB API integration with debounced search",
        "Genre filters & curated trending collections",
        "Fluid responsive layout with skeleton loaders",
        "Interactive details modal with high-res media",
      ],
      tags: ["React", "JavaScript", "TMDB API", "CSS3", "REST"],
      github: "https://github.com/soham-cyber-dev/Movie-Website.git",
      demoUrl: "https://github.com/soham-cyber-dev/Movie-Website.git",
    },
    {
      id: "nexus-ai-outreach",
      code: "PRJ-03",
      title: "Nexus AI Outreach Engine",
      category: "AI & Automation Engine",
      subtitle: "Autonomous Lead Pipeline",
      description:
        "An automated workflow engine that transforms raw prospect data into hyper-personalized email outreach at scale.",
      features: [
        "Automated lead data enrichment & parsing",
        "LLM prompt chaining for personalized email generation",
        "Tone customization and deliverability heuristics",
        "Pipeline status tracking & conversion analytics",
      ],
      tags: ["Next.js", "TypeScript", "LLM Pipeline", "Node.js", "Automation"],
      github: "https://github.com/soham-cyber-dev/nexus-outreach-engine",
      demoUrl: "https://github.com/soham-cyber-dev/nexus-outreach-engine",
    },
  ] as ProjectData[],

  clients: [
    {
      id: "motion-media-circle",
      number: "01",
      title: "The Motion Media Circle",
      category: "DIGITAL PRODUCTION",
      subtitle: "High-End Media Production Studio",
      description:
        "A high-impact digital platform engineered for a premier creative production studio. Features responsive full-viewport video showcases, fluid transitions, and optimized high-definition streaming across devices.",
      deliverables: [
        "Custom Digital Agency Experience",
        "High-Definition Video Streaming Showcase",
        "Responsive Fluid Grid Architecture",
        "60fps Mobile Interaction System",
      ],
      website: "motionmediacircle.com",
      websiteUrl: "https://motionmediacircle.com",
      image: "/client-logos/motion-media-circle.svg",
    },
    {
      id: "prime-avenues",
      number: "02",
      title: "The Prime Avenues",
      category: "AI WORKFLOW PLATFORM",
      subtitle: "Real Estate & Digital Workflow Intelligence",
      description:
        "Modern full-stack web application combined with automated AI intelligence workflows. Engineered for real estate lead generation, automated property indexing, and instant prospect follow-up pipelines.",
      deliverables: [
        "Full-Stack Web Architecture",
        "Autonomous Lead Enrichment Engine",
        "Dynamic Property Catalog & Filtering",
        "Automated Email & Outreach Integration",
      ],
      website: "theprimeavenues.com",
      websiteUrl: "https://theprimeavenues.com",
      image: "/client-logos/the-prime-avenues.jpeg",
    },
    {
      id: "social-a-fair",
      number: "03",
      title: "Social A Fair",
      category: "INFRASTRUCTURE & RELIABILITY",
      subtitle: "Digital Infrastructure & Reliability",
      description:
        "Groundwork technical infrastructure and ongoing website reliability engineering for a premier event agency. Delivers zero-downtime reliability, server speed optimizations, and security monitoring during peak marketing traffic.",
      deliverables: [
        "Continuous Server & Performance Audits",
        "Zero-Downtime Event Ticket Groundwork",
        "Database Optimization & Caching",
        "24/7 Technical Reliability & Security",
      ],
      website: "socialafair.com",
      websiteUrl: "https://socialafair.com",
      image: "/client-logos/social-a-fair.png",
    },
    {
      id: "tilak-ranjan-dhali",
      number: "04",
      title: "Tilak Ranjan Dhali",
      category: "BESPOKE ARCHITECTURE",
      subtitle: "Executive Editorial Web Presence",
      description:
        "A custom-crafted editorial digital portfolio built for distinguished executive leadership and architectural presentation. Emphasizes typography, negative space, and smooth interactive galleries.",
      deliverables: [
        "Bespoke Editorial Web Architecture",
        "Custom Dark/Light Contrast System",
        "Interactive Project Gallery",
        "Performance-Tuned Global Hosting",
      ],
      website: "tilakranjandhali.in",
      websiteUrl: "https://tilakranjandhali.in",
      image: "/client-logos/tilak-ranjan-dhali.png",
    },
  ] as ClientData[],

  contact: {
    email: "sohambhuniyaofficial@gmail.com",
    github: "https://github.com/soham-cyber-dev",
    linkedin: "https://www.linkedin.com/in/soham-bhuniya-cyber-dev",
    instagram: "https://www.instagram.com/_its_soham_?cplk=MXRnMjUwaTIzMmFoYg%3D%3D&utm_source=qr",
  },
};

