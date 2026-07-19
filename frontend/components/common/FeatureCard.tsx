
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function FeatureCard({
  icon: Icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <Card className="group border-slate-800 bg-slate-900 transition-all duration-300 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10">
      <CardContent className="p-6">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
          <Icon className="h-6 w-6 text-blue-500" />
        </div>

        <h3 className="mb-2 text-xl font-semibold text-white">
          {title}
        </h3>

        <p className="text-sm leading-6 text-slate-400">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}