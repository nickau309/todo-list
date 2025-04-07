import { CheckboxDisplay } from "@/features/checkbox";
import type { TaskType } from "@/types/task";

type CheckboxProps = Pick<TaskType, "isCompleted" | "priority">;

export default function Checkbox({ isCompleted, priority }: CheckboxProps) {
  return <CheckboxDisplay checked={isCompleted} priority={priority} />;
}
