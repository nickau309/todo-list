import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
} from "@floating-ui/react";
import clsx from "clsx";
import CreateProjectForm from "./create-project-form";
import { useProjectDropdown } from "./project-dropdown";

export default function ProjectDropdownPanel() {
  const { isOpen, context, floatingStyles, refs, getFloatingProps } =
    useProjectDropdown("ProjectDropdownPanel");

  if (!isOpen) {
    return null;
  }

  return (
    <FloatingPortal id="root">
      <FloatingOverlay lockScroll className="z-40">
        <FloatingFocusManager context={context}>
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            className={clsx(
              "box-content flex w-[300px] flex-col overflow-hidden rounded-[10px]",
              "border border-dropdown bg-dropdown text-dropdown shadow-dropdown",
              "focus-visible:outline-none",
            )}
            {...getFloatingProps()}
          >
            <CreateProjectForm />
          </div>
        </FloatingFocusManager>
      </FloatingOverlay>
    </FloatingPortal>
  );
}
