import type { CSSProperties, ReactNode } from "react";
import { usePriorityDropdown } from "./priority-dropdown";

type ButtonProps = {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export default function PriorityDropdownButton({
  children,
  className,
  style,
}: ButtonProps) {
  const { disabled, refs, getReferenceProps } = usePriorityDropdown(
    "PriorityDropdownButton",
  );

  return (
    <button
      ref={refs.setReference}
      type="button"
      aria-disabled={disabled}
      className={className}
      style={style}
      {...getReferenceProps()}
    >
      {children}
    </button>
  );
}
