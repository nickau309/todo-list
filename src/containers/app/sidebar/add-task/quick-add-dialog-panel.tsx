import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
} from "@floating-ui/react";
import clsx from "clsx";
import type { ReactNode } from "react";
import { useQuickAddDialog } from "./quick-add-dialog";

type PanelProps = {
  children: ReactNode;
};

export default function QuickAddDialogPanel({ children }: PanelProps) {
  const { context, refs, getFloatingProps, isMounted, styles } =
    useQuickAddDialog("QuickAddDialogPanel");

  if (!isMounted) {
    return null;
  }

  return (
    <FloatingPortal id="root">
      <FloatingOverlay
        lockScroll
        className={clsx(
          "z-30",
          "flex h-full items-start justify-center px-8 py-[13vh]",
          "ease-[cubic-bezier(.165,.84,.44,1)]",
        )}
        style={styles}
      >
        <FloatingFocusManager context={context}>
          <div
            ref={refs.setFloating}
            className={clsx(
              "flex max-h-full w-full max-w-[580px] overflow-hidden rounded-[10px] border-quick-add-width border-quick-add-color",
              "bg-background-base-primary text-display-primary-idle-tint",
              "shadow-quick-add",
              "transition-[max-width] duration-200 ease-[cubic-bezier(.42,0,.58,1)]",
              "min-[751px]:max-w-[550px]",
            )}
            {...getFloatingProps()}
          >
            <div className="min-w-0 flex-1 overflow-y-auto overflow-x-hidden">
              {children}
            </div>
          </div>
        </FloatingFocusManager>
      </FloatingOverlay>
    </FloatingPortal>
  );
}
