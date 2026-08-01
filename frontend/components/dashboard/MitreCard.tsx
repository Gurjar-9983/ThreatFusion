
"use client";

export default function MitreCard() {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">

      <h3 className="font-semibold">
        MITRE ATT&CK
      </h3>

      <div className="mt-4 space-y-3">

        <div>
          <p className="text-xs text-slate-500">
            Technique
          </p>

          <p>T1071</p>
        </div>

        <div>
          <p className="text-xs text-slate-500">
            Tactic
          </p>

          <p>Command & Control</p>
        </div>

      </div>

    </div>
  );
}