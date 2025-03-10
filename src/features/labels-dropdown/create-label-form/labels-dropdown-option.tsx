import {
  LabelIconOutline24,
  OptionCheckIcon24,
  OptionUncheckIcon24,
} from "@/assets";
import Text from "@/components/ui/text";
import { textColor } from "@/constants/color";
import type { LabelType } from "@/types/label";
import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";
import { forwardRef, useId } from "react";

type OptionProps = {
  active: boolean;
  selected: boolean;
} & Pick<LabelType, "color" | "name"> &
  Omit<
    ComponentPropsWithoutRef<"div">,
    | "aria-selected"
    | "children"
    | "className"
    | "color"
    | "id"
    | "role"
    | "style"
  >;

const LabelsDropdownOption = forwardRef<HTMLDivElement, OptionProps>(
  function LabelsDropdownOption(
    { active, color, name, selected, ...props },
    ref,
  ) {
    const id = useId();

    return (
      <div
        ref={ref}
        aria-selected={selected}
        data-active={active}
        id={id}
        role="option"
        className={clsx(
          "flex w-full cursor-pointer items-center gap-2.5 px-2 py-1",
          "aria-disabled:cursor-progress",
          "data-[active='true']:bg-option-active",
        )}
        {...props}
      >
        <span className={textColor[color]}>
          <LabelIconOutline24 />
        </span>
        <div className="flex min-w-0 flex-1 gap-1">
          <Text
            overflow="truncate"
            font="sans"
            size="13px"
            height="17.6px"
            color="primary"
          >
            {name}
          </Text>
        </div>
        <span className="text-option-checkbox">
          {selected ? <OptionCheckIcon24 /> : <OptionUncheckIcon24 />}
        </span>
      </div>
    );
  },
);

export default LabelsDropdownOption;
