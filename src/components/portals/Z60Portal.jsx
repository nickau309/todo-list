import React, { forwardRef } from "react";
import { Portal } from "@headlessui/react";
import { useTheme } from "@contexts";
import { classNames } from "@utils";

const Z60Portal = forwardRef(function Z60Portal({ children, ...attr }, ref) {
  const { className } = useTheme();

  return (
    <Portal>
      <div ref={ref} className={classNames("z-[60]", className)} {...attr}>
        {children}
      </div>
    </Portal>
  );
});

export default Z60Portal;
