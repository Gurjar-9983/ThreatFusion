
const activity = [
  "Generated IOC Intelligence Report",
  "Performed AI Threat Analysis",
  "Created IOC 8.8.8.8",
  "Viewed Threat Feed",
  "Downloaded PDF Report",
];

export default function RecentUserActivity() {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-xl font-semibold">
        Recent Activity
      </h2>

      <div className="space-y-4">
        {activity.map((item) => (
          <div
            key={item}
            className="flex items-center gap-3"
          >
            <span className="text-green-400">
              ✔
            </span>

            <span className="text-slate-300">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}