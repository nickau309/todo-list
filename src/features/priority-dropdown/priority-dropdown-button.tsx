import type { ComponentPropsWithoutRef } from "react";
import { usePriorityDropdown } from "./priority-dropdown";

type ButtonProps = ComponentPropsWithoutRef<"button">;

export default function PriorityDropdownButton(props: ButtonProps) {
  const { disabled, refs, getReferenceProps } = usePriorityDropdown(
    "PriorityDropdownButton",
  );

  return (
    <button
      ref={refs.setReference}
      aria-disabled={disabled}
      {...getReferenceProps(props)}
    />
  );
}
