import React, { forwardRef } from "react";
import { Link } from "react-router-dom";
import { classNames } from "@/utils";

const QuaternaryLink = forwardRef(function QuaternaryLink(
  { children, className, ...attr },
  ref,
) {
  return (
    <Link
      ref={ref}
      role="button"
      className={classNames(
        "flex h-8 items-center justify-center rounded-[5px] border border-transparent font-reactist text-[13px] font-semibold text-quaternary-tint",
        "hover:bg-quaternary-hover-fill hover:text-quaternary-hover-tint",
        "focus-visible:bg-quaternary-hover-fill focus-visible:text-quaternary-hover-tint",
        "active:scale-[.97] active:transition-transform active:duration-200 active:ease-[cubic-bezier(.02,1.505,.745,1.235)]",
        "aria-disabled:cursor-not-allowed aria-disabled:text-quaternary-disabled-tint",
        className,
      )}
      {...attr}
      tabIndex={undefined}
    >
      {children}
    </Link>
  );
});

export default QuaternaryLink;
