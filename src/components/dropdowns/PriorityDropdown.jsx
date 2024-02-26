import React, { forwardRef } from "react";
import { Listbox } from "@headlessui/react";
import { Priority4Icon24, PriorityIcon24, SelectCheckIcon12 } from "@/assets";
import { Z60Portal } from "@/components/portals";
import { classNames, priorityTextColor as textColor } from "@/utils";

const PriorityDropdown = forwardRef(function PriorityDropdown(props, ref) {
  return (
    <Z60Portal ref={ref} {...props}>
      <Listbox.Options
        static
        className={classNames(
          "overflow-hidden rounded-[5px] border border-dropdown bg-dropdown shadow-dropdown",
          "focus-visible:outline-none",
        )}
      >
        {new Array(4).fill(null).map((_, i) => (
          <Listbox.Option
            key={i}
            value={i + 1}
            className="flex cursor-pointer items-center gap-2.5 px-2 py-1 ui-active:bg-menu-item-secondary-hover"
          >
            {({ selected }) => (
              <>
                <span className={textColor[i + 1]}>
                  {i + 1 === 4 ? <Priority4Icon24 /> : <PriorityIcon24 />}
                </span>
                <span className="grow text-[13px]/6 text-content-primary">
                  Priority {i + 1}
                </span>
                {selected && (
                  <span className="text-[#dd4b39]">
                    <SelectCheckIcon12 className="h-3.5 w-3.5" />
                  </span>
                )}
              </>
            )}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Z60Portal>
  );
});

export default PriorityDropdown;
