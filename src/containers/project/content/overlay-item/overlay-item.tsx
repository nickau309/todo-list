import useFindUniqueTask from "@/hooks/task/use-find-unique-task";
import type { TaskType } from "@/types/task";
import Checkbox from "./checkbox";
import Description from "./description";
import DueDate from "./due-date";
import Label from "./label";
import Name from "./name";

type ItemProps = Pick<TaskType, "id">;

export default function OverlayItem({ id }: ItemProps) {
  const { data, isSuccess } = useFindUniqueTask({ id });

  if (!isSuccess) {
    return null;
  }

  return (
    <div className="-mr-6 flex gap-1.5 rounded-[5px] border-b border-divider-primary bg-background-base-primary py-2 pl-[9px] pr-[42px] shadow-task-drop">
      <div className="shrink-0 basis-6">
        <Checkbox isCompleted={data.isCompleted} priority={data.priority} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="pb-[3px]">
          <Name isCompleted={data.isCompleted} name={data.name} />
          {data.description.length !== 0 && (
            <Description
              description={data.description}
              isCompleted={data.isCompleted}
            />
          )}
        </div>
        <div className="flex flex-wrap gap-x-2">
          <DueDate dueDate={data.dueDate} />
          {data.labels.map((label) => (
            <Label key={label.id} color={label.color} name={label.name} />
          ))}
        </div>
      </div>
    </div>
  );
}
