import React, { useId } from "react";
import { autoUpdate, size, useFloating } from "@floating-ui/react-dom";
import { Listbox } from "@headlessui/react";
import { ProjectIcon12 } from "@assets";
import { ColorDropdown } from "@components/dropdowns";
import { classNames, textColor } from "@utils";

export default function ColorInput({ defaultColor }) {
  const id = useId();

  const { refs, floatingStyles } = useFloating({
    middleware: [
      size({
        apply({ rects, elements }) {
          elements.floating.style.setProperty(
            "--width",
            rects.reference.width + "px"
          );
        },
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  return (
    <div className="flex flex-col gap-[7px]">
      <label htmlFor={id} className="font-bold">
        Color
      </label>
      <Listbox defaultValue={defaultColor} name="color">
        {({ value, open }) => (
          <>
            <Listbox.Button
              ref={refs.setReference}
              id={id}
              className={classNames(
                "flex items-center gap-3 rounded-[5px] border border-field bg-base-primary px-[11px] py-[5px]",
                "transition-[border,box-shadow] duration-300 ease-[cubic-bezier(.25,.1,.25,1)] focus:border-field-focus",
                "focus-visible:!border-transparent focus-visible:outline-none focus-visible:ring focus-visible:ring-outer focus-visible:ring-offset-1 focus-visible:ring-offset-inner"
              )}
            >
              <span className={textColor[value]}>
                <ProjectIcon12 />
              </span>
              <span>{value}</span>
            </Listbox.Button>
            {open && (
              <ColorDropdown ref={refs.setFloating} style={floatingStyles} />
            )}
          </>
        )}
      </Listbox>
    </div>
  );
}
