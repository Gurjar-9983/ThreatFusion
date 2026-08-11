import type { Metadata } from "next";

import "./globals.css";
import Providers from "@/components/providers";
import { Toaster } from "sonner";

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
      <body className="antialiased bg-slate-950 text-white">
        <Providers>{children}</Providers>

        <Toaster
          position="top-right"
          richColors
        />
      </body>
    </html>
  );
}
