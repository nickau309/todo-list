import type { CSSProperties, ReactNode } from "react";
import { useLabelsDropdown } from "./labels-dropdown";

type ButtonProps = {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export default function LabelsDropdownButton({
  children,
  className,
  style,
}: ButtonProps) {
  const { disabled, refs, getReferenceProps } = useLabelsDropdown(
    "LabelsDropdownButton",
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
