
"use client";

export default function LiveStatus() {
  return (
    <div className="flex items-center gap-2 text-sm text-green-400">
      <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
      LIVE
    </div>
  );
}