import { queryProject } from "@/lib/data";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { authedProcedure, createTRPCRouter } from "../init";

export const projectRouter = createTRPCRouter({
  get: authedProcedure
    .input(
      z.object({
        id: z.union([z.string().min(1).pipe(z.coerce.number()), z.number()]),
      }),
    )
    .query(async (opts) => {
      const { ctx, input } = opts;

      const project = await queryProject(
        input.id,
        Number(ctx.session.user.uid),
      );

      if (project === null) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      return project;
    }),
});
