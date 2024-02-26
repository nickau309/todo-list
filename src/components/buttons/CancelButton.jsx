import React, { forwardRef } from "react";
import { classNames } from "@/utils";

const CancelButton = forwardRef(function CancelButton(
  { children, className, ...attr },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      className={classNames(
        "flex h-8 items-center justify-center rounded-[5px] border border-transparent bg-secondary-fill font-reactist text-[13px] font-semibold text-secondary-tint",
        "focus-visible:bg-secondary-hover-fill focus-visible:text-secondary-hover-tint",
        "enabled:hover:bg-secondary-hover-fill enabled:hover:text-secondary-hover-tint",
        "enabled:active:scale-[.97] enabled:active:transition-transform enabled:active:duration-200 enabled:active:ease-[cubic-bezier(.02,1.505,.745,1.235)]",
        "disabled:cursor-not-allowed disabled:bg-secondary-disabled-fill disabled:text-secondary-disabled-tint",
        className,
      )}
      {...attr}
    >
      {children}
    </button>
  );
});

export default CancelButton;
