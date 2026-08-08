
interface Props {
  data: any;
}

export default function VirusTotalCard({
  data,
}: Props) {
  if (!data) return null;

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">

      <h3 className="mb-4 text-lg font-semibold">
        VirusTotal
      </h3>

      <div className="space-y-2">

        <p>
          Malicious:
          <strong> {data.malicious}</strong>
        </p>

        <p>
          Suspicious:
          <strong> {data.suspicious}</strong>
        </p>

        <p>
          Harmless:
          <strong> {data.harmless}</strong>
        </p>

        <p>
          Undetected:
          <strong> {data.undetected}</strong>
        </p>

      </div>

    </div>
  );
}