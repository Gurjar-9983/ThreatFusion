
"use client";

interface Props {
  score: number;
}

export default function ThreatScore({
  score,
}: Props) {

  const percentage = Math.min(score, 100);

  let color = "bg-green-500";
  let label = "Low Risk";

  if (score >= 40) {
    color = "bg-yellow-500";
    label = "Medium Risk";
  }

  if (score >= 70) {
    color = "bg-orange-500";
    label = "High Risk";
  }

  if (score >= 90) {
    color = "bg-red-500";
    label = "Critical";
  }

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">

      <div className="flex items-center justify-between">

        <h3 className="font-semibold">
          Threat Score
        </h3>

        <span className="text-3xl font-bold">
          {score}
        </span>

      </div>

      <div className="mt-4 h-3 rounded-full bg-slate-800">

        <div
          className={`${color} h-3 rounded-full transition-all`}
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

      <p className="mt-3 text-sm text-slate-400">
        {label}
      </p>

    </div>
  );
}