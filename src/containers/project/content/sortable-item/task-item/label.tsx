import { LabelIconOutline12 } from "@/assets";
import { textColor } from "@/constants/color";
import type { ProjectType } from "@/types/project";
import clsx from "clsx";
import Link from "next/link";
import type { KeyboardEvent, MouseEvent } from "react";

type LabelProps = Pick<
  ProjectType["tasks"][number]["labels"][number],
  "color" | "id" | "name"
>;

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
      <span className="max-w-[136px] truncate font-sans text-xs/4">{name}</span>
    </Link>
  );
}
