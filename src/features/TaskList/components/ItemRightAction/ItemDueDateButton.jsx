import React, { Fragment } from "react";
import { useFetcher, useLoaderData } from "react-router-dom";
import { autoUpdate, flip, shift, useFloating } from "@floating-ui/react-dom";
import { Popover } from "@headlessui/react";
import { DueDateIcon24 } from "@/assets";
import { DueDateDropdown } from "@/components/dropdowns";
import { classNames } from "@/utils";

export default function ItemDueDateButton({ id }) {
  const fetcher = useFetcher();
  const { tasks } = useLoaderData();

  const { refs, floatingStyles } = useFloating({
    placement: "bottom",
    strategy: "fixed",
    middleware: [flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const { dueDate } = tasks.find((t) => t.id === id);

  return (
    <Popover as={Fragment}>
      <Popover.Button
        ref={refs.setReference}
        type="button"
        aria-label="Due date"
        className={({ open }) => {
          return classNames(
            "hidden aspect-square w-6 place-items-center rounded-[3px] text-content-secondary",
            "hover:bg-base-secondary-hover hover:text-base-primary",
            "focus-visible:bg-base-secondary-hover focus-visible:text-base-primary",
            !open &&
              "opacity-0 group-focus-within/action:opacity-100 group-hover:opacity-100",
            "min-[810px]:grid",
          );
        }}
      >
        <DueDateIcon24 />
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
        style={floatingStyles}
      />
    </Popover>
  );
}
