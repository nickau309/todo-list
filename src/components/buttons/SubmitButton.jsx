import React, { forwardRef } from "react";
import { classNames } from "@/utils";

const SubmitButton = forwardRef(function SubmitButton(
  { children, className, ...attr },
  ref,
) {
  return (
    <button
      ref={ref}
      type="submit"
      className={classNames(
        "flex h-8 items-center justify-center rounded-[5px] border border-transparent bg-primary-fill font-reactist text-[13px] font-semibold text-primary-tint",
        "focus-visible:bg-primary-hover-fill focus-visible:text-primary-hover-tint",
        "enabled:hover:bg-primary-hover-fill enabled:hover:text-primary-hover-tint",
        "enabled:active:scale-[.97] enabled:active:transition-transform enabled:active:duration-200 enabled:active:ease-[cubic-bezier(.02,1.505,.745,1.235)]",
        "disabled:cursor-not-allowed disabled:bg-primary-disabled-fill disabled:text-primary-disabled-tint",
        className,
      )}
      {...attr}
    >
      {children}
    </button>
  );
});

export default SubmitButton;
