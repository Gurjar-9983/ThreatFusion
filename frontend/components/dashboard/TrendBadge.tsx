
interface Props {
  positive?: boolean;
  text: string;
}

export default function TrendBadge({
  positive = true,
  text,
}: Props) {
  return (
    <span
      className={`rounded-full px-2 py-1 text-xs font-medium ${
        positive
          ? "bg-green-500/15 text-green-400"
          : "bg-red-500/15 text-red-400"
      }`}
    >
      {positive ? "▲" : "▼"} {text}
    </span>
  );
}