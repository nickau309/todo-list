import type { ProjectType } from "@/types/project";
import Checkbox from "./checkbox";
import Description from "./description";
import DueDate from "./due-date";
import Label from "./label";
import Name from "./name";

type ItemProps = Pick<
  ProjectType["tasks"][number],
  "description" | "dueDate" | "isCompleted" | "labels" | "name" | "priority"
>;

export default function OverlayItem({
  description,
  dueDate,
  isCompleted,
  labels,
  name,
  priority,
}: ItemProps) {
  return (
    <div className="-mr-6 flex gap-1.5 rounded-[5px] border-b border-divider-primary bg-background-base-primary py-2 pl-[9px] pr-[42px] shadow-task-drop">
      <div className="shrink-0 basis-6">
        <Checkbox isCompleted={isCompleted} priority={priority} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="pb-[3px]">
          <Name isCompleted={isCompleted} name={name} />
          {description.length !== 0 && (
            <Description description={description} isCompleted={isCompleted} />
          )}
        </div>
        <div className="flex flex-wrap gap-x-2">
          <DueDate dueDate={dueDate} />
          {labels.map((label) => (
            <Label key={label.id} color={label.color} name={label.name} />
          ))}
        </div>
      </div>
    </div>
  );
}
