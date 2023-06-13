import React from "react";
import { Link } from "react-router-dom";
import { SubTaskIcon16 } from "@assets";
import { classNames } from "@utils";

export default function ChildLink({
  completeCount,
  isCompleted,
  path,
  totalCount,
}) {
  return (
    <Link
      to={path}
      onClick={(e) => e.stopPropagation()}
      className={classNames(
        "flex items-center",
        isCompleted ? "text-charcoal" : "text-content-secondary",
        "hover:text-base-primary"
      )}
    >
      <span>
        <SubTaskIcon16 />
      </span>
      <span className="text-xs">
        {completeCount}/{totalCount}
      </span>
    </Link>
  );
}
