
"use client";

import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950">
      <div className="w-full max-w-md rounded-xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
        <h1 className="mb-6 text-center text-3xl font-bold text-cyan-400">
          ThreatFusion
        </h1>

        <p className="mb-8 text-center text-slate-400">
          Sign in to your account
        </p>

        <LoginForm />
      </div>
    </main>
  );
}