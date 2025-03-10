import { WeekendIcon24 } from "@/assets";
import Text from "@/components/ui/text";
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
        <Text
          overflow="truncate"
          font="sans"
          size="13px"
          weight={500}
          height="24px"
        >
          This weekend
        </Text>
        <Text
          overflow="truncate"
          font="sans"
          size="13px"
          height="24px"
          color="text-scheduler-suggestions-item-weekday"
        >
          {thisWeekend.format("ddd")}
        </Text>
      </div>
    </button>
  );
}
