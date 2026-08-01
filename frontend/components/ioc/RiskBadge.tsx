
"use client";

interface Props {
  score: number;
}

export default function RiskBadge({
  score,
}: Props) {
  let color =
    "bg-green-500/20 text-green-400";

  if (score >= 90)
    color = "bg-red-500/20 text-red-400";

  else if (score >= 70)
    color = "bg-orange-500/20 text-orange-400";

  else if (score >= 40)
    color = "bg-yellow-500/20 text-yellow-400";

  return (
    <div
      className={`inline-flex rounded-md px-2 py-1 text-xs font-bold ${color}`}
    >
      {score}
    </div>
  );
}