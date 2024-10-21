import { EditorContent, useNameViewerInTaskList } from "@/features/editor";
import type { ProjectType } from "@/types/project";

type NameProps = Pick<ProjectType["tasks"][number], "isCompleted" | "name">;

export default function Name({ isCompleted, name }: NameProps) {
  const nameViewer = useNameViewerInTaskList({
    name,
    isTaskCompleted: isCompleted,
  });

  return <EditorContent editor={nameViewer} className="py-px" />;
}
