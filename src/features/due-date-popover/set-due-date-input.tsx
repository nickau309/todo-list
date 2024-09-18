import { ClearIcon24 } from "@/assets";
import clsx from "clsx";
import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import { useRef } from "react";

type InputProps = {
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  setShowError: Dispatch<SetStateAction<boolean>>;
};

export default function SetDueDateInput({
  inputValue,
  setInputValue,
  setShowError,
}: InputProps) {
  const ref = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    setInputValue("");
    setShowError(false);
    ref.current?.focus();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setShowError(false);
  };

  return (
    <div className="flex items-center gap-1 py-1 pl-4 pr-2">
      <input
        ref={ref}
        type="text"
        aria-label="Type a due date"
        onChange={handleInputChange}
        placeholder="Type a due date"
        value={inputValue}
        className={clsx(
          "h-8 min-w-0 flex-1 bg-transparent font-sans text-sm/[18.4px]",
          "placeholder:text-display-tertiary-idle-tint",
          "focus-visible:outline-none",
        )}
      />
      {inputValue !== "" && (
        <button
          type="button"
          aria-disabled="false"
          aria-label="Clear"
          onClick={handleButtonClick}
          className={clsx(
            "grid size-6 place-items-center rounded-[5px]",
            "text-actionable-quaternary-idle-tint",
            "transition-colors duration-300",
            "aria-disabled:cursor-not-allowed aria-disabled:text-actionable-quaternary-disabled-tint",
            "custom-active:scale-[.97] custom-active:transition-transform custom-active:duration-200 custom-active:ease-[cubic-bezier(.02,1.505,.745,1.235)]",
            "custom-hocus:bg-actionable-quaternary-hover-fill custom-hocus:text-actionable-quaternary-hover-tint",
          )}
        >
          <ClearIcon24 className="size-4" />
        </button>
      )}
    </div>
  );
}
