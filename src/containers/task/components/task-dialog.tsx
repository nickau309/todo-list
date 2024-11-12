import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import clsx from "clsx";
import type { ReactNode } from "react";

type DialogProps = {
  children: ReactNode;
  onOpenChange: (open: boolean) => void;
  open: boolean;
};

export default function TaskDialog({
  children,
  onOpenChange,
  open,
}: DialogProps) {
  const { context, refs } = useFloating({ open, onOpenChange });

  const role = useRole(context);
  const dismiss = useDismiss(context, { outsidePressEvent: "mousedown" });

  const { getFloatingProps } = useInteractions([role, dismiss]);

  if (!open) {
    return null;
  }

  return (
    <FloatingPortal id="root">
      <FloatingOverlay
        lockScroll
        className={clsx(
          "z-30 grid h-full place-items-center bg-black/50 px-8 py-16",
          "transition-[padding] duration-500 ease-[cubic-bezier(.42,0,.58,1)]",
          "max-[580px]:p-0",
        )}
      >
        <FloatingFocusManager context={context}>
          <div
            ref={refs.setFloating}
            className={clsx(
              "grid h-full w-full max-w-[864px] overflow-hidden rounded-[10px]",
              "bg-background-base-primary text-display-primary-idle-tint",
              "shadow-[0_2px_8px_rgba(0,0,0,.16)]",
            )}
            {...getFloatingProps()}
          >
            {children}
          </div>
        </FloatingFocusManager>
      </FloatingOverlay>
    </FloatingPortal>
  );
}
