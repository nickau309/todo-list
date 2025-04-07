import { DueDateIcon12 } from "@/assets";
import Text from "@/components/ui/text";
import {
  DueDatePopover,
  DueDatePopoverButton,
  DueDatePopoverPanel,
} from "@/features/due-date-popover";
import useUpdateTask from "@/hooks/task/use-update-task";
import dayjs from "@/lib/dayjs";
import type { TaskType } from "@/types/task";
import getDueDateString from "@/utils/getDueDateString";
import getDueDateTextColor from "@/utils/getDueDateTextColor";
import clsx from "clsx";
import { useCallback } from "react";

type DueDateProps = {
  disabled?: boolean;
} & Pick<TaskType, "dueDate" | "id">;

export default function DueDate({
  dueDate,
  id,
  disabled = false,
}: DueDateProps) {
  const { mutate } = useUpdateTask();

  const setDueDate = useCallback(
    (dueDate: Date | null) => {
      const date = dueDate ? dayjs(dueDate).format("YYYY-MM-DD") : dueDate;
      mutate({ id, date });
    },
    [id, mutate],
  );

  if (dueDate === null) {
    return null;
  }

  return (
    <DueDatePopover
      disabled={disabled}
      dueDate={dueDate}
      setDueDate={setDueDate}
    >
      <DueDatePopoverButton
        className={clsx(
          "flex items-center gap-0.5",
          disabled
            ? "text-display-secondary-idle-tint"
            : (getDueDateTextColor(dueDate) ?? "text-[#808080]"),
        )}
      >
        <span>
          <DueDateIcon12 />
        </span>
        <Text overflow="truncate" font="reactist" size="12px" height="16px">
          {getDueDateString(dueDate)}
        </Text>
      </DueDatePopoverButton>
      <DueDatePopoverPanel />
    </DueDatePopover>
  );
}
