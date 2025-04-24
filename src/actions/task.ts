"use server";

import { getTask, getUser } from "@/lib/data";
import dayjs from "@/lib/dayjs";
import prisma from "@/lib/prisma";
import {
  TaskDueDateSchema,
  TaskInfoSchema,
  TaskIsCompletedSchema,
  TaskLabelIdsSchema,
  TaskPrioritySchema,
  TaskSchema,
  UpdateProjectIdSchema,
} from "@/lib/zod";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function removeDueDate(id: number) {
  await prisma.task.update({
    where: { id },
    data: {
      dueDate: null,
    },
  });

  revalidateTag(`task-${id}`);
}

export async function updateDueDate(id: number, formData: FormData) {
  const parsed = TaskDueDateSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    throw new Error("Please fill in the form with valid values.");
  }

  const { dueDate } = await getTask(String(id));

  const { projectId } = await prisma.task.update({
    where: { id },
    data: {
      dueDate: new Date(parsed.data.date),
    },
  });

  revalidateTag(`project-${projectId}`);
  revalidateTag(`task-${id}`);
  revalidateTag(`date-${dayjs(dueDate).format("YYYY-MM-DD")}`);
  revalidateTag(`date-${parsed.data.date}`);
}

export async function updateInfo(id: number, formData: FormData) {
  const parsed = TaskInfoSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    throw new Error("Please fill in the form with valid values.");
  }

  await prisma.task.update({
    where: { id },
    data: parsed.data,
  });

  revalidateTag(`task-${id}`);
}

export async function updateIsCompleted(id: number, formData: FormData) {
  const parsed = TaskIsCompletedSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    throw new Error("Please fill in the form with valid values.");
  }

  const { projectId } = await prisma.task.update({
    where: { id },
    data: parsed.data,
  });

  revalidateTag(`project-${projectId}`);
  revalidateTag(`task-${id}`);
}

export async function updatePriority(id: number, formData: FormData) {
  const parsed = TaskPrioritySchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    throw new Error("Please fill in the form with valid values.");
  }

  await prisma.task.update({
    where: { id },
    data: parsed.data,
  });

  revalidateTag(`task-${id}`);
}

export async function updateProjectId(id: number, formData: FormData) {
  const parsed = UpdateProjectIdSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    throw new Error("Please fill in the form with valid values.");
  }

  await prisma.task.update({
    where: { id },
    data: parsed.data,
  });

  revalidateTag(`task-${id}`);
}

export async function updateLabels(id: number, formData: FormData) {
  const data = {
    labelIds: formData.getAll("labelId"),
  };

  const parsed = TaskLabelIdsSchema.parse(data);
  console.log({ data, parsed });

  await prisma.task.update({
    where: { id },
    data: {
      labels: {
        set: parsed.labelIds.map((labelId) => ({ id: labelId })),
      },
    },
  });

  revalidateTag(`task-${id}`);
}

export async function deleteTask(id: number, redirectTo = "/app/today") {
  await prisma.task.delete({
    where: { id },
  });

  revalidateTag(`task-${id}`);
  redirect(redirectTo);
}

export async function duplicateTask(id: number) {
  const task = await prisma.task.findUnique({
    where: { id },
    select: {
      childOrder: true,
      description: true,
      dueDate: true,
      labels: {
        select: {
          id: true,
        },
      },
      name: true,
      priority: true,
      projectId: true,
      userId: true,
    },
  });

  if (task === null) {
    throw new Error(`Task with id "${id}" does not exist.`);
  }

  const { labels: labelIds, ...rest } = task;

  await prisma.task.create({
    data: {
      labels: {
        connect: labelIds,
      },
      ...rest,
    },
  });
}
