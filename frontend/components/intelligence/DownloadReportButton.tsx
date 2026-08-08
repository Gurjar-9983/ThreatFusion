
import { downloadIOCReport } from "@/lib/services/report";

interface Props {
  id: string;
}

export default function DownloadReportButton({
  id,
}: Props) {
  return (
    <a
      href={downloadIOCReport(id)}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex rounded-lg bg-cyan-600 px-4 py-2 text-white hover:bg-cyan-700"
    >
      Download PDF Report
    </a>
  );
}