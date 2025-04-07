import { LabelIconOutline12 } from "@/assets";
import Text from "@/components/ui/text";
import { textColor } from "@/constants/color";
import type { TaskType } from "@/types/task";
import clsx from "clsx";
import Link from "next/link";
import type { KeyboardEvent, MouseEvent } from "react";

type LabelProps = Pick<TaskType["labels"][number], "color" | "id" | "name">;

export default function Label({ color, id, name }: LabelProps) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLAnchorElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.stopPropagation();
    }
  };

  return (
    <Link
      href={`/app/label/${id}`}
      aria-disabled="false"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={clsx(
        "flex items-center gap-0.5",
        textColor[color],
        "custom-hover:underline",
      )}
    >
      <span>
        <LabelIconOutline12 />
      </span>
      <div className="flex max-w-[136px]">
        <Text overflow="truncate" font="sans" size="12px" height="16px">
          {name}
        </Text>
      </div>
    </Link>
  );
}
