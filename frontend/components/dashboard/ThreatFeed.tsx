
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const threats = [
  {
    name: "Emotet Malware",
    severity: "Critical",
  },
  {
    name: "Phishing Domain",
    severity: "Medium",
  },
  {
    name: "Malicious IP",
    severity: "High",
  },
];

export default function ThreatFeed() {
  return (
    <Card className="border-slate-800 bg-slate-900">
      <CardHeader>
        <CardTitle className="text-white">
          Live Threat Feed
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {threats.map((threat) => (
          <div
            key={threat.name}
            className="flex items-center justify-between rounded-lg bg-slate-800 p-3"
          >
            <span className="text-white">{threat.name}</span>

            <span className="rounded bg-red-500/20 px-3 py-1 text-xs text-red-400">
              {threat.severity}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}