import type { Task } from "@prisma/client";
import type { LabelType } from "./label";
import type { ProjectPreviewType } from "./project";

export type TaskInfoKeyType = keyof Pick<Task, "description" | "name">;

export type TaskOptimisticType = Task & {
  project: ProjectPreviewType;
  labels: LabelType[];
  isDeleting?: boolean;
};

export type TaskType = Task & {
  project: ProjectPreviewType;
  labels: LabelType[];
};
