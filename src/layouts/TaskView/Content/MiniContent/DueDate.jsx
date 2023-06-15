import React, { Fragment } from "react";
import { useFetcher, useParams } from "react-router-dom";
import { autoUpdate, useFloating } from "@floating-ui/react-dom";
import { Popover } from "@headlessui/react";
import { DueDateIcon24, RemoveIcon24 } from "@assets";
import { DueDateDropdown } from "@components/dropdowns";
import { classNames, getDueDateClassName, getDueDateDescription } from "@utils";
import { AddButton, ModifyButton } from "./components";

export default function DueDate({ disabled, dueDate }) {
  const fetcher = useFetcher();
  const { taskId } = useParams();

  const { refs, floatingStyles } = useFloating({
    strategy: "fixed",
    whileElementsMounted: autoUpdate,
  });

  let displayDueDate = dueDate;
  if (fetcher.formData) {
    const formDateDueDate = fetcher.formData.get("dueDate");
    if (formDateDueDate === "null") {
      displayDueDate = null;
    } else {
      displayDueDate = new Date(formDateDueDate);
      displayDueDate.setHours(0, 0, 0, 0);
    }
  }
  const className = getDueDateClassName(displayDueDate);
  const description = getDueDateDescription(displayDueDate);

  const resetDueDate = () => {
    fetcher.submit(
      { type: "updateTask", id: taskId, dueDate: null },
      { method: "post" }
    );
  };

  const DueDateDropdownComponent = (
    <DueDateDropdown
      ref={refs.setFloating}
      dueDate={displayDueDate}
      setDueDate={(dueDate) => {
        fetcher.submit(
          { type: "updateTask", id: taskId, dueDate },
          { method: "post" }
        );
      }}
      style={floatingStyles}
    />
  );

  if (displayDueDate) {
    return (
      <div className="relative flex basis-10">
        <Popover as={Fragment}>
          <Popover.Button
            ref={refs.setReference}
            as={ModifyButton}
            disabled={disabled}
            className={({ open }) => {
              return classNames(
                "peer grow",
                open && "bg-quaternary-hover-fill !text-quaternary-hover-tint"
              );
            }}
          >
            <span className={classNames("mr-3.5", className)}>
              <DueDateIcon24 />
            </span>
            <span className="grow select-none truncate text-left font-reactist leading-8">
              {description}
            </span>
          </Popover.Button>
          {DueDateDropdownComponent}
        </Popover>
        <button
          type="button"
          onClick={resetDueDate}
          disabled={disabled}
          aria-label="Remove due date"
          className={classNames(
            "absolute right-[18px] top-1/2 grid aspect-square h-6 -translate-y-1/2 place-items-center rounded-[5px] text-content-primary opacity-0 transition-colors duration-300",
            "enabled:hover:bg-quaternary-hover-fill enabled:hover:opacity-100",
            "focus-visible:opacity-100",
            "enabled:active:scale-[.97] enabled:active:transition-transform enabled:active:duration-200 enabled:active:ease-[cubic-bezier(.02,1.505,.745,1.235)]",
            "peer-enabled:peer-hover:opacity-100",
            "disabled:cursor-not-allowed"
          )}
        >
          <RemoveIcon24 />
        </button>
      </div>
    );
  } else {
    return (
      <Popover as={Fragment}>
        <Popover.Button
          ref={refs.setReference}
          as={AddButton}
          disabled={disabled}
          className={({ open }) => {
            return classNames(
              open && "bg-quaternary-hover-fill !text-quaternary-hover-tint"
            );
          }}
        >
          <span className="mr-3.5">
            <DueDateIcon24 />
          </span>
          <span className="grow select-none truncate text-left font-reactist leading-8">
            Due date
          </span>
        </Popover.Button>
        {DueDateDropdownComponent}
      </Popover>
    );
  }
}
