
"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface Props {
  data: {
    type: string;
    count: number;
  }[];
}

export default function IOCTypeChart({
  data,
}: Props) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-lg font-semibold">
        IOC Types
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid stroke="#334155" />

            <XAxis dataKey="type" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="count"
              fill="#3b82f6"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}