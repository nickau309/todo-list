import React, { Fragment } from "react";
import { useFetcher } from "react-router-dom";
import { autoUpdate, flip, useFloating } from "@floating-ui/react-dom";
import { Popover } from "@headlessui/react";
import { DueDateIcon12 } from "@/assets";
import { DueDateDropdown } from "@/components/dropdowns";
import {
  classNames,
  getDueDateClassName,
  getDueDateDescription,
} from "@/utils";

export default function DueDateButton({ dueDate, id, isCompleted }) {
  const fetcher = useFetcher();

  const { refs, floatingStyles } = useFloating({
    placement: "left",
    strategy: "fixed",
    middleware: [flip()],
    whileElementsMounted: autoUpdate,
  });

  return (
    <Popover as={Fragment}>
      <Popover.Button
        ref={refs.setReference}
        onClick={(e) => e.stopPropagation()}
        disabled={isCompleted}
        className={classNames(
          "flex items-center gap-0.5",
          isCompleted ? "text-content-secondary" : getDueDateClassName(dueDate),
          "disabled:cursor-pointer",
        )}
      >
        <span>
          <DueDateIcon12 />
        </span>
        <span className="text-xs/none">{getDueDateDescription(dueDate)}</span>
      </Popover.Button>
      <DueDateDropdown
        ref={refs.setFloating}
        dueDate={dueDate}
        setDueDate={(dueDate) => {
          fetcher.submit(
            { type: "updateTask", id, dueDate },
            { method: "post" },
          );
        }}
        onClick={(e) => e.stopPropagation()}
        style={floatingStyles}
      />
    </Popover>
  );
}
