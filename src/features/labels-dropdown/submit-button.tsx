import { CreateIcon24 } from "@/assets";
import clsx from "clsx";
import type { MouseEvent } from "react";
import { useFormState } from "react-hook-form";
import { useCreateLabelFormWatch } from "./context/create-label-form-context";

export default function SubmitButton() {
  const { isSubmitting, isValid } = useFormState();
  const query = useCreateLabelFormWatch({
    name: "name",
    defaultValue: "",
  });

  const isDisabled = isSubmitting || !isValid;

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
        "flex items-center gap-2.5 px-2.5 py-1 text-display-primary-idle-tint",
        "focus-visible:outline-none",
        "aria-disabled:cursor-not-allowed aria-disabled:text-actionable-quaternary-disabled-tint",
        "custom-hocus:bg-option-active",
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
