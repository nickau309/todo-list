import { CreateIcon24 } from "@/assets";
import Text from "@/components/ui/text";
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
        "flex w-full items-center gap-2.5 px-2.5 py-1",
        "text-display-primary-idle-tint",
        "focus-visible:outline-none",
        "aria-disabled:cursor-not-allowed aria-disabled:opacity-30",
        "custom-hocus:bg-option-active",
      )}
    >
      <span>
        <CreateIcon24 />
      </span>
      <Text
        minWidth="0px"
        wordBreak="break-words"
        align="left"
        font="sans"
        size="13px"
        weight={600}
        height="17.6px"
        color="primary"
      >
        Create &quot;{name}&quot;
      </Text>
    </button>
  );
}
