import type { ComponentPropsWithoutRef } from "react";
import { useDueDatePopover } from "./due-date-popover";

type ButtonProps = ComponentPropsWithoutRef<"button">;

export default function DueDatePopoverButton(props: ButtonProps) {
  const { disabled, refs, getReferenceProps } = useDueDatePopover(
    "DueDatePopoverButton",
  );

  return (
    <button
      ref={refs.setReference}
      aria-disabled={disabled}
      {...getReferenceProps(props)}
    />
  );
}
