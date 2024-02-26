import React, { useState } from "react";
import { autoUpdate, offset, useFloating } from "@floating-ui/react-dom";
import { Listbox } from "@headlessui/react";
import { DropdownIcon24, GroupIcon24, SelectCheckIcon12 } from "@/assets";
import { Z60Portal } from "@/components/portals";
import { classNames } from "@/utils";

const groupings = [
  { name: "default", description: "None (default)", disabled: false },
  { name: "dueDate", description: "Due date", disabled: true },
  { name: "addedDate", description: "Date added", disabled: true },
  { name: "priority", description: "Priority", disabled: true },
  { name: "label", description: "Label", disabled: true },
];

export default function GroupListbox() {
  const [grouping, setGrouping] = useState(groupings[0]);

  const { refs, floatingStyles } = useFloating({
    placement: "bottom-end",
    middleware: [
      offset({
        mainAxis: -4,
        crossAxis: 20.8,
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  return (
    <Listbox value={grouping} onChange={setGrouping}>
      {({ value, open }) => (
        <>
          <Listbox.Button
            ref={refs.setReference}
            className={classNames(
              "flex w-full gap-2.5 px-2.5 py-1 leading-6",
              open
                ? "bg-menu-item-primary-hover"
                : "hover:bg-menu-item-primary-hover",
            )}
          >
            <span className="text-content-secondary">
              <GroupIcon24 />
            </span>
            <div className="flex grow justify-between">
              <span className="text-sm/6 text-content-primary">Grouping</span>
              <div
                className={classNames(
                  "flex",
                  open
                    ? "text-content-primary"
                    : "text-content-secondary hover:text-content-primary",
                )}
              >
                <span className="w-[120px] text-right text-sm/6">
                  {value.description}
                </span>
                <span>
                  <DropdownIcon24 />
                </span>
              </div>
            </div>
          </Listbox.Button>
          {open && (
            <Z60Portal ref={refs.setFloating} style={floatingStyles}>
              <Listbox.Options
                static
                className={classNames(
                  "box-content min-w-[220px] overflow-hidden rounded-[5px] border border-dropdown bg-dropdown shadow-dropdown",
                  "focus-visible:outline-none",
                )}
              >
                {groupings.map((grouping) => (
                  <Listbox.Option
                    key={grouping.name}
                    value={grouping}
                    disabled={grouping.disabled}
                    className={classNames(
                      "flex cursor-pointer items-center justify-between text-content-primary",
                      "ui-active:bg-menu-item-secondary-hover",
                      "ui-disabled:cursor-not-allowed ui-disabled:text-[#999]",
                    )}
                  >
                    {({ selected }) => (
                      <>
                        <span className="p-[5px] text-[13px]/[17.6px]">
                          {grouping.description}
                        </span>
                        {selected && (
                          <span className="p-[7px]">
                            <SelectCheckIcon12 />
                          </span>
                        )}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Z60Portal>
          )}
        </>
      )}
    </Listbox>
  );
}
