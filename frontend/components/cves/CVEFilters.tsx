
"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  limit: number;
  severity: string;
  keyword: string;

  onLimitChange: (value: number) => void;
  onSeverityChange: (value: string) => void;
  onKeywordChange: (value: string) => void;
}

export default function CVEFilters({
  limit,
  severity,
  keyword,
  onLimitChange,
  onSeverityChange,
  onKeywordChange,
}: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-3">

      <Input
        placeholder="Search CVE ID or description..."
        value={keyword}
        onChange={(e) => onKeywordChange(e.target.value)}
      />

      <Select
        value={severity}
        onValueChange={onSeverityChange}
      >
        <SelectTrigger>
          <SelectValue placeholder="All Severities" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="">All Severities</SelectItem>
          <SelectItem value="CRITICAL">Critical</SelectItem>
          <SelectItem value="HIGH">High</SelectItem>
          <SelectItem value="MEDIUM">Medium</SelectItem>
          <SelectItem value="LOW">Low</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={String(limit)}
        onValueChange={(value) => onLimitChange(Number(value))}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="10">10 Results</SelectItem>
          <SelectItem value="20">20 Results</SelectItem>
          <SelectItem value="50">50 Results</SelectItem>
          <SelectItem value="100">100 Results</SelectItem>
        </SelectContent>
      </Select>

    </div>
  );
}