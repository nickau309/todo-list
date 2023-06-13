import React from "react";
import { classNames } from "@utils";

export default function PieChartIcon10({ numerator, denominator }) {
  const isLargeArc = numerator * 2 > denominator;
  const x = 5 + 5 * Math.sin((numerator / denominator) * 2 * Math.PI);
  const y = 5 - 5 * Math.cos((numerator / denominator) * 2 * Math.PI);

  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={classNames(
          "M5 5 L5 0",
          isLargeArc && "A5 5 0 0 1 5 10",
          `A5 5 0 0 1 ${x.toFixed(4)} ${y.toFixed(4)}`,
          "Z"
        )}
        fill="currentColor"
      />
    </svg>
  );
}
