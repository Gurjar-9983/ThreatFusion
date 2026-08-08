
"use client";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function ReportSearch({
  value,
  onChange,
}: Props) {
  return (
    <input
      type="text"
      placeholder="Search reports..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-500"
    />
  );
}