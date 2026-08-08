
"use client";

import {
  BrainCircuit,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";

interface AIAnalysis {
  level: string;
  score: number;
  confidence: number;
  recommendation: string;
  summary: string;
  reasoning: string[];
}

interface Props {
  analysis?: AIAnalysis;
}

export default function AIAnalystCard({
  analysis,
}: Props) {
  if (!analysis) {
    return null;
  }

  const color =
    analysis.level === "Critical"
      ? "text-red-400"
      : analysis.level === "High"
      ? "text-orange-400"
      : analysis.level === "Medium"
      ? "text-yellow-400"
      : "text-green-400";

  return (
    <div className="rounded-xl border border-cyan-700 bg-slate-900 p-6">

      <div className="mb-6 flex items-center gap-3">

        <BrainCircuit className="h-7 w-7 text-cyan-400" />

        <div>

          <h2 className="text-xl font-bold">
            AI Security Analyst
          </h2>

          <p className="text-sm text-slate-400">
            Automated Threat Assessment
          </p>

        </div>

      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <div>

          <p className="mb-1 text-slate-400">
            Threat Level
          </p>

          <p className={`text-2xl font-bold ${color}`}>
            {analysis.level}
          </p>

        </div>

        <div>

          <div className="space-y-2">

            <div className="flex justify-between">

              <span className="text-slate-400">
                Confidence
              </span>

              <span className="font-bold text-cyan-400">
                {analysis.confidence}%
              </span>

            </div>

            <div className="h-3 rounded-full bg-slate-700">

              <div
                className="h-3 rounded-full bg-cyan-500 transition-all duration-700"
                style={{
                  width: `${analysis.confidence}%`,
                }}
              />

            </div>

          </div>

        </div>

      </div>

      <div className="mt-6">

        <h3 className="mb-2 font-semibold">
          Assessment
        </h3>

        <p className="text-slate-300">
          {analysis.summary}
        </p>

      </div>

      <div className="mt-6">

        <h3 className="mb-3 font-semibold">
          Evidence
        </h3>

        <ul className="space-y-2">

          {analysis.reasoning.map((item, index) => (

            <li
              key={index}
              className="flex items-start gap-2"
            >

              <AlertTriangle
                className="mt-1 h-4 w-4 text-yellow-400"
              />

              <span>{item}</span>

            </li>

          ))}

        </ul>

      </div>

      <div className="mt-6 rounded-lg bg-slate-800 p-4">

        <div className="flex items-center gap-2">

          <ShieldCheck className="text-green-400" />

          <h3 className="font-semibold">
            Recommendation
          </h3>

        </div>

        <p className="mt-2 text-slate-300">
          {analysis.recommendation}
        </p>

      </div>

    </div>
  );
}