import React from "react";
import { RadioGroup } from "@headlessui/react";
import { RadioDisplay } from "@components/radios";
import { useTheme } from "@contexts";
import { classNames } from "@utils";

export default function ViewStyleInput({ defaultViewStyle }) {
  const { name } = useTheme();

  return (
    <div className="flex flex-col gap-[7px]">
      <span className="cursor-default font-bold">View</span>
      <RadioGroup
        defaultValue={defaultViewStyle}
        name="viewStyle"
        className="grid grid-cols-2 gap-3"
      >
        <RadioGroup.Option
          value="list"
          className={classNames(
            "group flex cursor-pointer flex-col gap-2",
            "focus-visible:outline-none ui-disabled:cursor-not-allowed"
          )}
        >
          {({ checked, disabled }) => (
            <>
              <div
                className={classNames(
                  "rounded-[5px] border",
                  checked ? "border-[#cf473a]" : "border-[#ddd]",
                  !checked && !disabled && "hover:border-charcoal",
                  "bg-contain bg-[0_10px] bg-no-repeat pt-[75%]",
                  name === "Dark" &&
                    "bg-[url('/src/assets/ListPreviewDark.svg')]",
                  name === "Dark" &&
                    !disabled &&
                    "hover:bg-[url('/src/assets/ListPreviewDarkHover.svg')]",
                  name !== "Dark" && "bg-[url('/src/assets/ListPreview.svg')]",
                  name !== "Dark" &&
                    !disabled &&
                    "hover:bg-[url('/src/assets/ListPreviewHover.svg')]"
                )}
              />
              <div className="flex items-center gap-3">
                <RadioDisplay
                  checked={checked}
                  disabled={disabled}
                  className={classNames(
                    "transition-[border,box-shadow] duration-300 ease-[cubic-bezier(.25,.1,.25,1)]",
                    "group-focus-visible:border-transparent group-focus-visible:ring group-focus-visible:ring-outer group-focus-visible:ring-offset-1 group-focus-visible:ring-offset-inner"
                  )}
                />
                <span>List</span>
              </div>
            </>
          )}
        </RadioGroup.Option>
        <RadioGroup.Option
          value="board"
          disabled
          className={classNames(
            "group flex cursor-pointer flex-col gap-2",
            "focus-visible:outline-none ui-disabled:cursor-not-allowed"
          )}
        >
          {({ checked, disabled }) => (
            <>
              <div
                className={classNames(
                  "rounded-[5px] border",
                  checked ? "border-[#cf473a]" : "border-[#ddd]",
                  !checked && !disabled && "hover:border-charcoal",
                  "bg-contain bg-[5px_5px] bg-no-repeat pt-[75%]",
                  name === "Dark" &&
                    "bg-[url('/src/assets/BoardPreviewDark.svg')]",
                  name === "Dark" &&
                    !disabled &&
                    "hover:bg-[url('/src/assets/BoardPreviewDarkHover.svg')]",
                  name !== "Dark" && "bg-[url('/src/assets/BoardPreview.svg')]",
                  name !== "Dark" &&
                    !disabled &&
                    "hover:bg-[url('/src/assets/BoardPreviewHover.svg')]"
                )}
              />
              <div className="flex items-center gap-3">
                <RadioDisplay
                  checked={checked}
                  disabled={disabled}
                  className={classNames(
                    "transition-[border,box-shadow] duration-300 ease-[cubic-bezier(.25,.1,.25,1)]",
                    "group-focus-visible:border-transparent group-focus-visible:ring group-focus-visible:ring-outer group-focus-visible:ring-offset-1 group-focus-visible:ring-offset-inner"
                  )}
                />
                <span>Board</span>
              </div>
            </>
          )}
        </RadioGroup.Option>
      </RadioGroup>
    </div>
  );
}
