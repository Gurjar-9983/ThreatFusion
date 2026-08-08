"use client";

interface ProfileStatsProps {
  stats: {
    reports: number;
    iocs: number;
    searches: number;
    apiCalls: number;
  };
}

export default function ProfileStats({ stats }: ProfileStatsProps) {
  const cards = [
    {
      title: "Reports",
      value: stats.reports,
      color: "text-cyan-400",
    },
    {
      title: "IOCs",
      value: stats.iocs,
      color: "text-green-400",
    },
    {
      title: "Threat Searches",
      value: stats.searches,
      color: "text-yellow-400",
    },
    {
      title: "API Calls",
      value: stats.apiCalls,
      color: "text-purple-400",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-xl border border-slate-800 bg-slate-900 p-6"
        >
          <p className="text-sm text-slate-400">
            {card.title}
          </p>

          <h2 className={`mt-3 text-3xl font-bold ${card.color}`}>
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}
