import React from "react";
import { useFetcher } from "react-router-dom";
import { DragHandleIcon24, DropdownIcon24 } from "@assets";
import { classNames } from "@utils";

export default function ItemLeftAction({
  controls = null,
  id,
  isCollapsed,
  isCompleted,
  showCollapseButton,
}) {
  const fetcher = useFetcher();

  return (
    <div className="flex">
      {controls && (
        <span
          onPointerDown={(e) => {
            e.preventDefault();
            controls.start(e);
          }}
          className={classNames(
            isCompleted && "hidden",
            "cursor-move rounded-[3px] text-content-secondary opacity-0",
            "hover:bg-base-secondary-hover hover:text-base-primary",
            "group-hover:opacity-100"
          )}
        >
          <DragHandleIcon24 />
        </span>
      )}
      {showCollapseButton && (
        <button
          type="button"
          onClick={() => {
            fetcher.submit(
              { type: "updateTask", id, isCollapsed: !isCollapsed },
              { method: "post" }
            );
          }}
          className="rounded-[3px] text-content-secondary hover:bg-base-secondary-hover hover:text-base-primary"
        >
          <DropdownIcon24 className={isCollapsed ? "-rotate-90" : ""} />
        </button>
      )}
    </div>
  );
}
