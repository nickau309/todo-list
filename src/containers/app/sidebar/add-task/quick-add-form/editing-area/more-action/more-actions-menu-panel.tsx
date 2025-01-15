import {
  FloatingFocusManager,
  FloatingList,
  FloatingOverlay,
  FloatingPortal,
} from "@floating-ui/react";
import clsx from "clsx";
import type { ReactNode } from "react";
import { useMoreActionsMenu } from "./more-actions-menu";

type PanelProps = {
  children: ReactNode;
};

export default function MoreActionsMenuPanel({ children }: PanelProps) {
  const {
    isOpen,
    elementsRef,
    labelsRef,
    context,
    floatingStyles,
    refs,
    getFloatingProps,
  } = useMoreActionsMenu("MoreActionsMenuPanel");

  return (
    <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
      {isOpen && (
        <FloatingPortal id="root">
          <FloatingOverlay lockScroll className="z-40">
            <FloatingFocusManager context={context} visuallyHiddenDismiss>
              <div
                ref={refs.setFloating}
                className={clsx(
                  "z-40 box-content",
                  "flex w-full max-w-[248px] overflow-hidden rounded-[10px] border border-divider-primary",
                  "bg-background-raised-primary text-display-primary-idle-tint",
                  "shadow-[0_0_8px_rgba(0,0,0,.12)]",
                  "focus-visible:outline-none",
                )}
                style={floatingStyles}
                {...getFloatingProps()}
              >
                <div className="min-w-0 flex-1 overflow-y-auto overflow-x-hidden">
                  {children}
                </div>
              </div>
            </FloatingFocusManager>
          </FloatingOverlay>
        </FloatingPortal>
      )}
    </FloatingList>
  );
}
