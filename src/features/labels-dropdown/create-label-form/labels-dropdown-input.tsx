import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";

type InputProps = Omit<
  ComponentPropsWithoutRef<"input">,
  "autoComplete" | "className" | "style" | "type"
>;

const LabelsDropdownInput = forwardRef<HTMLInputElement, InputProps>(
  function LabelsDropdownInput({ ...props }, ref) {
    return (
      <input
        ref={ref}
        type="text"
        aria-label="Type a label"
        autoComplete="off"
        placeholder="Type a label"
        className={clsx(
          "min-w-0 flex-1",
          "bg-transparent",
          "px-2 py-1.5 font-sans text-sm/[18px]",
          "placeholder:text-display-tertiary-idle-tint",
          "focus-visible:outline-none",
        )}
        {...props}
      />
    );
  },
);

export default LabelsDropdownInput;
