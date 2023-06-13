import React from "react";
import { Link } from "react-router-dom";
import { LabelIconOutline12 } from "@assets";
import { classNames, textColor } from "@utils";

export default function LabelLink({ color, id, isCompleted, name }) {
  return (
    <Link
      to={`/label/${id}`}
      onClick={(e) => e.stopPropagation()}
      className={classNames(
        "flex items-center gap-0.5 hover:underline",
        isCompleted ? "text-charcoal" : textColor[color]
      )}
    >
      <span>
        <LabelIconOutline12 />
      </span>
      <span className="max-w-[136px] truncate text-xs">{name}</span>
    </Link>
  );
}
