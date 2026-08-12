
"use client";

import { Download, Trash2, FileText } from "lucide-react";
import { downloadIOCReport } from "@/lib/services/report";
import { toast } from "sonner";

interface Report {
  id: string;
  ioc_id: string;
  filename: string;
  report_type: string;
  created_by: string;
  created_at: string;
}

interface Props {
  reports: Report[];
  search: string;
  onDelete: (id: string) => void;
}

export default function ReportsTable({
  reports,
  search,
  onDelete,
}: Props) {
  const filtered = reports.filter((report) =>
    report.filename
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (filtered.length === 0) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-12 text-center">
        <FileText className="mx-auto h-12 w-12 text-slate-500" />

        <h3 className="mt-4 text-xl font-semibold">
          No Reports Found
        </h3>

        <p className="mt-2 text-slate-400">
          Generate an IOC report to see it here.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
      <table className="w-full">
        <thead className="bg-slate-800">
          <tr className="text-left text-sm uppercase tracking-wide text-slate-400">
            <th className="px-6 py-4">Filename</th>
            <th className="px-6 py-4">Type</th>
            <th className="px-6 py-4">Created By</th>
            <th className="px-6 py-4">Created</th>
            <th className="px-6 py-4 text-center">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((report) => (
            <tr
              key={report.id}
              className="border-t border-slate-800 hover:bg-slate-800/40 transition"
            >
              <td className="px-6 py-4 font-mono text-cyan-300">
                {report.filename}
              </td>

              <td className="px-6 py-4">
                {report.report_type}
              </td>

              <td className="px-6 py-4">
                {report.created_by}
              </td>

              <td className="px-6 py-4">
                {new Date(
                  report.created_at
                ).toLocaleDateString()}
              </td>

              <td className="px-6 py-4">
                <div className="flex justify-center gap-3">

                  <button
                    onClick={async () => {
                      try {
                        await downloadIOCReport(report.ioc_id);
                        toast.success("PDF downloaded successfully");
                      } catch (error) {
                        console.error("PDF download failed:", error);
                        toast.error("Failed to download PDF");
                      }
                    }}
                    className="rounded-lg bg-cyan-600 p-2 hover:bg-cyan-700 transition"
                    title="Download PDF"
                  >
                    <Download className="h-4 w-4 text-white" />
                  </button>

                  <button
                    onClick={() => onDelete(report.id)}
                    className="rounded-lg bg-red-600 p-2 hover:bg-red-700 transition"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4 text-white" />
                  </button>

                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}