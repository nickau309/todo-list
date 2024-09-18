import type { Label } from "@prisma/client";

export type LabelOptimisticType = LabelType & {
  isCreating?: boolean;
};

export type LabelType = Omit<Label, "userId">;
