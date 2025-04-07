import "server-only";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import type { LabelType } from "@/types/label";
import type { NewProjectType, ProjectType } from "@/types/project";
import type { TaskType } from "@/types/task";
import type { UserType } from "@/types/user";
import dayjs from "dayjs";
import { unstable_cache } from "next/cache";
import { notFound, redirect } from "next/navigation";

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
    }),
  ["user"],
  { tags: ["user"] },
);

// Project
export function queryProject(
  id: number,
  userId: number,
): Promise<ProjectType | null> {
  return prisma.project.findUnique({
    where: { id, userId },
  });
}

// Task
export async function getTask(id: string): Promise<TaskType> {
  const { id: userId } = await getRawUser();

  const getCachedTask = unstable_cache(queryTask, [`task-${id}`], {
    tags: [`task-${id}`],
  });

  const task = await getCachedTask(Number(id), userId);

  if (task === null || task.userId !== userId) {
    notFound();
  }

  return task;
}

export function queryTask(
  id: number,
  userId: number,
): Promise<TaskType | null> {
  return prisma.task.findUnique({
    where: { id, userId },
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

// Projects
export async function getProjects(): Promise<NewProjectType[]> {
  const { id: userId } = await getRawUser();

  const getCachedProjects = unstable_cache(
    (userId: number) => queryProjects(userId),
    ["projects"],
    { tags: ["projects"] },
  );

  return getCachedProjects(userId);
}

function queryProjects(userId: number): Promise<NewProjectType[]> {
  return prisma.project.findMany({
    where: { userId },
    select: {
      childOrder: true,
      color: true,
      id: true,
      isArchived: true,
      isFavorite: true,
      isInboxProject: true,
      name: true,
      viewStyle: true,
    },
    orderBy: [{ isInboxProject: "desc" }, { childOrder: "asc" }],
  });
}

// Labels
export async function getLabels(): Promise<LabelType[]> {
  const { id: userId } = await getRawUser();

  const getCachedLabels = unstable_cache(
    (userId: number) => queryLabels(userId),
    ["labels"],
    { tags: ["labels"] },
  );

  return getCachedLabels(userId);
}

function queryLabels(userId: number): Promise<LabelType[]> {
  return prisma.label.findMany({
    where: { userId },
    select: {
      childOrder: true,
      color: true,
      id: true,
      name: true,
    },
    orderBy: { childOrder: "asc" },
  });
}
