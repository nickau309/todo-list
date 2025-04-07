import { EditorContent, useNameViewerInTaskList } from "@/features/editor";
import type { TaskType } from "@/types/task";

type NameProps = Pick<TaskType, "isCompleted" | "name">;

export default function Name({ isCompleted, name }: NameProps) {
  const nameViewer = useNameViewerInTaskList({
    name,
    isTaskCompleted: isCompleted,
  });

  return <EditorContent editor={nameViewer} className="py-px" />;
}
