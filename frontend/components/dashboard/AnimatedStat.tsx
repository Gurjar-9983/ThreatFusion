
"use client";

import CountUp from "react-countup";

interface Props {
  value: number;
}

export default function AnimatedStat({
  value,
}: Props) {
  return (
    <CountUp
      end={value}
      duration={1.4}
      separator=","
    />
  );
}