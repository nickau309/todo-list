import { queryProject } from "@/lib/data";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
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
  getInboxProject: authedProcedure.query(async (opts) => {
    const { ctx } = opts;

    try {
      const project = await prisma.project.findFirstOrThrow({
        where: {
          isInboxProject: true,
          userId: Number(ctx.session.user.uid),
        },
      });

      return project;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new TRPCError({ code: "NOT_FOUND" });
        }
      }

      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  }),
});
