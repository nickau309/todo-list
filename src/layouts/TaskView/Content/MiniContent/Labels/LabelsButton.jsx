import React, { forwardRef } from "react";
import { classNames } from "@utils";
import { AddButton } from "../components";

const LabelsButton = forwardRef(function LabelsButton(
  { children, className, labelIdsLength, ...attr },
  ref
) {
  return labelIdsLength ? (
    <button
      ref={ref}
      type="button"
      className={classNames(
        "-mx-2 flex h-7 min-w-[68px] max-w-full items-center rounded-[5px] border border-transparent px-2 text-quaternary-tint transition-colors duration-300",
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
  ) : (
    <AddButton ref={ref} className={className} {...attr}>
      {children}
    </AddButton>
  );
});

export default LabelsButton;
