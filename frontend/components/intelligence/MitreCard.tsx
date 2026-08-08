
interface Props {
  techniques: any[];
}

export default function MitreCard({
  techniques,
}: Props) {

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">

      <h3 className="mb-4 text-lg font-semibold">

        MITRE ATT&CK

      </h3>

      {techniques.length === 0 ? (

        <p className="text-slate-400">

          No ATT&CK mapping available.

        </p>

      ) : (

        <div className="space-y-3">

          {techniques.map((item, index) => (

            <div
              key={index}
              className="rounded-lg border border-slate-800 p-3"
            >

              <p className="font-semibold">

                {item.id}

              </p>

              <p>{item.name}</p>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}