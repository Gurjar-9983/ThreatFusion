"use client";

import { IOC } from "@/lib/types/ioc";
import { downloadIOCReport } from "@/lib/services/report";
import { deleteIOC } from "@/lib/services/ioc";
import { toast } from "sonner";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import IOCBadge from "./IOCBadge";
import IOCTypeIcon from "./IOCTypeIcon";
import RelativeTime from "./RelativeTime";
import RiskBadge from "./RiskBadge";
import { Button } from "../ui/button";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ioc: IOC | null;
  onDeleted?: () => void;
}

export default function IOCDetailsDrawer({
  open,
  onOpenChange,
  ioc,
  onDeleted,
}: Props) {
  if (!ioc) return null;

  const risk =
    ioc.severity === "high"
      ? 92
      : ioc.severity === "medium"
      ? 68
      : 28;

  async function handleExportPDF() {
    if (!ioc) return;

    try {
      await downloadIOCReport(ioc.id);
      toast.success("PDF downloaded successfully");
    } catch (error) {
      console.error("PDF download failed:", error);
      toast.error("Failed to download PDF");
    }
  }

  async function handleDelete() {
    if (!ioc) return;

    const confirmed = window.confirm(
      `Delete IOC "${ioc.value}"? This cannot be undone.`
    );

    if (!confirmed) return;

    try {
      await deleteIOC(ioc.id);

      toast.success("IOC deleted successfully");

      onOpenChange(false);
      onDeleted?.();
    } catch (error) {
      console.error("IOC delete failed:", error);
      toast.error("Failed to delete IOC");
    }
  }

  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
    >
      <SheetContent
        side="right"
        className="w-full border-slate-800 bg-slate-950 text-white sm:max-w-xl"
      >
        <SheetHeader>
          <SheetTitle className="text-white">
            IOC Intelligence
          </SheetTitle>
        </SheetHeader>

        <div className="mt-8 space-y-8 pb-8">

          {/* IOC */}

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <div className="flex items-center gap-3">
              <IOCTypeIcon type={ioc.type} />

              <div>
                <p className="text-sm text-slate-400">
                  Indicator
                </p>

                <h2 className="font-mono text-lg text-cyan-300">
                  {ioc.value}
                </h2>
              </div>
            </div>
          </div>

          {/* Threat Score */}

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">
              Threat Score
            </p>

            <div className="mt-3 flex items-center justify-between">
              <div className="text-4xl font-bold">
                {risk}
              </div>

              <RiskBadge score={risk} />
            </div>
          </div>

          {/* Metadata */}

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <div className="space-y-5">

              <Item
                label="Severity"
                value={
                  <IOCBadge severity={ioc.severity} />
                }
              />

              <Item
                label="Source"
                value={ioc.source}
              />

              <Item
                label="Created"
                value={
                  <RelativeTime date={ioc.created_at} />
                }
              />

              <Item
                label="Updated"
                value={
                  <RelativeTime date={ioc.updated_at} />
                }
              />

            </div>
          </div>

          {/* Description */}

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <p className="mb-2 text-sm text-slate-400">
              Description
            </p>

            <p className="text-sm leading-7 text-slate-300">
              {ioc.description || "No description available."}
            </p>
          </div>

          {/* Actions */}

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <div className="grid grid-cols-2 gap-3">

              <Button>
                Enrich IOC
              </Button>

              <Button
                variant="secondary"
                onClick={handleExportPDF}
              >
                Export PDF
              </Button>

              <Button variant="outline">
                Share
              </Button>

              <Button
                variant="destructive"
                onClick={handleDelete}
              >
                Delete
              </Button>

            </div>
          </div>

        </div>
      </SheetContent>
    </Sheet>
  );
}

function Item({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-slate-400">
        {label}
      </span>

      <div>
        {value}
      </div>
    </div>
  );
}
