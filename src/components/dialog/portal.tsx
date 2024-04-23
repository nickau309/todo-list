"use client";

import { FloatingOverlay, FloatingPortal } from "@floating-ui/react";
import type { ComponentPropsWithoutRef } from "react";
import { useDialogContext } from "./dialog";

type PortalProps = ComponentPropsWithoutRef<"div">;

export default function Portal(props: PortalProps) {
  const { isMounted, styles } = useDialogContext("Dialog.Portal");

  if (!isMounted) {
    return null;
  }

  return (
    <FloatingPortal id="root">
      <FloatingOverlay lockScroll className="z-30 bg-black/50" style={styles}>
        <div {...props} />
      </FloatingOverlay>
    </FloatingPortal>
  );
}
