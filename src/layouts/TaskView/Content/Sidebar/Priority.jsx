import React from "react";
import { useFetcher, useParams } from "react-router-dom";
import { autoUpdate, flip, useFloating } from "@floating-ui/react-dom";
import { Listbox } from "@headlessui/react";
import { DropdownIcon24, Priority4Icon16, PriorityIcon16 } from "@/assets";
import { PriorityDropdown } from "@/components/dropdowns";
import { classNames, priorityTextColor as textColor } from "@/utils";
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
    <div className="flex flex-col">
      <div className="pl-px font-reactist text-xs/7 font-semibold">
        Priority
      </div>
      <Listbox
        disabled={disabled}
        value={displayPriority}
        onChange={(priority) => {
          fetcher.submit(
            { type: "updateTask", id: taskId, priority },
            { method: "post" },
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
                open && "bg-quaternary-hover-fill",
              )}
            >
              <span className={classNames("mr-2", textColor[value])}>
                {value === 4 ? <Priority4Icon16 /> : <PriorityIcon16 />}
              </span>
              <span className="grow select-none truncate text-left font-reactist text-xs">
                P{value}
              </span>
              <span className="-mr-1.5 ml-0.5">
                <DropdownIcon24
                  className={classNames(
                    open ? "block" : "hidden",
                    "group-enabled:group-hover:block group-enabled:group-focus-visible:block group-enabled:group-active:block",
                  )}
                />
              </span>
            </Listbox.Button>
            {open && (
              <PriorityDropdown ref={refs.setFloating} style={floatingStyles} />
            )}
          </>
        )}
      </Listbox>
    </div>
  );
}
