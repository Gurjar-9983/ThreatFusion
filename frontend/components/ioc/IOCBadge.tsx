
"use client";

interface Props {
  severity: string;
}

export default function IOCBadge({
  severity,
}: Props) {
  const value = severity.toLowerCase();

  const styles = {
    high:
      "bg-red-500/20 text-red-400 border border-red-500/30",

    medium:
      "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",

    low:
      "bg-green-500/20 text-green-400 border border-green-500/30",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        styles[value as keyof typeof styles] ??
        "bg-slate-700 text-white"
      }`}
    >
      {severity.toUpperCase()}
    </span>
  );
}