import React, { forwardRef } from "react";
import { classNames } from "@utils";

const QuaternaryButton = forwardRef(function QuaternaryButton(
  { children, className, ...attr },
  ref
) {
  return (
    <button
      ref={ref}
      type="button"
      className={classNames(
        "flex h-8 items-center justify-center rounded-[5px] border border-transparent font-reactist text-[13px] font-semibold text-quaternary-tint",
        "focus-visible:bg-quaternary-hover-fill focus-visible:text-quaternary-hover-tint",
        "enabled:hover:bg-quaternary-hover-fill enabled:hover:text-quaternary-hover-tint",
        "enabled:active:scale-[.97] enabled:active:transition-transform enabled:active:duration-200 enabled:active:ease-[cubic-bezier(.02,1.505,.745,1.235)]",
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

export default QuaternaryButton;
