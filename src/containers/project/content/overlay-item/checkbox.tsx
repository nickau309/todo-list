import { CheckboxDisplay } from "@/features/checkbox";
import type { ProjectType } from "@/types/project";

type CheckboxProps = Pick<
  ProjectType["tasks"][number],
  "isCompleted" | "priority"
>;

export default function Checkbox({ isCompleted, priority }: CheckboxProps) {
  return <CheckboxDisplay checked={isCompleted} priority={priority} />;
}
