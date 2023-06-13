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
        "mx-3 flex min-w-[68px] basis-10 items-center rounded-[5px] pl-1.5 pr-3 text-content-primary transition-colors duration-300",
        "focus-visible:bg-quaternary-hover-fill focus-visible:text-quaternary-hover-tint",
        "enabled:hover:bg-quaternary-hover-fill enabled:hover:text-quaternary-hover-tint",
        "disabled:cursor-not-allowed disabled:text-quaternary-disabled-tint",
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
