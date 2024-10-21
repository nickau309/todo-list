import { updateIsCompleted } from "@/actions/task";
import { CheckboxButton } from "@/features/checkbox";
import type { ProjectType } from "@/types/project";
import { startTransition, useCallback } from "react";
import { useSetOptimisticProject } from "../../../contexts/optimistic-project-context";

type CheckboxProps = Pick<ProjectType, "isArchived"> &
  Pick<ProjectType["tasks"][number], "id" | "isCompleted" | "priority">;

export default function Checkbox({
  id,
  isArchived,
  isCompleted,
  priority,
}: CheckboxProps) {
  const setOptimisticProject = useSetOptimisticProject();

  const setIsCompleted = useCallback(
    (isCompleted: boolean) => {
      startTransition(() => {
        setOptimisticProject((optimisticProject) => ({
          ...optimisticProject,
          tasks: optimisticProject.tasks.map((task) => {
            if (task.id !== id) {
              return task;
            }
            return {
              ...task,
              isCompleted,
            };
          }),
        }));
      });
      const formData = new FormData();
      formData.append("isCompleted", String(isCompleted));
      void updateIsCompleted(id, formData);
    },
    [id, setOptimisticProject],
  );

  return (
    <CheckboxButton
      checked={isCompleted}
      disabled={isArchived}
      priority={priority}
      setChecked={setIsCompleted}
    />
  );
}
