
"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Search,
  ShieldAlert,
  Bug,
  FileText,
  Settings,
  Shield,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "IOC Lookup",
    href: "/dashboard/ioc",
    icon: Search,
  },
  {
    title: "Threat Feed",
    href: "/dashboard/threat-feed",
    icon: ShieldAlert,
  },
  {
    title: "CVE Intelligence",
    href: "/dashboard/cves",
    icon: Bug,
  },
  {
    title: "Reports",
    href: "/dashboard/reports",
    icon: FileText,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-72 flex-col border-r border-slate-800 bg-slate-900">
      <div className="flex items-center gap-3 border-b border-slate-800 p-6">
        <Shield className="h-8 w-8 text-blue-500" />
        <div>
          <h1 className="text-xl font-bold text-white">
            ThreatFusion
          </h1>
          <p className="text-xs text-slate-400">
            Cyber Threat Intelligence
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.title}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-slate-300 transition hover:bg-slate-800 hover:text-white"
            >
              <Icon className="h-5 w-5" />
              {item.title}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}