import React, { forwardRef } from "react";
import { Listbox } from "@headlessui/react";
import { ProjectIcon12, SelectCheckIcon12 } from "@assets";
import { Z60Portal } from "@components/portals";
import { classNames, textColor } from "@utils";

const ColorDropdown = forwardRef(function ColorDropdown(props, ref) {
  return (
    <Z60Portal ref={ref} {...props}>
      <div className="w-[var(--width)] overflow-hidden rounded-[5px] border border-dropdown bg-dropdown text-content-primary shadow-dropdown">
        <Listbox.Options
          static
          className={classNames(
            "max-h-[300px] overflow-x-hidden overflow-y-scroll",
            "focus-visible:outline-none"
          )}
        >
          {Object.entries(textColor).map(([name, textColor]) => (
            <Listbox.Option
              key={name}
              value={name}
              className="flex cursor-pointer items-center gap-3 p-1.5 ui-active:bg-menu-item-secondary-hover"
            >
              {({ selected }) => (
                <>
                  <span className={textColor}>
                    <ProjectIcon12 />
                  </span>
                  <span className="grow text-[13px]/[17.6px]">{name}</span>
                  {selected && (
                    <span>
                      <SelectCheckIcon12 />
                    </span>
                  )}
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Z60Portal>
  );
});

export default ColorDropdown;
