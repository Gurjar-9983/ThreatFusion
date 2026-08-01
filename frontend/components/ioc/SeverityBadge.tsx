
interface SeverityBadgeProps {
  severity: string;
}

export default function SeverityBadge({
  severity,
}: SeverityBadgeProps) {
  const level = severity.toLowerCase();

  const styles = {
    high: "bg-red-500/20 text-red-400 border-red-500/30",
    medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    low: "bg-green-500/20 text-green-400 border-green-500/30",
  };

  const className =
    styles[level as keyof typeof styles] ??
    "bg-slate-700 text-slate-300 border-slate-600";

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${className}`}
    >
      {severity}
    </span>
  );
}