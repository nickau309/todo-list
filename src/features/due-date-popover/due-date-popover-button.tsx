import type { CSSProperties, ReactNode } from "react";
import { useDueDatePopover } from "./due-date-popover";

type ButtonProps = {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export default function DueDatePopoverButton({
  children,
  className,
  style,
}: ButtonProps) {
  const { disabled, refs, getReferenceProps } = useDueDatePopover(
    "DueDatePopoverButton",
  );

  return (
    <button
      ref={refs.setReference}
      aria-disabled={disabled}
      className={className}
      style={style}
      {...getReferenceProps({
        onClick: (e) => {
          e.stopPropagation();
        },
        onKeyDown: (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.stopPropagation();
          }
        },
      })}
    >
      {children}
    </button>
  );
}
