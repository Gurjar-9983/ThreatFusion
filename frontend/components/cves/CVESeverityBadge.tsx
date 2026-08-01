
"use client";

import { Badge } from "@/components/ui/badge";

interface Props {
  severity: string;
}

export default function CVESeverityBadge({ severity }: Props) {
  const colors: Record<string, string> = {
    CRITICAL: "bg-red-600 text-white",
    HIGH: "bg-orange-500 text-white",
    MEDIUM: "bg-yellow-500 text-black",
    LOW: "bg-green-600 text-white",
    UNKNOWN: "bg-gray-500 text-white",
  };

  return (
    <Badge className={colors[severity] ?? colors.UNKNOWN}>
      {severity}
    </Badge>
  );
}