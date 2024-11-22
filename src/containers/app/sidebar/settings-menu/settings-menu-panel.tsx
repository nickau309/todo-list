import { useSidebarState } from "@/contexts/sidebar-context";
import {
  FloatingFocusManager,
  FloatingList,
  FloatingOverlay,
  FloatingPortal,
} from "@floating-ui/react";
import clsx from "clsx";
import type { ReactNode } from "react";
import { useSettingsMenu } from "./settings-menu-context";

type PanelProps = {
  children: ReactNode;
};

export default function SettingsMenuPanel({ children }: PanelProps) {
  const { isSettingsMenuOpen } = useSidebarState();

  const {
    elementsRef,
    labelsRef,
    context,
    floatingStyles,
    refs,
    getFloatingProps,
  } = useSettingsMenu("SettingsMenuPanel");

  return (
    <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
      {isSettingsMenuOpen && (
        <FloatingPortal id="root">
          <FloatingOverlay lockScroll className="z-30">
            <FloatingFocusManager context={context} visuallyHiddenDismiss>
              <div
                ref={refs.setFloating}
                className={clsx(
                  "z-30 box-content",
                  "flex min-w-[280px] max-w-[300px] overflow-hidden rounded-[10px] border border-divider-primary",
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
