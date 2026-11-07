# Soham Bhuniya — Portfolio

Full-Stack Software Developer & Systems Architect  
CSE Student · Tech Lead @ Google Developer Groups, UEM Kolkata · Kolkata, India

- **Live URL:** https://my-portfolio-indol-nine-73.vercel.app/
- **Repository:** https://github.com/soham-cyber-dev/my-portfolio

---

## Overview

A modern, high-performance portfolio engineered with Next.js, React, TypeScript, Three.js, and GSAP. The application is structured around two distinct operational modes:

1. **Creative Mode (`/`)**: An editorial, motion-rich presentation featuring interactive 3D WebGL character tracking, a feathered spotlight mask, continuous scroll-driven storytelling, a 3D perspective card swap stack, 360-degree coin-flip client work medallions, and spring-physics magnification docks.
2. **Developer Mode (`/developer`)**: A retro-futuristic, experimental terminal console built on a soothing black-and-purple palette. Features custom CLI directives, command history, tab auto-completion, live client logo medallions, and a playable dual-waveform oscilloscope calibration mini-game powered by the native Web Audio API.

---

## Features

### Creative Mode
- **Interactive 3D WebGL Model:** Three.js character tracking cursor coordinates with lerp damping, responsive frustum compensation, and automatic GPU resource recycling via `IntersectionObserver`.
- **Spotlight Mask Interaction:** Dual-layer background reveal guided by a 260px feathered circular mask following cursor movement.
- **Scroll-Driven Storytelling:** 550vh cinematic timeline expanding a 9:16 topographic frame into full viewport while staggering editorial background elements.
- **3D Card Stack Kinematics:** Perspective-transformed project cards cycling smoothly through 3D space on scroll.
- **360-Degree Coin-Flip Client Works:** Deployed client projects presented in dual-sided 3D medallions using parabolic rotation arcs that guarantee upright, un-mirrored presentation across all angles.
- **Spring-Physics Magnification Docks:** Desktop and mobile navigation docks built with Framer Motion spring physics.

### Developer Mode
- **Minimalist Console Interface:** Styled in a deep obsidian, lavender, and electric violet palette (`#0A0812`, `#EDE9FE`, `#A855F7`, `#C084FC`).
- **Interactive Command Parser:** Supports commands including `help`, `about`, `projects`, `clients`, `skills`, `experience`, `education`, `contact`, `github`, `linkedin`, `email`, `game`, `clear`, `history`, `exit`, and `whoami`.
- **Integrated Medallions:** Displays circular photographic portraits for identity and circular vector medallions for client case studies.
- **Terminal Ergonomics:** Standard command history traversal (`ArrowUp` / `ArrowDown`), `Tab` auto-completion, and isolated native scroll containment (`data-lenis-prevent`).
- **Signal Lock Mini-Game:** Canvas dual-waveform calibration game with real-time procedural sound effects synthesized entirely via the native Web Audio API.

---

## Technical Stack

| Layer | Technologies |
|---|---|
| **Core Framework** | Next.js 16 (Turbopack, App Router), React 19, TypeScript 5 |
| **Styling** | Tailwind CSS v4, Lucide Icons |
| **Graphics & 3D** | Three.js (GLTFLoader, ACESFilmicToneMapping, SRGBColorSpace) |
| **Animation & Scroll** | GSAP 3 (ScrollTrigger), Lenis Smooth Scroll, Framer Motion |
| **Audio Synthesis** | Native Web Audio API (`AudioContext`, Oscillator & Gain Envelopes) |
| **Deployment & Security** | Vercel Edge Network, HTTP Security Headers, `.htaccess` |

---

## Project Structure

```
my-portfolio/
├── app/
│   ├── components/
│   │   ├── CharacterModel.tsx      # Three.js 3D character tracking & WebGL engine
│   │   ├── Footer.tsx              # Monumental typography & dual magnification docks
│   │   ├── MagnificationDock.tsx   # Spring-physics dock component
│   │   ├── ProjectsSection.tsx     # 3D perspective card stack project showcase
│   │   ├── SmoothScroll.tsx        # Lenis smooth scroll provider
│   │   ├── StorytellingSection.tsx # Scroll storytelling section with topographic background
│   │   └── WorksWheel.tsx          # 360-degree coin-flip client medallion stage
│   ├── developer/
│   │   ├── components/
│   │   │   ├── CommandOutputs.tsx  # Terminal directives & medallion visual renders
│   │   │   ├── Oscilloscope.tsx    # Canvas phosphor oscilloscope
│   │   │   └── SignalLockGame.tsx  # Analog dual-waveform calibration mini-game
│   │   ├── data/
│   │   │   └── portfolioData.ts    # Centralized portfolio & client architecture data
│   │   ├── utils/
│   │   │   └── audio.ts            # Web Audio API sound synthesis engine
│   │   └── page.tsx                # Terminal CLI container & directive engine
│   ├── globals.css                 # Global Tailwind CSS styles and font configurations
│   ├── layout.tsx                  # Root layout, metadata, and SEO directives
│   └── page.tsx                    # Creative Mode root page
├── public/
│   ├── 3d-model/                   # 3D character GLTF/GLB model
│   ├── client-logos/               # Client brand marks and logos
│   ├── .htaccess                   # Apache/LiteSpeed security and caching configuration
│   ├── robots.txt                  # Search engine crawler directives
│   └── sitemap.xml                 # Search engine site index
├── next.config.ts                  # Next.js security headers and compression settings
├── package.json                    # Project dependencies and scripts
└── tsconfig.json                   # TypeScript configuration
```

---

## Getting Started

### Prerequisites
- Node.js 18.18.0 or higher
- npm, yarn, pnpm, or bun

### Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/soham-cyber-dev/my-portfolio.git
   cd my-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

5. Run static linting:
   ```bash
   npm run lint
   ```

---

## Contact

- **Name:** Soham Bhuniya
- **Email:** sohambhuniya2021@gmail.com
- **Website:** https://my-portfolio-indol-nine-73.vercel.app/
- **GitHub:** https://github.com/soham-cyber-dev
- **LinkedIn:** https://www.linkedin.com/in/soham-bhuniya-cyber-dev
- **Instagram:** https://www.instagram.com/_its_soham_
