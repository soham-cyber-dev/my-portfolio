import type { Metadata } from "next";
import { Anton, Inter, Space_Grotesk } from "next/font/google";
import SmoothScroll from "./components/SmoothScroll";
import "./globals.css";

const anton = Anton({
  weight: "400",
  variable: "--font-anton",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Soham Bhuniya — Full-Stack Software Developer & Systems Architect",
  description:
    "Portfolio of Soham Bhuniya, Full-Stack Software Developer and CSE student from Kolkata, India. Engineering robust web architectures, distributed APIs, and immersive digital experiences.",
  keywords: [
    "Soham Bhuniya",
    "Software Developer",
    "Full-Stack Engineer",
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "Web Architecture",
    "Kolkata",
    "Portfolio",
  ],
  authors: [{ name: "Soham Bhuniya" }],
  creator: "Soham Bhuniya",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Soham Bhuniya — Full-Stack Software Developer",
    description:
      "Engineering robust web architectures, distributed APIs, and immersive digital experiences.",
    siteName: "Soham Bhuniya Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Soham Bhuniya — Full-Stack Software Developer",
    description:
      "Engineering robust web architectures, distributed APIs, and immersive digital experiences.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${inter.variable} ${spaceGrotesk.variable} antialiased`}
    >
      <body className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}

