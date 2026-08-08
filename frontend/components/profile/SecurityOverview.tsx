
export default function SecurityOverview() {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-xl font-semibold">
        Security Overview
      </h2>

      <div className="space-y-4">

        <div className="flex justify-between">
          <span>Password</span>
          <span className="text-green-400">
            Updated
          </span>
        </div>

        <div className="flex justify-between">
          <span>Two-Factor Authentication</span>
          <span className="text-green-400">
            Enabled
          </span>
        </div>

        <div className="flex justify-between">
          <span>Session</span>
          <span className="text-cyan-400">
            Active
          </span>
        </div>

        <div className="flex justify-between">
          <span>Last Login</span>
          <span className="text-slate-400">
            Today
          </span>
        </div>

      </div>
    </div>
  );
}