"use client";

import Link from "next/link";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950">
      <div className="w-full max-w-md rounded-xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
        <h1 className="mb-3 text-center text-3xl font-bold text-cyan-400">
          ThreatFusion
        </h1>

        <p className="mb-8 text-center text-slate-400">
          Create your security analyst account
        </p>

        <RegisterForm />

        <p className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-cyan-400 hover:text-cyan-300"
          >
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
