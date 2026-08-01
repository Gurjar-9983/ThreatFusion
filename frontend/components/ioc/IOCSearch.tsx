
"use client";

interface IOCSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function IOCSearch({
  value,
  onChange,
}: IOCSearchProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search IP, Domain, URL, Hash..."
      className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-500"
    />
  );
}