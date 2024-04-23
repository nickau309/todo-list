import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";

type SwitchProps = {
  isChecked: boolean;
} & ComponentPropsWithoutRef<"button">;

export default function Switch({
  isChecked,
  className,
  ...props
}: SwitchProps) {
  return (
    <button
      type="button"
      className={clsx(
        "flex h-[18px] w-8 items-center rounded-full",
        isChecked
          ? "bg-selectable-primary-selected-fill"
          : "bg-selectable-primary-unselected-fill",
        "p-[3px]",
        "focus-visible:outline-none focus-visible:outline-[1.6px] focus-visible:outline-offset-[2.4px] focus-visible:outline-selectable-primary-selected-fill",
        className,
      )}
      {...props}
    >
      <span
        className={clsx(
          "size-3",
          isChecked && "translate-x-3.5",
          "rounded-full bg-white transition-transform duration-[280ms]",
        )}
      />
    </button>
  );
}
