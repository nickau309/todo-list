import React, { forwardRef } from "react";
import { Link } from "react-router-dom";
import { classNames } from "@/utils";

const LinkButton = forwardRef(function LinkButton({ children, ...attr }, ref) {
  return (
    <Link
      ref={ref}
      className={classNames(
        "px-2.5 py-1",
        "hover:bg-menu-item-primary-hover focus-visible:bg-menu-item-primary-hover focus-visible:outline-none",
      )}
      {...attr}
    >
      {children}
    </Link>
  );
});

export default LinkButton;
