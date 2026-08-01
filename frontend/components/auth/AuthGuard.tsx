
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useAuthStore } from "@/lib/store/auth";

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !token) {
      router.replace("/login");
    }
  }, [mounted, token, router]);

  if (!mounted) {
    return null;
  }

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        Redirecting...
      </div>
    );
  }

  return <>{children}</>;
}