import type { CSSProperties, ReactNode } from "react";
import { useProjectDropdown } from "./project-dropdown";

type ButtonProps = {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export default function ProjectDropdownButton({
  children,
  className,
  style,
}: ButtonProps) {
  const { disabled, refs, getReferenceProps } = useProjectDropdown(
    "ProjectDropdownButton",
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
