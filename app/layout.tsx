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
  title: "SOHAM — Software Developer",
  description: "An immersive world of curious creatures, magical places, and stories waiting to be discovered.",
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

