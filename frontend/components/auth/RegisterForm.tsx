"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { register } from "@/lib/services/auth";

export default function RegisterForm() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await register({
        full_name: fullName,
        email,
        password,
      });

      router.push("/login");
    } catch (err: any) {
      const message =
        err?.response?.data?.detail ||
        "Unable to create account. Please try again.";

      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <div>
        <label className="mb-2 block text-sm text-slate-300">
          Full Name
        </label>

        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Your name"
          required
          className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-cyan-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-slate-300">
          Email
        </label>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-cyan-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-slate-300">
          Password
        </label>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          minLength={8}
          required
          className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-cyan-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-cyan-600 py-3 font-semibold text-white transition hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Creating Account..." : "Create Account"}
      </button>
    </form>
  );
}
