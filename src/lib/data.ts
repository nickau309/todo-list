import "server-only";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import type { LabelType } from "@/types/label";
import type { ProjectType } from "@/types/project";
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
      },
    }),
  ["user"],
  { tags: ["user"] },
);

// Project
function queryProject(id: number, userId: number): Promise<ProjectType | null> {
  return prisma.project.findUnique({
    where: { id, userId },
    include: {
      tasks: {
        select: {
          childOrder: true,
          description: true,
          dueDate: true,
          id: true,
          isCompleted: true,
          labels: {
            select: {
              childOrder: true,
              color: true,
              id: true,
              name: true,
            },
            orderBy: { childOrder: "asc" },
          },
          name: true,
          priority: true,
        },
        orderBy: { childOrder: "asc" },
      },
    },
  });
}

export async function getProject(id: string): Promise<ProjectType> {
  const { id: userId } = await getRawUser();

  // const data = await prisma.$queryRaw`
  //   WITH RECURSIVE "TaskWithDepth" AS (
  //     SELECT id, "parentTaskId", 0 as depth
  //     FROM "Task"
  //     WHERE
  //       "parentTaskId" IS NULL AND
  //       "projectId" = ${Number(id)} AND
  //       "userId" = ${userId}
  //     UNION ALL
  //     SELECT t.id, t."parentTaskId", 1 + twd.depth as depth
  //     FROM "Task" t
  //     JOIN "TaskWithDepth" twd ON t."parentTaskId" = twd.id
  //   )
  //   SELECT * FROM "TaskWithDepth"
  //   -- SELECT p.*, (SELECT * FROM "TaskWithDepth") as task
  //   -- FROM "Project" p
  //   -- WHERE
  //   --   ID = ${Number(id)} AND
  //   --   "userId" = ${userId}
  // `;
  // console.log(data);

  const getCachedProject = unstable_cache(
    queryProject.bind(null, Number(id), userId),
    [`project-${id}`],
    { tags: [`project-${id}`] },
  );

  const project = await getCachedProject();

  if (project === null) {
    notFound();
  }

  return project;
}

// Task
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
