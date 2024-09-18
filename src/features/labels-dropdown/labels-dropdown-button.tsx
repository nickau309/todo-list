import type { ComponentPropsWithoutRef } from "react";
import { useLabelsDropdown } from "./labels-dropdown";

type ButtonProps = ComponentPropsWithoutRef<"button">;

export default function LabelsDropdownButton(props: ButtonProps) {
  const { disabled, refs, getReferenceProps } = useLabelsDropdown(
    "LabelsDropdownButton",
  );

  return (
    <button
      ref={refs.setReference}
      aria-disabled={disabled}
      {...getReferenceProps(props)}
    />
  );
}
