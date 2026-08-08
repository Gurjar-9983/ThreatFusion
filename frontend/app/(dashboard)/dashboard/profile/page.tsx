
"use client";

import AuthGuard from "@/components/auth/AuthGuard";

import ProfileStats from "@/components/profile/ProfileStats";
import ProfileInfo from "@/components/profile/ProfileInfo";
import RecentUserActivity from "@/components/profile/RecentUserActivity";
import SecurityOverview from "@/components/profile/SecurityOverview";
import APIUsage from "@/components/profile/APIUsage";

import { useProfile } from "@/lib/hooks/useProfile";

export default function ProfilePage() {
  const {
    data: profile,
    isLoading,
  } = useProfile();

  if (isLoading) {
    return (
      <AuthGuard>
        <main className="min-h-screen bg-slate-950 p-8 text-white flex items-center justify-center">
          <div className="text-xl text-slate-400">
            Loading Profile...
          </div>
        </main>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <main className="min-h-screen bg-slate-950 p-8 text-white">

        {/* Header */}

        <div className="mb-8">
          <h1 className="text-4xl font-bold">
            Profile
          </h1>

          <p className="mt-2 text-slate-400">
            Manage your ThreatFusion account.
          </p>
        </div>


        {/* Hero Card */}

          <div className="mb-8 flex items-center gap-6 rounded-xl border border-slate-800 bg-slate-900 p-8">

         <div className="flex h-24 w-24 items-center justify-center rounded-full bg-cyan-600 text-5xl font-bold">
           {profile?.user?.full_name?.charAt(0) ?? "T"}
       </div>

       <div>

          <h2 className="text-3xl font-bold">
              {profile?.user?.full_name}
         </h2>

          <p className="text-slate-400">
             
          </p>

           <p className="mt-2 text-sm text-slate-500">
              {profile?.user?.email}
            </p>

        </div>

        </div>

        {/* Statistics */}

        <ProfileStats
          stats={{
            reports: profile?.stats?.reports ?? 0,
            iocs: profile?.stats?.iocs ?? 0,
            searches: profile?.stats?.searches ?? 0,
            apiCalls: profile?.stats?.api_calls ?? 0,
          }}
        />

        {/* Information */}

        <section className="mt-8 grid gap-6 xl:grid-cols-2">

          <ProfileInfo
            user={{
              full_name: profile?.user?.full_name ?? "",
              email: profile?.user?.email ?? "",
              joined: profile?.user?.joined ?? "",
              active: profile?.user?.active ?? false,
            }}
          />

          <RecentUserActivity />

        </section>

        {/* Security */}

        <section className="mt-8 grid gap-6 xl:grid-cols-2">

          <SecurityOverview />

          <APIUsage />

        </section>

      </main>
    </AuthGuard>
  );
}