
interface Props {
  level: string;
}

export default function SeverityBadge({
  level,
}: Props) {

  const color =
    level === "Critical"
      ? "bg-red-600"
      : level === "High"
      ? "bg-orange-500"
      : level === "Medium"
      ? "bg-yellow-500"
      : "bg-green-600";

  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-semibold text-white ${color}`}
    >
      {level}
    </span>
  );
}