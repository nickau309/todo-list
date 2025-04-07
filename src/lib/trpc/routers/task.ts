import { queryTask } from "@/lib/data";
import prisma, { getTaskFamily } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { authedProcedure, createTRPCRouter } from "../init";

export const taskRouter = createTRPCRouter({
  findUniqueById: authedProcedure
    .input(
      z.object({
        id: z.union([z.string().min(1).pipe(z.coerce.number()), z.number()]),
      }),
    )
    .query(async (opts) => {
      const { ctx, input } = opts;

      const task = await queryTask(input.id, Number(ctx.session.user.uid));

      if (task === null) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      return task;
    }),
  getIds: authedProcedure
    .input(
      z.object({
        projectId: z.union([
          z.string().min(1).pipe(z.coerce.number()),
          z.number(),
        ]),
      }),
    )
    .query(async (opts) => {
      const { ctx, input } = opts;

      try {
        const tasks = await prisma.task.findMany({
          select: {
            id: true,
            parentTaskId: true,
          },
          where: {
            isCompleted: undefined,
            projectId: input.projectId,
            userId: Number(ctx.session.user.uid),
          },
          orderBy: {
            childOrder: "asc",
          },
        });

        return tasks;
      } catch (error) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
  reorderTask: authedProcedure
    .input(
      z.object({
        activeId: z.union([
          z.string().min(1).pipe(z.coerce.number()),
          z.number(),
        ]),
        overId: z.union([
          z.string().min(1).pipe(z.coerce.number()),
          z.number(),
        ]),
        parentTaskId: z.number().nullable(),
        projectId: z.union([
          z.string().min(1).pipe(z.coerce.number()),
          z.number(),
        ]),
      }),
    )
    .mutation(async (opts) => {
      const { ctx, input } = opts;

      const projectId = input.projectId;

      await prisma.$transaction(async (tx) => {
        const activeTask = await tx.task.findUnique({
          where: {
            id: input.activeId,
            projectId,
            userId: Number(ctx.session.user.uid),
          },
          select: {
            childOrder: true,
          },
        });

        const overTask = await tx.task.findUnique({
          where: {
            id: input.overId,
            projectId,
            userId: Number(ctx.session.user.uid),
          },
          select: {
            childOrder: true,
          },
        });

        if (!activeTask || !overTask) {
          throw new TRPCError({ code: "BAD_REQUEST" });
        }

        const activeTaskFamily = await tx.$queryRawTyped(
          getTaskFamily(input.activeId, Number(ctx.session.user.uid)),
        );

        const activeTaskIds = activeTaskFamily
          .map((task) => task.id)
          .filter((id) => id !== null);
        // const activeCount = activeCountObj[0].count;

        const overTaskFamily = await tx.$queryRawTyped(
          getTaskFamily(input.overId, Number(ctx.session.user.uid)),
        );
        // const overCount = overCountObj[0].count;

        if (activeTask.childOrder < overTask.childOrder) {
          const low = activeTask.childOrder;
          const high = overTask.childOrder + overTaskFamily.length - 1;
          const mid = activeTask.childOrder + activeTaskFamily.length;

          await tx.task.updateMany({
            data: {
              childOrder: {
                decrement: mid - low,
              },
            },
            where: {
              childOrder: {
                gte: mid,
                lte: high,
              },
              projectId,
              userId: Number(ctx.session.user.uid),
            },
          });

          await tx.task.updateMany({
            data: {
              childOrder: {
                increment: high - mid + 1,
              },
            },
            where: {
              id: { in: activeTaskIds },
              projectId,
              userId: Number(ctx.session.user.uid),
            },
          });
        } else {
          const low = overTask.childOrder;
          const high = activeTask.childOrder + activeTaskFamily.length - 1;
          const mid = activeTask.childOrder;

          await tx.task.updateMany({
            data: {
              childOrder: {
                increment: high - mid + 1,
              },
            },
            where: {
              childOrder: {
                gte: low,
                lt: mid,
              },
              projectId,
              userId: Number(ctx.session.user.uid),
            },
          });

          await tx.task.updateMany({
            data: {
              childOrder: {
                decrement: mid - low,
              },
            },
            where: {
              id: { in: activeTaskIds },
              projectId,
              userId: Number(ctx.session.user.uid),
            },
          });
        }

        console.log({
          activeTaskFamily,
          overTaskFamily,
        });
        // const count = await tx.label.count({
        //   where: {
        //     userId,
        //   },
        // });
      });

      console.log(input);
    }),
  updateIsCompleted: authedProcedure
    .input(
      z.object({
        id: z.union([z.string().min(1).pipe(z.coerce.number()), z.number()]),
        isCompleted: z.boolean(),
      }),
    )
    .mutation(async (opts) => {
      const { ctx, input } = opts;

      try {
        const task = await prisma.task.update({
          where: {
            id: input.id,
            userId: Number(ctx.session.user.uid),
          },
          data: {
            isCompleted: input.isCompleted,
          },
          include: {
            labels: {
              select: {
                childOrder: true,
                color: true,
                id: true,
                name: true,
              },
              orderBy: { childOrder: "asc" },
            },
          },
        });

        return task;
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === "P2025") {
            throw new TRPCError({ code: "NOT_FOUND" });
          }
        }
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
  update: authedProcedure
    .input(
      z.object({
        id: z.union([z.string().min(1).pipe(z.coerce.number()), z.number()]),
        date: z.string().date().nullish(),
      }),
    )
    .mutation(async (opts) => {
      const { ctx, input } = opts;

      try {
        const dueDate =
          typeof input.date === "string" ? new Date(input.date) : input.date;

        const task = await prisma.task.update({
          where: {
            id: input.id,
            userId: Number(ctx.session.user.uid),
          },
          data: {
            dueDate,
          },
          include: {
            labels: {
              select: {
                childOrder: true,
                color: true,
                id: true,
                name: true,
              },
              orderBy: { childOrder: "asc" },
            },
          },
        });

        return task;
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
