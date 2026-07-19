
import Link from "next/link";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Shield className="h-8 w-8 text-blue-500" />

          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-white">
              ThreatFusion
            </span>

            <span className="text-xs text-slate-400">
              Cyber Threat Intelligence
            </span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-10 md:flex">
          <Link
            href="#features"
            className="text-sm text-slate-300 transition hover:text-white"
          >
            Features
          </Link>

          <Link
            href="#integrations"
            className="text-sm text-slate-300 transition hover:text-white"
          >
            Integrations
          </Link>

          <Link
            href="#docs"
            className="text-sm text-slate-300 transition hover:text-white"
          >
            Documentation
          </Link>

          <Link
            href="https://github.com"
            target="_blank"
            className="text-sm text-slate-300 transition hover:text-white"
          >
            GitHub
          </Link>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" className="text-slate-300 hover:text-white">
            Login
          </Button>

          <Button className="bg-blue-600 hover:bg-blue-700">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
}