import React, { forwardRef } from "react";
import { Portal } from "@headlessui/react";
import { useTheme } from "@/contexts";
import { classNames } from "@/utils";

const Z50Portal = forwardRef(function Z50Portal({ children, ...attr }, ref) {
  const { className } = useTheme();

  return (
    <Portal>
      <div ref={ref} className={classNames("z-50", className)} {...attr}>
        {children}
      </div>
    </Portal>
  );
});

export default Z50Portal;
