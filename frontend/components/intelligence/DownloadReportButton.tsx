"use client";

import { downloadIOCReport } from "@/lib/services/report";

interface Props {
  id: string;
}

export default function DownloadReportButton({ id }: Props) {
  async function handleDownload() {
    try {
      await downloadIOCReport(id);
    } catch (error) {
      console.error("Failed to download IOC report:", error);
      alert("Failed to download report.");
    }
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      className="inline-flex rounded-lg bg-cyan-600 px-4 py-2 text-white hover:bg-cyan-700"
    >
      Download PDF Report
    </button>
  );
}
