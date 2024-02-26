import React, { forwardRef } from "react";
import { classNames } from "@/utils";

const Button = forwardRef(function Button(
  { children, className, ...attr },
  ref,
) {
  return (
    <button
      ref={ref}
      className={classNames(
        "px-2.5 py-1",
        "hover:bg-menu-item-primary-hover focus-visible:bg-menu-item-primary-hover focus-visible:outline-none",
        className,
      )}
      {...attr}
      tabIndex={undefined}
    >
      {children}
    </button>
  );
});

export default Button;
