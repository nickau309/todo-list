import {
  FloatingFocusManager,
  FloatingList,
  FloatingOverlay,
  FloatingPortal,
} from "@floating-ui/react";
import clsx from "clsx";
import CreateLabelForm from "./create-label-form";
import { useLabelsDropdown } from "./labels-dropdown";

export default function LabelsDropdownPanel() {
  const { isOpen, listRef, context, floatingStyles, refs, getFloatingProps } =
    useLabelsDropdown("LabelsDropdownPanel");

  return (
    <FloatingList elementsRef={listRef}>
      {isOpen && (
        <FloatingPortal id="root">
          <FloatingOverlay lockScroll className="z-40">
            <FloatingFocusManager context={context}>
              <div
                ref={refs.setFloating}
                style={floatingStyles}
                className={clsx(
                  "box-content w-full max-w-[300px] overflow-hidden rounded-[10px]",
                  "border border-dropdown bg-dropdown text-dropdown shadow-dropdown",
                  "focus-visible:outline-none",
                )}
                {...getFloatingProps()}
              >
                <CreateLabelForm />
              </div>
            </FloatingFocusManager>
          </FloatingOverlay>
        </FloatingPortal>
      )}
    </FloatingList>
  );
}
