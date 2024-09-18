import { WeekendIcon24 } from "@/assets";
import dayjs from "@/lib/dayjs";
import clsx from "clsx";
import { useDueDatePopover } from "./due-date-popover";

const MON_TO_THUR = [1, 2, 3, 4];

export default function ThisWeekend() {
  const { setDueDate, setIsOpen } = useDueDatePopover("ThisWeekend");

  const today = dayjs();
  if (!MON_TO_THUR.includes(today.day())) {
    return null;
  }

  const handleClick = () => {
    setDueDate(thisWeekend.toDate());
    setIsOpen(false);
  };

  const thisWeekend = today.day(6);

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
      <span className="text-schedule-weekend-fill">
        <WeekendIcon24 />
      </span>
      <div className="flex min-w-0 flex-1 items-center justify-between">
        <span className="truncate font-sans text-[13px]/6 font-medium">
          This weekend
        </span>
        <span className="truncate font-sans text-[13px]/6 text-scheduler-suggestions-item-weekday">
          {thisWeekend.format("ddd")}
        </span>
      </div>
    </button>
  );
}
