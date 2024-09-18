import { NoDateIcon24 } from "@/assets";
import clsx from "clsx";
import { useDueDatePopover } from "./due-date-popover";

export default function NoDate() {
  const { dueDate, setDueDate, setIsOpen } = useDueDatePopover("NoDate");

  if (dueDate === null) {
    return null;
  }

  const handleClick = () => {
    setDueDate(null);
    setIsOpen(false);
  };

  return (
    <button
      type="button"
      aria-disabled="false"
      onClick={handleClick}
      className={clsx(
        "flex items-center gap-2.5 py-1 pl-3 pr-4",
        "focus-visible:outline-none",
        "custom-hocus:bg-option-active",
      )}
    >
      <span className="text-scheduler-suggestions-item-icon">
        <NoDateIcon24 />
      </span>
      <div className="flex min-w-0 flex-1 items-center justify-between">
        <span className="truncate font-sans text-[13px]/6 font-medium">
          No Date
        </span>
      </div>
    </button>
  );
}
