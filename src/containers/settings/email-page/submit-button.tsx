import { useSettingsDialogState } from "@/contexts/settings-dialog-context";
import { UpdateEmailSchema } from "@/lib/zod";
import clsx from "clsx";
import type { MouseEvent } from "react";

type ButtonProps = {
  isSubmitting: boolean;
};

export default function SubmitButton({ isSubmitting }: ButtonProps) {
  const { inputValues } = useSettingsDialogState();

  const { success } = UpdateEmailSchema.safeParse(inputValues);

  const disabled = isSubmitting || !success;

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
        "flex h-8 min-w-[68px] select-none items-center justify-center rounded-[5px] border border-transparent",
        "bg-actionable-primary-idle-fill px-3 text-actionable-primary-idle-tint",
        "transition-[border,box-shadow] duration-300 ease-[cubic-bezier(.25,.1,.25,1)]",
        "focus-visible:border-transparent focus-visible:outline-none focus-visible:ring focus-visible:ring-outer focus-visible:ring-offset-1 focus-visible:ring-offset-inner",
        "aria-disabled:cursor-not-allowed aria-disabled:bg-actionable-primary-disabled-fill aria-disabled:text-actionable-primary-disabled-tint",
        "custom-active:scale-[.97] custom-active:transition-transform custom-active:duration-200 custom-active:ease-[cubic-bezier(.02,1.505,.745,1.235)]",
        "custom-hocus:bg-actionable-primary-hover-fill custom-hocus:text-actionable-primary-hover-tint",
      )}
    >
      <span className="truncate text-[13px]/8 font-semibold">Change email</span>
    </button>
  );
}
