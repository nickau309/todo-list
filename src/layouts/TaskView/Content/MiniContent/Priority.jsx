import React from "react";
import { useFetcher, useParams } from "react-router-dom";
import { autoUpdate, flip, useFloating } from "@floating-ui/react-dom";
import { Listbox } from "@headlessui/react";
import { Priority4Icon24, PriorityIcon24 } from "@assets";
import { PriorityDropdown } from "@components/dropdowns";
import { classNames, priorityTextColor as textColor } from "@utils";
import { ModifyButton } from "./components";

export default function Priority({ disabled, priority }) {
  const fetcher = useFetcher();
  const { taskId } = useParams();

  const { refs, floatingStyles } = useFloating({
    middleware: [flip()],
    whileElementsMounted: autoUpdate,
  });

  const displayPriority = fetcher.formData
    ? Number(fetcher.formData.get("priority"))
    : priority;

  return (
    <Listbox
      disabled={disabled}
      value={displayPriority}
      onChange={(priority) => {
        fetcher.submit(
          { type: "updateTask", id: taskId, priority },
          { method: "post" }
        );
      }}
      name="priority"
    >
      {({ value, open }) => (
        <>
          <Listbox.Button
            ref={refs.setReference}
            as={ModifyButton}
            className={classNames(
              "group",
              open && "bg-quaternary-hover-fill !text-quaternary-hover-tint"
            )}
          >
            <span className={classNames("mr-3.5", textColor[value])}>
              {value === 4 ? <Priority4Icon24 /> : <PriorityIcon24 />}
            </span>
            <span className="grow select-none truncate text-left font-reactist leading-8">
              Priority {value}
            </span>
          </Listbox.Button>
          {open && (
            <PriorityDropdown ref={refs.setFloating} style={floatingStyles} />
          )}
        </>
      )}
    </Listbox>
  );
}
