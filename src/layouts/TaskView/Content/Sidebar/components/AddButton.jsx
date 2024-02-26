import React, { forwardRef } from "react";
import { classNames } from "@/utils";

const AddButton = forwardRef(function AddButton(
  { children, className, ...attr },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      className={classNames(
        "-mx-2 flex basis-7 items-center rounded-[5px] border border-transparent px-2 text-quaternary-tint transition-colors duration-300",
        "focus-visible:bg-quaternary-hover-fill focus-visible:text-quaternary-hover-tint",
        "enabled:hover:bg-quaternary-hover-fill enabled:hover:text-quaternary-hover-tint",
        "enabled:active:scale-[.97] enabled:active:transition-transform enabled:active:duration-200 enabled:active:ease-[cubic-bezier(.02,1.505,.745,1.235)]",
        "disabled:cursor-not-allowed disabled:font-semibold disabled:text-quaternary-disabled-tint",
        className,
      )}
      {...attr}
      tabIndex={undefined}
    >
      {children}
    </button>
  );
});

export default AddButton;
