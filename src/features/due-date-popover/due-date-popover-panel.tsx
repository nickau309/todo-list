import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
} from "@floating-ui/react";
import clsx from "clsx";
import { useDueDatePopover } from "./due-date-popover";
import LaterThisWeek from "./later-this-week";
import NextWeek from "./next-week";
import NextWeekend from "./next-weekend";
import NoDate from "./no-date";
import SetDueDateForm from "./set-due-date-form";
import ThisWeekend from "./this-weekend";
import Today from "./today";
import Tomorrow from "./tomorrow";

export default function DueDatePopoverPanel() {
  const { isOpen, context, floatingStyles, refs, getFloatingProps } =
    useDueDatePopover("DueDatePopoverPanel");

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
              "flex w-[250px] flex-col divide-y divide-divider-primary rounded-[10px]",
              "border-scheduler-width border-scheduler-color bg-scheduler text-display-primary-idle-tint shadow-scheduler",
            )}
            {...getFloatingProps()}
          >
            <SetDueDateForm />
            <div className="flex flex-col py-1">
              <Today />
              <Tomorrow />
              <LaterThisWeek />
              <ThisWeekend />
              <NextWeekend />
              <NextWeek />
              <NoDate />
            </div>
          </div>
        </FloatingFocusManager>
      </FloatingOverlay>
    </FloatingPortal>
  );
}
