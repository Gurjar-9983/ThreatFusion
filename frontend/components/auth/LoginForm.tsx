
"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { useLogin } from "@/lib/hooks/useLogin";

export default function LoginForm() {
  const router = useRouter();
  const login = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    console.log("Email:", email);

    try {
      const result = await login.mutateAsync({
        email,
        password,
      });

      console.log("Login successful:", result);

      router.push("/dashboard");
    } catch (err) {
      console.error("Login failed:", err);
      alert("Invalid email or password.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
          required
          className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-cyan-500"
        />
      </div>

      <button
        type="submit"
        disabled={login.isPending}
        className="w-full rounded-lg bg-cyan-600 py-3 font-semibold text-white transition hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {login.isPending ? "Signing In..." : "Sign In"}
      </button>
    </form>
  );
}