import { LabelIconOutline12 } from "@/assets";
import { textColor } from "@/constants/color";
import type { ProjectType } from "@/types/project";
import clsx from "clsx";

type LabelProps = Pick<
  ProjectType["tasks"][number]["labels"][number],
  "color" | "name"
>;

export default function Label({ color, name }: LabelProps) {
  return (
    <div className={clsx("flex items-center gap-0.5", textColor[color])}>
      <span>
        <LabelIconOutline12 />
      </span>
      <span className="max-w-[136px] truncate font-sans text-xs/4">{name}</span>
    </div>
  );
}
