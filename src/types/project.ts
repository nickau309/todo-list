import type { Label, Project, Task } from "@prisma/client";

type LabelType = Pick<Label, "childOrder" | "color" | "id" | "name">;

type TaskType = Pick<
  Task,
  | "childOrder"
  | "description"
  | "dueDate"
  | "id"
  | "isCompleted"
  | "name"
  | "priority"
> & {
  labels: LabelType[];
};

export type ProjectOptimisticType = Project & {
  tasks: TaskType[];
};

export type ProjectType = Project & {
  tasks: TaskType[];
};

export type NewProjectOptimisticType = NewProjectType & {
  isCreating?: boolean;
};

export type NewProjectType = Omit<Project, "userId">;
