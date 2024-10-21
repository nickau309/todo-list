import {
  EditorContent,
  useDescriptionViewerInTaskList,
} from "@/features/editor";
import type { ProjectType } from "@/types/project";

type DescriptionProps = Pick<
  ProjectType["tasks"][number],
  "description" | "isCompleted"
>;

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
