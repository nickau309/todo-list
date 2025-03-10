import { NextWeekIcon24 } from "@/assets";
import Text from "@/components/ui/text";
import dayjs from "@/lib/dayjs";
import clsx from "clsx";
import { useDueDatePopover } from "./due-date-popover";

export default function NextWeek() {
  const { setDueDate, setIsOpen } = useDueDatePopover("NextWeek");

  const today = dayjs();
  if (today.day() === 0) {
    return null;
  }

  const handleClick = () => {
    setDueDate(nextWeek.toDate());
    setIsOpen(false);
  };

  const nextWeek = today.add(1, "week").day(1);

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
      <span className="text-schedule-next-week-fill">
        <NextWeekIcon24 />
      </span>
      <div className="flex min-w-0 flex-1 items-center justify-between">
        <Text
          overflow="truncate"
          font="sans"
          size="13px"
          weight={500}
          height="24px"
        >
          Next week
        </Text>
        <Text
          overflow="truncate"
          font="sans"
          size="13px"
          height="24px"
          color="text-scheduler-suggestions-item-weekday"
        >
          {nextWeek.format("ddd D MMM")}
        </Text>
      </div>
    </button>
  );
}
