# Soham Bhuniya — Portfolio & Digital Experience

> **Full-Stack Software Developer & Systems Architect**  
> *CSE Student · Tech Lead @ Google Developer Groups, UEM Kolkata · Kolkata, India*

[![Next.js](https://img.shields.io/badge/Next.js-16.3.7-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.8-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?style=for-the-badge&logo=three.js)](https://threejs.org/)
[![GSAP](https://img.shields.io/badge/GSAP-ScrollTrigger-green?style=for-the-badge&logo=greensock)](https://greensock.com/)
[![Lenis](https://img.shields.io/badge/Lenis-Smooth_Scroll-black?style=for-the-badge)](https://lenis.darkroom.engineering/)

---

## 🌟 The Dual-Mode Architectural Vision

This portfolio is engineered around two distinct perspectives:

```
┌────────────────────────────────────────────────────────┐
│               SOHAM BHUNIYA PORTFOLIO                  │
├──────────────────────────┬─────────────────────────────┤
│   🎨 CREATIVE MODE (/)   │  ⚡ DEVELOPER MODE (/developer)
│                          │                             │
│ • 3D WebGL Character     │ • Minimalist CLI Terminal   │
│ • Feathered Spotlight    │ • Soothing Black & Purple   │
│ • Storytelling Expansion │ • Live Image Medallions     │
│ • 3D Card Stack Swap     │ • Audio API Waveform Game   │
│ • 360° Coin-Flip Clients │ • Directives & Auto-Complete│
│ • Magnification Docks    │ • Zero-Bloat Performance    │
└──────────────────────────┴─────────────────────────────┘
```

### 01. 🎨 Creative Mode (`/`)
An immersive editorial showcase merging architectural precision with creative craft:
- **Interactive 3D WebGL Hero:** Houses an interactive Three.js 3D character tracking head and eye coordinates with lerp damping, automatic frustum aspect preservation for mobile viewports, and `IntersectionObserver` GPU memory recycling.
- **Feathered Spotlight Cursor:** Real-time 260px radial-gradient mask with 60fps lerp interpolation creating a soft, tactile flashlight reveal over dual-tone backdrop photography.
- **Storytelling Narrative Expansion:** A 550vh cinematic scroll journey transitioning a 9:16 topographic contour card into full viewport canvas, dispersing chaotic technical elements into a clean, dual-panel editorial biography.
- **3D Perspective Project Swap Stack:** An interactive card stack using custom smoothstep kinematics to physically cycle projects through 3D spatial depth upon scroll.
- **Cinematic 360° Coin-Flip Client Works:** Deployed client projects rendered inside physical 3D medallions that flip with parabolic toss trajectories—guaranteeing upright, un-mirrored presentation across all rotation angles.
- **macOS-Grade Magnification Docks:** Desktop and mobile magnification toolbars powered by Framer Motion spring physics.

### 02. ⚡ Developer Mode (`/developer`)
A retro-futuristic terminal console reimagined in a **soothing Black & Purple palette**:
- **Aesthetic:** Deep obsidian base (`#0A0812`), lavender typography (`#EDE9FE`), electric violet prompt indicators (`#A855F7`), and soft lilac command echoes (`#C084FC`).
- **Interactive CLI Directives:** `help`, `about`, `projects`, `clients`, `skills`, `experience`, `education`, `contact`, `github`, `linkedin`, `email`, `game`, `whoami`, `clear`, `history`, `exit`.
- **Integrated Visual Medallions:** Displays circular portrait photos for `about` and verified circular client insignia medallions for `clients`.
- **Keyboard Navigation:** Full Bash/Zsh-style command history (`ArrowUp` / `ArrowDown`), `Tab` autocompletion, and smooth auto-scroll.
- **"Signal Lock" Calibration Mini-Game (`game`):** An analog dual-waveform oscilloscope calibration game. Features real-time frequency/amplitude wave rendering and procedural audio feedback synthesized via the **Web Audio API** (no external audio assets required).

---

## 🛠️ Technical Stack & Dependencies

| Layer | Technologies |
|---|---|
| **Framework & Engine** | Next.js 16 (Turbopack, App Router), React 19, TypeScript 5 |
| **Styling & Design** | Tailwind CSS v4, Lucide Icons, Custom Web Fonts (Anton, Inter, Space Grotesk) |
| **3D & Graphics** | Three.js (GLTFLoader, ACESFilmicToneMapping, SRGBColorSpace) |
| **Kinematics & Motion** | GSAP 3 (ScrollTrigger), Lenis Smooth Scroll, Framer Motion |
| **Audio Synthesis** | Native Web Audio API (`AudioContext`, Oscillator & Gain Envelopes) |
| **Security & Production** | Custom HTTP Security Headers, `.htaccess` Hardening, SEO Sitemap & Robots |

---

## 📁 Directory Structure

```
my-portfolio/
├── app/
│   ├── components/
│   │   ├── CharacterModel.tsx      # Three.js 3D character tracking & WebGL engine
│   │   ├── Footer.tsx              # Monumental typography & dual magnification docks
│   │   ├── MagnificationDock.tsx   # Framer Motion spring-physics dock component
│   │   ├── ProjectsSection.tsx     # 3D perspective card stack project showcase
│   │   ├── SmoothScroll.tsx        # Apple-grade Lenis smooth physics provider
│   │   ├── StorytellingSection.tsx # 550vh topographic scroll storytelling section
│   │   └── WorksWheel.tsx          # 360° parabolic coin-flip client medallion stage
│   ├── developer/
│   │   ├── components/
│   │   │   ├── CommandOutputs.tsx  # Terminal directives & medallion visual renders
│   │   │   ├── Oscilloscope.tsx    # Standalone canvas phosphor oscilloscope
│   │   │   └── SignalLockGame.tsx  # Analog dual-waveform calibration game
│   │   ├── data/
│   │   │   └── portfolioData.ts    # Centralized portfolio & client architecture data
│   │   ├── utils/
│   │   │   └── audio.ts            # Web Audio API mechanical sound synthesis engine
│   │   └── page.tsx                # Terminal CLI container & directive engine
│   ├── globals.css                 # Tailwind CSS v4 imports & editorial typography
│   ├── layout.tsx                  # Root layout, metadata, SEO & OpenGraph tags
│   └── page.tsx                    # Creative Mode root page
├── public/
│   ├── 3d-model/                   # 3D cartoon character GLTF/GLB model
│   ├── client-logos/               # Vector & high-res production client logos
│   ├── .htaccess                   # Production Apache/LiteSpeed security rules
│   ├── robots.txt                  # Search crawler directives
│   └── sitemap.xml                 # Search engine index mapping
├── .htaccess                       # Root Apache/LiteSpeed fallback configuration
├── next.config.ts                  # Production HTTP security headers & compression
├── package.json                    # Dependencies & build scripts
└── tsconfig.json                   # Strict TypeScript compiler options
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js:** `v18.18.0` or higher (recommended: `v20+`)
- **Package Manager:** `npm`, `yarn`, `pnpm`, or `bun`

### Installation
```bash
# Clone repository
git clone https://github.com/soham-cyber-dev/my-portfolio.git

# Enter project directory
cd my-portfolio

# Install dependencies
npm install
```

### Local Development
```bash
# Start Turbopack development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Quality Verification
```bash
# Run ESLint validation
npm run lint

# Build for production
npm run build
```

---

## 🌐 Deploying to Vercel (Free & Instant)

Deploying to [Vercel](https://vercel.com/) is completely free and requires zero additional configuration:

1. Push your repository to GitHub.
2. Sign in to [Vercel](https://vercel.com/) and click **"Add New Project"**.
3. Import your `my-portfolio` repository.
4. Vercel automatically detects **Next.js**:
   - **Framework Preset:** `Next.js`
   - **Root Directory:** `./`
   - **Build Command:** `next build`
   - **Output Directory:** `.next`
5. Click **Deploy**. Vercel will build, optimize, and assign a global CDN domain (e.g., `https://your-portfolio.vercel.app`) with free automated SSL certificates.

---

## 🔒 Security Hardening

- **HTTP Strict Transport Security (HSTS):** `max-age=63072000; includeSubDomains; preload`
- **Clickjacking Defense:** `X-Frame-Options: DENY`
- **MIME Sniffing Prevention:** `X-Content-Type-Options: nosniff`
- **Information Obfuscation:** `X-Powered-By` header disabled.
- **Sensitive File Shield:** Hardened `.htaccess` rules denying access to `.env*`, `.git`, `.DS_Store`, and configuration files.

---

## 📬 Contact & Connect

**Soham Bhuniya**  
- **Email:** [sohambhuniya2021@gmail.com](mailto:sohambhuniya2021@gmail.com)  
- **GitHub:** [@soham-cyber-dev](https://github.com/soham-cyber-dev)  
- **LinkedIn:** [soham-bhuniya-cyber-dev](https://www.linkedin.com/in/soham-bhuniya-cyber-dev)  
- **Instagram:** [@_its_soham_](https://www.instagram.com/_its_soham_)

---

*Designed & Engineered by Soham Bhuniya © 2026. All rights reserved.*
