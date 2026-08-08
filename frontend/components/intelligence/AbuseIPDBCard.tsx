
interface Props {
  data: any;
}

export default function AbuseIPDBCard({
  data,
}: Props) {
  if (!data) return null;

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">

      <h3 className="mb-4 text-lg font-semibold">
        AbuseIPDB
      </h3>

      <div className="space-y-2">

        <p>Country: {data.country}</p>

        <p>ISP: {data.isp}</p>

        <p>Reports: {data.total_reports}</p>

        <p>
          Confidence:
          {data.abuse_confidence_score}%
        </p>

      </div>

    </div>
  );
}