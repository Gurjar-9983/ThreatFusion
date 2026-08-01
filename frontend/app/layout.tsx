
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import Providers from "@/components/providers";
import { Toaster } from "sonner";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "ThreatFusion",
  description: "AI-Powered Cyber Threat Intelligence Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.className} ${geistMono.variable} antialiased bg-slate-950 text-white`}
      >
        <Providers>{children}</Providers>
        <Toaster
       position="top-right"
       richColors  />
      </body>
    </html>
  );
}