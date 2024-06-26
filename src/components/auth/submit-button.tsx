import { SpinnerIcon24 } from "@/assets";
import clsx from "clsx";
import type { MouseEvent } from "react";
import { useFormStatus } from "react-dom";

type SubmitButtonProps = {
  children: string;
};

export default function SubmitButton({ children }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (pending) {
      e.preventDefault();
    }
  };

  return (
    <button
      type="submit"
      aria-disabled={pending}
      onClick={handleClick}
      className={clsx(
        "flex h-12 items-center rounded-lg",
        "bg-actionable-primary-idle-fill px-4 text-actionable-primary-idle-tint",
        "transition-colors duration-300",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-display-primary-idle-tint",
        "aria-disabled:cursor-not-allowed aria-disabled:bg-actionable-primary-disabled-fill aria-disabled:text-actionable-primary-disabled-tint",
        "custom-active:scale-[.97] custom-active:transition-transform custom-active:duration-200 custom-active:ease-[cubic-bezier(.02,1.505,.745,1.235)]",
        "custom-hocus:bg-actionable-primary-hover-fill custom-hocus:text-actionable-primary-hover-tint",
      )}
    >
      <span className="flex-1 select-none text-lg font-bold">{children}</span>
      <div
        aria-hidden="true"
        className={clsx("relative -mr-1.5 ml-2.5", !pending && "hidden")}
      >
        <span
          aria-label="Loading..."
          role="progressbar"
          className="absolute -top-3 -ml-10 animate-[spin_1.2s_linear_infinite]"
        >
          <SpinnerIcon24
            className={clsx(
              "[&_path:first-child]:fill-white",
              "[&_path:last-child]:[fill-opacity:.2]",
            )}
          />
        </span>
      </div>
    </button>
  );
}
