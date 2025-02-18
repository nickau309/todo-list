import type { Task } from "@prisma/client";
import type { LabelType } from "./label";

export type TaskInfoKeyType = keyof Pick<Task, "description" | "name">;

export type TaskOptimisticType = Task & {
  labels: LabelType[];
  isDeleting?: boolean;
};

export type TaskType = Task & {
  labels: LabelType[];
};
