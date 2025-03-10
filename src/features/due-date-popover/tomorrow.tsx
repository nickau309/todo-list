import { TomorrowIcon24 } from "@/assets";
import Text from "@/components/ui/text";
import dayjs from "@/lib/dayjs";
import clsx from "clsx";
import { useDueDatePopover } from "./due-date-popover";

export default function Tomorrow() {
  const { dueDate, setDueDate, setIsOpen } = useDueDatePopover("Tomorrow");

  const tomorrow = dayjs().add(1, "day");
  if (tomorrow.isSame(dueDate, "day")) {
    return null;
  }

  const handleClick = () => {
    setDueDate(tomorrow.toDate());
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
      <span className="text-schedule-tomorrow-fill">
        <TomorrowIcon24 />
      </span>
      <div className="flex min-w-0 flex-1 items-center justify-between">
        <Text
          overflow="truncate"
          font="sans"
          size="13px"
          weight={500}
          height="24px"
        >
          Tomorrow
        </Text>
        <Text
          overflow="truncate"
          font="sans"
          size="13px"
          height="24px"
          color="text-scheduler-suggestions-item-weekday"
        >
          {tomorrow.format("ddd")}
        </Text>
      </div>
    </button>
  );
}
