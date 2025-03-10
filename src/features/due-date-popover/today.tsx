import { TodayIcon24 } from "@/assets";
import Text from "@/components/ui/text";
import dayjs from "@/lib/dayjs";
import clsx from "clsx";
import { useDueDatePopover } from "./due-date-popover";

export default function Today() {
  const { dueDate, setDueDate, setIsOpen } = useDueDatePopover("Today");

  const today = dayjs();
  if (today.isSame(dueDate, "day")) {
    return null;
  }

  const handleClick = () => {
    setDueDate(today.toDate());
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
      <span className="text-schedule-today-fill">
        <TodayIcon24 />
      </span>
      <div className="flex min-w-0 flex-1 items-center justify-between">
        <Text
          overflow="truncate"
          font="sans"
          size="13px"
          weight={500}
          height="24px"
        >
          Today
        </Text>
        <Text
          overflow="truncate"
          font="sans"
          size="13px"
          height="24px"
          color="text-scheduler-suggestions-item-weekday"
        >
          {today.format("ddd")}
        </Text>
      </div>
    </button>
  );
}
