import { LabelIconOutline12 } from "@/assets";
import Text from "@/components/ui/text";
import { textColor } from "@/constants/color";
import type { TaskType } from "@/types/task";
import clsx from "clsx";

type LabelProps = Pick<TaskType["labels"][number], "color" | "name">;

export default function Label({ color, name }: LabelProps) {
  return (
    <div className={clsx("flex items-center gap-0.5", textColor[color])}>
      <span>
        <LabelIconOutline12 />
      </span>
      <div className="flex max-w-[136px]">
        <Text overflow="truncate" font="sans" size="12px" height="16px">
          {name}
        </Text>
      </div>
    </div>
  );
}
