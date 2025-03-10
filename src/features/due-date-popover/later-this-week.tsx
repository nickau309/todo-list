import { DueDateIcon24 } from "@/assets";
import Text from "@/components/ui/text";
import dayjs from "@/lib/dayjs";
import clsx from "clsx";
import { useDueDatePopover } from "./due-date-popover";

const MON_TO_WED = [1, 2, 3];

export default function LaterThisWeek() {
  const { dueDate, setDueDate, setIsOpen } = useDueDatePopover("LaterThisWeek");

  const today = dayjs();
  if (!MON_TO_WED.includes(today.day())) {
    return null;
  }

  const date = dayjs(dueDate);
  if (!date.isToday() && !date.isTomorrow()) {
    return null;
  }

  const handleClick = () => {
    setDueDate(laterThisWeek.toDate());
    setIsOpen(false);
  };

  const laterThisWeek = today.add(2, "day");

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
        <DueDateIcon24 />
      </span>
      <div className="flex min-w-0 flex-1 items-center justify-between">
        <Text
          overflow="truncate"
          font="sans"
          size="13px"
          weight={500}
          height="24px"
        >
          Later this week
        </Text>
        <Text
          overflow="truncate"
          font="sans"
          size="13px"
          height="24px"
          color="text-scheduler-suggestions-item-weekday"
        >
          {laterThisWeek.format("ddd")}
        </Text>
      </div>
    </button>
  );
}
