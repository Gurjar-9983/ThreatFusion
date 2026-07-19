
"use client";

import { Bell, Search, UserCircle2 } from "lucide-react";

export default function Topbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-900 px-8">
      <div className="flex items-center gap-3 rounded-lg border border-slate-700 bg-slate-800 px-4 py-2">
        <Search className="h-4 w-4 text-slate-400" />
        <input
          placeholder="Search IP, Domain, Hash, CVE..."
          className="bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
        />
      </div>

      <div className="flex items-center gap-6">
        <Bell className="h-5 w-5 cursor-pointer text-slate-400 hover:text-white" />

        <div className="flex items-center gap-2">
          <UserCircle2 className="h-8 w-8 text-blue-500" />
          <div>
            <p className="text-sm font-medium text-white">
              Analyst
            </p>
            <p className="text-xs text-slate-400">
              Security Team
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}