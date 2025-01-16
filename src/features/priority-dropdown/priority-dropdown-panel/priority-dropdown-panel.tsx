import {
  FloatingFocusManager,
  FloatingList,
  FloatingOverlay,
  FloatingPortal,
} from "@floating-ui/react";
import clsx from "clsx";
import type { KeyboardEvent } from "react";
import { usePriorityDropdown } from "../priority-dropdown";
import PriorityDropdownOption from "./priority-dropdown-option";

const PRIORITY_OPTIONS = [1, 2, 3, 4] as const;

export default function PriorityDropdownPanel() {
  const {
    setSelectedPriority,
    isOpen,
    setIsOpen,
    activeIndex,
    elementsRef,
    labelsRef,
    context,
    floatingStyles,
    refs,
    getFloatingProps,
  } = usePriorityDropdown("PriorityDropdownPanel");

  return (
    <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
      {isOpen && (
        <FloatingPortal id="root">
          <FloatingOverlay lockScroll className="z-40">
            <FloatingFocusManager context={context} visuallyHiddenDismiss>
              <div
                ref={refs.setFloating}
                aria-label="Select a priority"
                style={floatingStyles}
                className={clsx(
                  "box-content",
                  "flex max-h-[300px] max-w-full overflow-hidden rounded-[10px] border border-dropdown",
                  "bg-dropdown text-dropdown",
                  "shadow-dropdown",
                  "focus-visible:outline-none",
                )}
                {...getFloatingProps({
                  onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
                    if (e.key === "Enter" && activeIndex !== null) {
                      e.preventDefault();
                      setSelectedPriority(PRIORITY_OPTIONS[activeIndex]);
                      setIsOpen(false);
                    } else if (e.key === " ") {
                      e.preventDefault();
                    }
                  },
                })}
              >
                <div className="min-w-0 flex-1 overflow-y-auto overflow-x-hidden">
                  {PRIORITY_OPTIONS.map((priority) => (
                    <PriorityDropdownOption
                      key={priority}
                      priority={priority}
                    />
                  ))}
                </div>
              </div>
            </FloatingFocusManager>
          </FloatingOverlay>
        </FloatingPortal>
      )}
    </FloatingList>
  );
}
