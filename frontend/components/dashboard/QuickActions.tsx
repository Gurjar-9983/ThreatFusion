
"use client";

import Link from "next/link";

import {
  Plus,
  Shield,
  FileText,
  Bug,
} from "lucide-react";

const actions = [
  {
    title: "Add IOC",
    description: "Create a new indicator",
    href: "/dashboard/ioc",
    icon: Plus,
    color:
      "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  },
  {
    title: "Threat Feed",
    description: "View live threats",
    href: "/dashboard/threat-feed",
    icon: Shield,
    color:
      "bg-red-500/10 text-red-400 border-red-500/20",
  },
  {
    title: "Latest CVEs",
    description: "Browse vulnerabilities",
    href: "/dashboard/cves",
    icon: Bug,
    color:
      "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  },
  {
    title: "Reports",
    description: "Generate intelligence reports",
    href: "/dashboard/reports",
    icon: FileText,
    color:
      "bg-green-500/10 text-green-400 border-green-500/20",
  },
];

export default function QuickActions() {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">
          Quick Actions
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Frequently used actions for analysts
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              href={action.href}
              className="group rounded-xl border border-slate-800 bg-slate-950 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/10"
            >
              <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg border ${action.color}`}
              >
                <Icon className="h-6 w-6" />
              </div>

              <h3 className="font-semibold text-white group-hover:text-cyan-400">
                {action.title}
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                {action.description}
              </p>
            </Link>
          );
        })}

      </div>
    </section>
  );
}