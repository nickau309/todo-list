import { CheckboxButton } from "@/features/checkbox";
import useUpdateIsCompleted from "@/hooks/task/use-update-is-completed";
import type { TaskType } from "@/types/task";
import { useCallback } from "react";

type CheckboxProps = {
  disabled?: boolean;
} & Pick<TaskType, "id" | "isCompleted" | "priority">;

export default function Checkbox({
  id,
  isCompleted,
  priority,
  disabled = false,
}: CheckboxProps) {
  const { mutate } = useUpdateIsCompleted();

  const setIsCompleted = useCallback(
    (isCompleted: boolean) => {
      mutate({ id, isCompleted });
    },
    [id, mutate],
  );

  return (
    <CheckboxButton
      checked={isCompleted}
      disabled={disabled}
      priority={priority}
      setChecked={setIsCompleted}
    />
  );
}
