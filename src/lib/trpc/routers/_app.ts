import { createTRPCRouter } from "../init";
import { projectRouter } from "./project";
import { taskRouter } from "./task";

export const appRouter = createTRPCRouter({
  project: projectRouter,
  task: taskRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
