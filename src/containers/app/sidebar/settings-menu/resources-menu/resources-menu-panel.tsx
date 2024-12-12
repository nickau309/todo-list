import { useStore } from "@/contexts/store-context";
import {
  FloatingFocusManager,
  FloatingList,
  FloatingPortal,
} from "@floating-ui/react";
import clsx from "clsx";
import type { ReactNode } from "react";
import { useResourcesMenu } from "./resources-menu-context";

type PanelProps = {
  children: ReactNode;
};

export default function ResourcesMenuPanel({ children }: PanelProps) {
  const isOpen = useStore((state) => state.resourcesMenu.isOpen);

  const {
    elementsRef,
    labelsRef,
    context,
    floatingStyles,
    refs,
    getFloatingProps,
  } = useResourcesMenu("ResourcesMenuPanel");

  return (
    <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
      {isOpen && (
        <FloatingPortal id="root">
          <FloatingFocusManager
            context={context}
            initialFocus={-1}
            returnFocus={false}
            visuallyHiddenDismiss
          >
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
        </FloatingPortal>
      )}
    </FloatingList>
  );
}
