
"use client";

interface Props {
  type: "created" | "updated" | "high";
}

export default function EventBadge({ type }: Props) {
  const styles = {
    created: "bg-green-500/20 text-green-400",
    updated: "bg-blue-500/20 text-blue-400",
    high: "bg-red-500/20 text-red-400",
  };

  const labels = {
    created: "Created",
    updated: "Updated",
    high: "High Severity",
  };

  return (
    <span
      className={`rounded-full px-2 py-1 text-xs font-semibold ${styles[type]}`}
    >
      {labels[type]}
    </span>
  );
}