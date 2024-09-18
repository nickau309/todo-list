import { ChevronDownIcon24, ChevronUpIcon24 } from "@/assets";
import clsx from "clsx";
import CloseButton from "./close-button";
import MoreAction from "./more-action";
import Title from "./title";

export default function Header() {
  return (
    <header className="flex h-full w-full items-center gap-4 pl-3 pr-2">
      <div className="flex min-w-0 flex-1">
        <Title />
      </div>
      <div className="flex gap-2">
        <div className="flex items-center">
          <button
            type="button"
            aria-disabled="false"
            aria-label="Previous task"
            className={clsx(
              "grid size-8 shrink-0 place-items-center rounded-[5px] border border-transparent",
              "text-actionable-quaternary-idle-tint",
              "transition-colors duration-300",
              "aria-disabled:cursor-not-allowed aria-disabled:text-actionable-quaternary-disabled-tint",
              "custom-active:scale-[.97] custom-active:transition-transform custom-active:duration-200 custom-active:ease-[cubic-bezier(.02,1.505,.745,1.235)]",
              "custom-hocus:bg-actionable-quaternary-hover-fill custom-hocus:text-actionable-quaternary-hover-tint",
            )}
          >
            <ChevronUpIcon24 />
          </button>
          <button
            type="button"
            aria-disabled="false"
            aria-label="Next task"
            className={clsx(
              "grid size-8 shrink-0 place-items-center rounded-[5px] border border-transparent",
              "text-actionable-quaternary-idle-tint",
              "transition-colors duration-300",
              "aria-disabled:cursor-not-allowed aria-disabled:text-actionable-quaternary-disabled-tint",
              "custom-active:scale-[.97] custom-active:transition-transform custom-active:duration-200 custom-active:ease-[cubic-bezier(.02,1.505,.745,1.235)]",
              "custom-hocus:bg-actionable-quaternary-hover-fill custom-hocus:text-actionable-quaternary-hover-tint",
            )}
          >
            <ChevronDownIcon24 />
          </button>
        </div>
        <MoreAction />
        <CloseButton />
      </div>
    </header>
  );
}
