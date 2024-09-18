import "server-only";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import type { TaskType } from "@/types/task";
import type { UserType } from "@/types/user";
import { notFound, redirect } from "next/navigation";
import { unstable_cache } from "next/cache";
import dayjs from "dayjs";

export async function getUser(): Promise<UserType> {
  const user = await getRawUser();

  return Object.fromEntries(
    Object.entries(user).filter(([key]) => key !== "password"),
  ) as UserType;
}

async function getRawUser() {
  const id = await getUserId();
  const user = await queryUser(id);

  if (user === null) {
    redirect("/auth/login");
  }

  return user;
}

async function getUserId(): Promise<number> {
  const session = await auth();

  if (!session?.user?.uid) {
    redirect("/auth/login");
  }

  return Number(session.user.uid);
}

const queryUser = unstable_cache(
  async (id: number) =>
    prisma.user.findUnique({
      where: { id },
      include: {
        projects: {
          select: {
            color: true,
            id: true,
            isInboxProject: true,
            name: true,
          },
          orderBy: [{ isInboxProject: "desc" }, { childOrder: "asc" }],
        },
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
    }),
  ["user"],
  { tags: ["user"] },
);

export async function getTask(id: string): Promise<TaskType> {
  const { id: userId } = await getRawUser();

  const queryTask = unstable_cache(
    async (id: number) =>
      prisma.task.findUnique({
        where: { id },
        include: {
          project: {
            select: {
              color: true,
              id: true,
              isArchived: true,
              isInboxProject: true,
              name: true,
            },
          },
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
      }),
    [`task-${id}`],
    { tags: [`task-${id}`] },
  );

  const task = await queryTask(Number(id));

  if (task === null || task.userId !== userId) {
    notFound();
  }

  return task;
}

export async function getIncompleteTaskCountOn(dueDate: Date) {
  const { id: userId } = await getRawUser();

  const dateStr = dayjs(dueDate).format("YYYY-MM-DD");

  const queryTaskCount = unstable_cache(
    async () => {
      return prisma.task.count({
        where: {
          isCompleted: false,
          dueDate,
          project: {
            isArchived: false,
          },
          userId,
        },
      });
    },
    [`user-${userId}`, `date-${dateStr}`],
    { tags: [`user-${userId}`, `date-${dateStr}`] },
  );

  return queryTaskCount();
}

// function isTask(task: unknown): task is TaskType {
//   // write a TaskSchema for task
// }
