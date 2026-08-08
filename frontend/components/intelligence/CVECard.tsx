
interface Props {
  cves: string[];
}

export default function CVECard({
  cves,
}: Props) {

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">

      <h3 className="mb-4 text-lg font-semibold">

        Related CVEs

      </h3>

      {cves.length === 0 ? (

        <p className="text-slate-400">

          No related CVEs.

        </p>

      ) : (

        <div className="space-y-2">

          {cves.map((cve) => (

            <div
              key={cve}
              className="rounded-lg bg-slate-800 px-3 py-2"
            >

              {cve}

            </div>

          ))}

        </div>

      )}

    </div>
  );
}