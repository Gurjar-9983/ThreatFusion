
export default function APIUsage() {
  const usage = 72;

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-xl font-semibold">
        API Usage
      </h2>

      <div className="flex justify-between text-sm">
        <span>14,582 / 20,000 Requests</span>

        <span>{usage}%</span>
      </div>

      <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-cyan-500"
          style={{
            width: `${usage}%`,
          }}
        />
      </div>
    </div>
  );
}