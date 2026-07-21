
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

export default function AIInsights() {
  return (
    <Card className="border-slate-800 bg-slate-900">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Sparkles className="h-5 w-5 text-blue-500" />
          AI Security Insights
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="rounded-lg bg-slate-800 p-4">
          <p className="text-sm leading-6 text-slate-300">
            Multiple phishing campaigns targeting financial
            organizations have increased during the last 24 hours.
          </p>
        </div>

        <div className="rounded-lg bg-blue-500/10 p-4">
          <h4 className="font-semibold text-blue-400">
            AI Recommendation
          </h4>

          <p className="mt-2 text-sm text-slate-300">
            Review inbound email gateways, monitor suspicious
            domains, and investigate recently registered domains.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}