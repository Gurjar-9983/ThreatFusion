
"use client";

import {
  Globe,
  Link,
  Shield,
  Fingerprint,
} from "lucide-react";

interface Props {
  type: string;
}

export default function IOCTypeIcon({ type }: Props) {
  switch (type.toLowerCase()) {
    case "ip":
      return <Globe className="h-4 w-4 text-cyan-400" />;

    case "domain":
      return <Shield className="h-4 w-4 text-green-400" />;

    case "url":
      return <Link className="h-4 w-4 text-yellow-400" />;

    case "hash":
      return (
        <Fingerprint className="h-4 w-4 text-purple-400" />
      );

    default:
      return <Globe className="h-4 w-4 text-slate-400" />;
  }
}