import React, { forwardRef } from "react";
import { classNames } from "@utils";

const InputButton = forwardRef(function InputButton(
  { children, className, ...attr },
  ref
) {
  return (
    <div
      ref={ref}
      role="button"
      className={classNames(
        "flex h-7 items-center gap-1 rounded-[5px] border border-chip px-1.5 text-content-secondary transition-shadow duration-300 ease-[cubic-bezier(.25,.1,.25,1)]",
        "hover:bg-quaternary-hover-fill",
        "focus-within:bg-quaternary-hover-fill",
        "focus-visible:outline-none focus-visible:ring focus-visible:ring-outer focus-visible:ring-offset-1 focus-visible:ring-offset-inner",
        className
      )}
      {...attr}
      tabIndex="0"
    >
      {children}
    </div>
  );
});

export default InputButton;
