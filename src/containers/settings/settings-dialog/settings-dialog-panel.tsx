import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
} from "@floating-ui/react";
import clsx from "clsx";
import type { ReactNode } from "react";
import { useSettingsDialog } from "./settings-dialog";

type PanelProps = {
  children: ReactNode;
};

export default function SettingsDialogPanel({ children }: PanelProps) {
  const { context, getFloatingProps, labelId, open, refs } = useSettingsDialog(
    "SettingsDialogPanel",
  );

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
            aria-labelledby={labelId}
            className={clsx(
              "grid h-full max-h-[940px] w-full max-w-[960px] overflow-hidden rounded-[10px]",
              "bg-background-base-primary text-display-primary-idle-tint",
              "shadow-[0_2px_8px_rgba(0,0,0,.16)]",
              "transition-[max-width] duration-200 ease-[cubic-bezier(.42,0,.58,1)]",
              "max-[1000px]:max-w-3xl",
              "max-[580px]:max-w-full",
              "min-[1200px]:max-w-[1060px]",
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
