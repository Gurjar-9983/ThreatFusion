
export default function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-xl border border-slate-800 bg-slate-900 p-6">
      <div className="h-4 w-32 rounded bg-slate-700" />

      <div className="mt-4 h-10 w-20 rounded bg-slate-700" />

      <div className="mt-6 h-3 w-full rounded bg-slate-700" />
    </div>
  );
}