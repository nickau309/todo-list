import { CreateProjectSchema } from "@/lib/zod";
import type { Label, Project, Task } from "@prisma/client";
import { z } from "zod";

export type CreateProjectFormType = z.infer<typeof CreateProjectSchema>;

export type ProjectPreviewType = Pick<
  Project,
  "color" | "id" | "isArchived" | "isInboxProject" | "name"
> & {
  isCreating?: boolean;
};

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
