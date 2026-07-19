
import { Button } from "@/components/ui/button";
import { Shield, ArrowRight } from "lucide-react";
import DashboardPreview from "./DashboardPreview";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-24">
      <div className="mx-auto flex max-w-7xl flex-col items-center px-6 text-center lg:flex-row lg:justify-between lg:text-left">

        {/* Left Content */}
        <div className="max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-400">
            <Shield className="h-4 w-4" />
            AI-Powered Cyber Threat Intelligence
          </div>

          <h1 className="text-5xl font-extrabold leading-tight text-white lg:text-6xl">
            Analyze Cyber Threats
            <span className="block text-blue-500">
              Smarter with AI
            </span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            ThreatFusion helps security analysts investigate IOCs,
            monitor vulnerabilities, aggregate threat intelligence,
            and generate AI-powered security insights from multiple
            trusted sources.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4 lg:justify-start">
            <Button size="lg" className="gap-2">
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Button>

            <Button size="lg" variant="outline">
              View Documentation
            </Button>
          </div>
        </div>

        {/* Dashboard */}
        <div className="mt-16 lg:mt-0">
          <DashboardPreview />
        </div>

      </div>
    </section>
  );
}