import { CreateProjectSchema } from "@/lib/zod";
import type { Project } from "@prisma/client";
import { z } from "zod";

export type CreateProjectFormType = z.infer<typeof CreateProjectSchema>;

export type ProjectPreviewType = Pick<
  Project,
  "color" | "id" | "isArchived" | "isInboxProject" | "name"
> &
  ProjectOptimisticType;

type ProjectOptimisticType = {
  isCreating?: boolean;
};
