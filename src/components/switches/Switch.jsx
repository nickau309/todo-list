import React from "react";
import { classNames } from "@/utils";

export default function Switch({ className, isChecked, ...attr }) {
  return (
    <button
      type="button"
      className={classNames(
        "relative inline-flex h-[18px] w-8 items-center rounded-full",
        isChecked ? "bg-toggle-checked" : "bg-toggle",
        "p-[3px]",
        className,
      )}
      {...attr}
    >
      <span
        className={classNames(
          "inline-block h-3 w-3",
          isChecked && "translate-x-3.5",
          "rounded-full bg-white transition-transform duration-[280ms]",
        )}
      />
    </button>
  );
}
