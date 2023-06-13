import React, { forwardRef } from "react";
import { classNames } from "@utils";

const ModifyButton = forwardRef(function ModifyButton(
  { children, className, ...attr },
  ref
) {
  return (
    <button
      ref={ref}
      type="button"
      className={classNames(
        "-mx-2 flex basis-7 items-center rounded-[5px] border border-transparent px-2 text-content-primary transition-colors duration-300",
        "focus-visible:bg-quaternary-hover-fill",
        "enabled:hover:bg-quaternary-hover-fill",
        "enabled:active:scale-[.97] enabled:active:transition-transform enabled:active:duration-200 enabled:active:ease-[cubic-bezier(.02,1.505,.745,1.235)]",
        "disabled:cursor-not-allowed disabled:font-semibold disabled:text-quaternary-disabled-tint",
        className
      )}
      {...attr}
      tabIndex={undefined}
    >
      {children}
    </button>
  );
});

export default ModifyButton;
