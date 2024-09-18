import { CreateIcon24 } from "@/assets";
import type { CreateProjectFormType } from "@/types/project";
import clsx from "clsx";
import type { MouseEvent } from "react";
import { useFormState, useWatch } from "react-hook-form";

export default function SubmitButton() {
  const { isSubmitted, isSubmitting, isValid } = useFormState();
  const query = useWatch<CreateProjectFormType>({
    name: "name",
    defaultValue: "",
  });

  const isDisabled = isSubmitted || isSubmitting || !isValid;

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (isDisabled) {
      e.preventDefault();
    }
  };

  return (
    <button
      type="submit"
      aria-disabled={isDisabled}
      onClick={handleClick}
      className={clsx(
        "flex items-center gap-2 px-2 py-1 text-display-primary-idle-tint",
        "focus-visible:outline-none",
        "aria-disabled:cursor-not-allowed aria-disabled:text-actionable-quaternary-disabled-tint",
        "custom-hocus:bg-selectable-secondary-selected-fill",
      )}
    >
      <span>
        <CreateIcon24 />
      </span>
      <span className="min-w-0 break-words text-left font-sans text-[13px]/[17.6px] font-semibold">
        Create &quot;{query}&quot;
      </span>
    </button>
  );
}
