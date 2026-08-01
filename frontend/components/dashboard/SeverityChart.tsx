
"use client";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

interface Props {
  data: {
    name: string;
    value: number;
  }[];
}

const COLORS = [
  "#22c55e",
  "#eab308",
  "#ef4444",
];

export default function SeverityChart({
  data,
}: Props) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-lg font-semibold">
        Severity Distribution
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={70}
              outerRadius={100}
              label
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}