import React, { Fragment, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { autoUpdate, flip, useFloating } from "@floating-ui/react-dom";
import { Popover } from "@headlessui/react";
import { DueDateIcon16 } from "@assets";
import { DueDateDropdown } from "@components/dropdowns";
import { classNames, getDueDateClassName, getDueDateDescription } from "@utils";
import { InputButton, RemoveButton } from "./components";

export default function ChooseDueDate({ editId, editType }) {
  const { tasks } = useLoaderData();

  const [dueDate, setDueDate] = useState(() =>
    editId && editType === "editTask"
      ? tasks.find((t) => t.id === editId).dueDate
      : null
  );

  const { refs, floatingStyles } = useFloating({
    placement: "left",
    middleware: [flip()],
    whileElementsMounted: autoUpdate,
  });

  const className = getDueDateClassName(dueDate);
  const description = getDueDateDescription(dueDate);

  return (
    <>
      <input type="hidden" value={String(dueDate)} name="dueDate" readOnly />
      <Popover as={Fragment}>
        <Popover.Button
          ref={refs.setReference}
          as={InputButton}
          className={classNames("group/dueDate", className)}
        >
          <span
            className={
              className && className === "text-date-future"
                ? "group-hover/dueDate:text-quaternary-hover-tint group-focus-visible/dueDate:text-quaternary-hover-tint"
                : ""
            }
          >
            <DueDateIcon16 />
          </span>
          <span className="font-reactist text-[13px]">
            {dueDate ? description : "Due date"}
          </span>
          {dueDate && (
            <RemoveButton
              onClick={() => setDueDate(null)}
              aria-label="Remove due date"
            />
          )}
        </Popover.Button>
        <DueDateDropdown
          ref={refs.setFloating}
          dueDate={dueDate}
          setDueDate={setDueDate}
          style={floatingStyles}
        />
      </Popover>
    </>
  );
}
