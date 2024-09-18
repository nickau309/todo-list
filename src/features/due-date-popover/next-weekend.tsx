import { WeekendIcon24 } from "@/assets";
import dayjs from "@/lib/dayjs";
import clsx from "clsx";
import { useDueDatePopover } from "./due-date-popover";

const FRI_TO_SUN = [0, 5, 6];

export default function NextWeekend() {
  const { setDueDate, setIsOpen } = useDueDatePopover("NextWeekend");

  const today = dayjs();
  if (!FRI_TO_SUN.includes(today.day())) {
    return null;
  }

  const handleClick = () => {
    setDueDate(nextWeekend.toDate());
    setIsOpen(false);
  };

  const nextWeekend =
    today.day() === 0
      ? today.set("day", 6)
      : today.add(1, "week").set("day", 6);

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
          Next weekend
        </span>
        <span className="truncate font-sans text-[13px]/6 text-scheduler-suggestions-item-weekday">
          {nextWeekend.format("ddd D MMM")}
        </span>
      </div>
    </button>
  );
}
