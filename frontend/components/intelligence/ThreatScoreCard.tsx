
interface Props {
  score: number;
  level: string;
}

export default function ThreatScoreCard({
  score,
  level,
}: Props) {

  const percentage = Math.min(score, 100);

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

      <h3 className="mb-6 text-xl font-semibold">
        Threat Score
      </h3>

      <div className="flex items-center gap-8">

        <div className="relative h-36 w-36">

          <svg
            className="h-36 w-36 rotate-[-90deg]"
            viewBox="0 0 120 120"
          >

            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="#1e293b"
              strokeWidth="10"
            />

            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="#06b6d4"
              strokeWidth="10"
              strokeDasharray={314}
              strokeDashoffset={
                314 - (314 * percentage) / 100
              }
            />

          </svg>

          <div className="absolute inset-0 flex items-center justify-center">

            <span className="text-3xl font-bold">

              {score}

            </span>

          </div>

        </div>

        <div>

          <p className="text-lg font-semibold">
            {level}
          </p>

          <p className="mt-2 text-slate-400">

            Threat score calculated from
            enrichment providers.

          </p>

        </div>

      </div>

    </div>
  );
}