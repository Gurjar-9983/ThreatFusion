
"use client";

interface Props {
  confidence: number;
}

export default function ConfidenceCard({
  confidence,
}: Props) {

  return (

    <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">

      <h3 className="font-semibold">
        IOC Confidence
      </h3>

      <div className="mt-4">

        <div className="flex justify-between">

          <span>Confidence</span>

          <span>
            {confidence}%
          </span>

        </div>

        <div className="mt-3 h-2 rounded-full bg-slate-800">

          <div
            className="h-2 rounded-full bg-cyan-500"
            style={{
              width: `${confidence}%`,
            }}
          />
          <ConfidenceCard confidence={87} />

        </div>

      </div>

    </div>

  );
}