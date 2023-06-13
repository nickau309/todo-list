import React from "react";
import { RemoveIcon16 } from "@assets";
import { classNames } from "@utils";

export default function RemoveButton({ onClick, ...attr }) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={classNames(
        "h-4 w-4 rounded-[5px] border border-transparent text-quaternary-tint transition-shadow duration-300 ease-[cubic-bezier(.25,.1,.25,1)]",
        "hover:bg-quaternary-on-hover-fill hover:text-quaternary-on-hover-tint",
        "focus-visible:bg-quaternary-hover-fill focus-visible:text-quaternary-hover-tint",
        "focus-visible:outline-none focus-visible:ring focus-visible:ring-outer focus-visible:ring-offset-1 focus-visible:ring-offset-inner"
      )}
      {...attr}
    >
      <RemoveIcon16 className="h-full w-full" />
    </button>
  );
}
