import { DueDateIcon12 } from "@/assets";
import Text from "@/components/ui/text";
import type { ProjectType } from "@/types/project";
import getDueDateString from "@/utils/getDueDateString";
import getDueDateTextColor from "@/utils/getDueDateTextColor";
import clsx from "clsx";

type DueDateProps = Pick<ProjectType["tasks"][number], "dueDate">;

export default function DueDate({ dueDate }: DueDateProps) {
  if (dueDate === null) {
    return null;
  }

  return (
    <div
      className={clsx(
        "flex items-center gap-0.5",
        getDueDateTextColor(dueDate) ?? "text-[#808080]",
      )}
    >
      <span>
        <DueDateIcon12 />
      </span>
      <Text overflow="truncate" font="reactist" size="12px" height="16px">
        {getDueDateString(dueDate)}
      </Text>
    </div>
  );
}
