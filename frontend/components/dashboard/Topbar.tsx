"use client";

import { useEffect, useRef, useState } from "react";
import { Bell, Search, UserCircle2, Settings, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Topbar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("token");

    setOpen(false);
    router.push("/login");
  };

  return (
    <header className="flex h-[70px] items-center justify-between border-b border-slate-800 bg-[#0b1224] px-6">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

          <input
            type="text"
            placeholder="Search IP, Domain, Hash, CVE..."
            className="h-10 w-[300px] rounded-lg border border-slate-700 bg-[#111b31] pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button
          type="button"
          className="text-slate-400 transition hover:text-white"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
        </button>

        <div ref={profileRef} className="relative">
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition hover:bg-slate-800"
            aria-haspopup="menu"
            aria-expanded={open}
          >
            <UserCircle2 className="h-8 w-8 text-blue-500" />

            <div className="text-left">
              <p className="text-sm font-medium text-white">
                Analyst
              </p>

              <p className="text-xs text-slate-400">
                Security Team
              </p>
            </div>
          </button>

          {open && (
            <div className="absolute right-0 top-12 z-50 w-52 overflow-hidden rounded-xl border border-slate-700 bg-[#111a2e] shadow-2xl">
              <div className="border-b border-slate-700 px-4 py-3">
                <p className="text-sm font-semibold text-white">
                  Analyst
                </p>

                <p className="text-xs text-slate-400">
                  Security Team
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  router.push("/dashboard/settings");
                }}
                className="flex w-full items-center gap-3 px-4 py-3 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
              >
                <Settings className="h-4 w-4" />
                Settings
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 px-4 py-3 text-sm text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
