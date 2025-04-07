import {
  EditorContent,
  useDescriptionViewerInTaskList,
} from "@/features/editor";
import type { TaskType } from "@/types/task";

type DescriptionProps = Pick<TaskType, "description" | "isCompleted">;

export default function Description({
  description,
  isCompleted,
}: DescriptionProps) {
  const descriptionViewer = useDescriptionViewerInTaskList({
    description,
    isTaskCompleted: isCompleted,
  });

  return <EditorContent editor={descriptionViewer} className="pb-0.5" />;
}
