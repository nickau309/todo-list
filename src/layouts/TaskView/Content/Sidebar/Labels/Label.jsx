import React from "react";
import { Link, useFetcher, useParams } from "react-router-dom";
import { RemoveIcon24 } from "@assets";
import { bgColor20, classNames, hoverBgColor50, hoverBgColor80 } from "@utils";

export default function Label({ color, id, name, showRemoveButton }) {
  const fetcher = useFetcher();
  const { taskId } = useParams();

  return (
    <Link
      to={`/label/${id}`}
      className={classNames(
        "mb-1 mr-1 inline-flex h-7 max-w-full items-center gap-1 rounded-[5px] px-2 transition-colors duration-300",
        bgColor20[color],
        hoverBgColor50[color],
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-content-secondary"
      )}
    >
      <span className="truncate text-content-primary">{name}</span>
      {showRemoveButton && (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            fetcher.submit(
              { type: "removeTaskLabel", id: taskId, labelId: id },
              { method: "post" }
            );
          }}
          className={classNames(
            "-mr-1 flex h-5 w-5 rounded-[3px]",
            hoverBgColor80[color],
            "hover:text-content-primary",
            "focus-visible:text-content-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-content-secondary"
          )}
          aria-label="Remove label"
        >
          <RemoveIcon24 className="h-5 w-5" />
        </button>
      )}
    </Link>
  );
}
