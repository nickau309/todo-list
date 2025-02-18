import { CreateIcon24 } from "@/assets";
import clsx from "clsx";
import type { MouseEvent } from "react";

type ButtonProps = {
  name: string;
  disabled?: boolean;
};

export default function SubmitButton({ name, disabled = false }: ButtonProps) {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (disabled) {
      e.preventDefault();
    }
  };

  return (
    <button
      type="submit"
      aria-disabled={disabled}
      onClick={handleClick}
      className={clsx(
        "flex items-center gap-2 px-2 py-1",
        "text-display-primary-idle-tint",
        "focus-visible:outline-none",
        "aria-disabled:cursor-not-allowed aria-disabled:text-actionable-quaternary-disabled-tint",
        "custom-hocus:bg-selectable-secondary-selected-fill",
      )}
    >
      <span>
        <CreateIcon24 />
      </span>
      <span className="min-w-0 break-words text-left font-sans text-[13px]/[17.6px] font-semibold">
        Create &quot;{name}&quot;
      </span>
    </button>
  );
}
