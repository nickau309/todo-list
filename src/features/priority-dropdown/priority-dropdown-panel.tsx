import { PRIORITY_ITEMS } from "@/constants/task/priority";
import {
  FloatingFocusManager,
  FloatingList,
  FloatingOverlay,
  FloatingPortal,
} from "@floating-ui/react";
import clsx from "clsx";
import type { KeyboardEvent } from "react";
import { usePriorityDropdown } from "./priority-dropdown";
import PriorityDropdownOption from "./priority-dropdown-option";

export default function PriorityDropdownPanel() {
  const {
    setSelectedItem,
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
            <FloatingFocusManager context={context}>
              <div
                ref={refs.setFloating}
                aria-label="Select a priority"
                style={floatingStyles}
                className={clsx(
                  "box-content flex max-h-[300px] max-w-full flex-col overflow-hidden rounded-[10px]",
                  "border border-dropdown bg-dropdown font-sans text-dropdown shadow-dropdown",
                  "focus-visible:outline-none",
                )}
                {...getFloatingProps({
                  onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
                    if (e.key === "Enter" && activeIndex !== null) {
                      setSelectedItem(PRIORITY_ITEMS[activeIndex]);
                      setIsOpen(false);
                    } else if (e.key === "") {
                      e.preventDefault();
                    }
                  },
                })}
              >
                <div className="flex flex-col overflow-y-auto overflow-x-hidden">
                  {PRIORITY_ITEMS.map((item) => (
                    <PriorityDropdownOption key={item.priority} item={item} />
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
