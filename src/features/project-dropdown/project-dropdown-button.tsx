import type { ComponentPropsWithoutRef } from "react";
import { useProjectDropdown } from "./project-dropdown";

type ButtonProps = ComponentPropsWithoutRef<"button">;

export default function ProjectDropdownButton(props: ButtonProps) {
  const { disabled, refs, getReferenceProps } = useProjectDropdown(
    "ProjectDropdownButton",
  );

  return (
    <button
      ref={refs.setReference}
      aria-disabled={disabled}
      {...getReferenceProps(props)}
    />
  );
}
