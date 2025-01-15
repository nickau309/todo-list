import { TaskSchema } from "@/lib/zod";
import { z } from "zod";

export type QuickAddFormType = Omit<z.infer<typeof TaskSchema>, "childOrder">;
