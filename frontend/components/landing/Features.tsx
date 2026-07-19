
import FeatureCard from "@/components/common/FeatureCard";

import {
  Search,
  Bot,
  ShieldCheck,
  Crosshair,
  RadioTower,
  FileText,
} from "lucide-react";

const features = [
  {
    icon: Search,
    title: "IOC Lookup",
    description:
      "Investigate IP addresses, domains, URLs, and file hashes using multiple threat intelligence providers.",
  },
  {
    icon: Bot,
    title: "AI Threat Summary",
    description:
      "Generate AI-powered summaries, severity assessments, and mitigation recommendations.",
  },
  {
    icon: ShieldCheck,
    title: "CVE Intelligence",
    description:
      "Explore vulnerabilities, CVSS scores, affected products, and remediation guidance.",
  },
  {
    icon: Crosshair,
    title: "MITRE ATT&CK",
    description:
      "Map adversary techniques to the MITRE ATT&CK framework for deeper analysis.",
  },
  {
    icon: RadioTower,
    title: "Threat Feeds",
    description:
      "Aggregate intelligence from trusted providers into one unified dashboard.",
  },
  {
    icon: FileText,
    title: "Reports",
    description:
      "Save investigations and generate professional PDF threat intelligence reports.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="bg-slate-950 py-24"
    >
      <div className="mx-auto max-w-7xl px-6">

        <div className="mx-auto mb-16 max-w-2xl text-center">

          <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
            Platform Features
          </span>

          <h2 className="mt-6 text-4xl font-bold text-white">
            Powerful Threat Intelligence Platform
          </h2>

          <p className="mt-4 text-lg text-slate-400">
            Everything you need to investigate cyber threats,
            enrich indicators, and generate AI-powered intelligence.
          </p>

        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>

      </div>
    </section>
  );
}