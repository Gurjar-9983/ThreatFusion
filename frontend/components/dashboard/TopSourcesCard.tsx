
"use client";

interface Props {
  data: {
    source: string;
    count: number;
  }[];
}

export default function TopSourcesCard({
  data,
}: Props) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-5 text-lg font-semibold">
        Top IOC Sources
      </h2>

      <div className="space-y-4">
        {data.length ? (
          data.map((item) => (
            <div
              key={item.source}
              className="flex items-center justify-between border-b border-slate-800 pb-3"
            >
              <span>{item.source}</span>

              <span className="rounded bg-blue-600 px-2 py-1 text-xs font-semibold">
                {item.count}
              </span>
            </div>
          ))
        ) : (
          <p className="text-slate-400">
            No sources available.
          </p>
        )}
      </div>
    </div>
  );
}