import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ScrollProgressBar from "../components/ScrollProgressBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dhruv Singh — DevOps & Blockchain Developer",
  description: "DevOps engineer, blockchain developer, and open source contributor (CNCF/kgateway, stdlib). Self-hosting infrastructure on a 2-node homelab. Building cloud-native and decentralized systems.",
  keywords: ["DevOps", "Blockchain", "Kubernetes", "CNCF", "Open Source", "Homelab", "Cloud Native", "Solidity", "Go", "Rust"],
};

/**
 * @description The root layout of the application.
 * @param {Readonly<{children: React.ReactNode}>} props The props for the component.
 * @returns {JSX.Element} The root layout component.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        {/* Scroll progress bar (client component) */}
        <ScrollProgressBar />
        {children}
      </body>
    </html>
  );
}
