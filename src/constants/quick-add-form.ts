import type { QuickAddFormType } from "@/types/quick-add-form";

export const INIT_INPUT_VALUES = {
  name: "",
  description: "",
  dueDate: null,
  priority: 4,
  labelIds: [],
  projectId: null,
} as const satisfies QuickAddFormType;
