
import {api} from "../api";

export async function getReports() {
  const { data } = await api.get("/reports");
  return data;
}

export async function getReportStats() {
  const { data } = await api.get("/reports/stats");
  return data;
}

export async function getIOCReport(iocId: string) {
  const { data } = await api.get(`/reports/ioc/${iocId}`);
  return data;
}

export async function downloadIOCReport(iocId: string) {
  const response = await api.get(
    `/reports/ioc/${iocId}/pdf`,
    {
      responseType: "blob",
    }
  );

  const blob = new Blob([response.data], {
    type: "application/pdf",
  });

  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `ioc-report-${iocId}.pdf`;

  document.body.appendChild(link);
  link.click();
  link.remove();

  window.URL.revokeObjectURL(url);
}

export async function deleteReport(id: string) {
  await api.delete(`/reports/${id}`);
}