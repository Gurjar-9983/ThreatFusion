
"use client";

import { formatDistanceToNow } from "date-fns";

interface Props {
  date?: string;
}

export default function RelativeTime({
  date,
}: Props) {
  if (!date)
    return (
      <span className="text-slate-500">
        —
      </span>
    );

  return (
    <span className="text-sm text-slate-400">
      {formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })}
    </span>
  );
}