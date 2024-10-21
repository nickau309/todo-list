"use server";

import { getTask } from "@/lib/data";
import dayjs from "@/lib/dayjs";
import prisma, {
  incrementTaskChildOrder,
  setTaskChildOrder,
} from "@/lib/prisma";
import {
  TaskDueDateSchema,
  TaskInfoSchema,
  TaskIsCompletedSchema,
  UpdatePrioritySchema,
  UpdateProjectIdSchema,
  UpdateTaskLabelSchema,
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
  const parsed = UpdatePrioritySchema.safeParse(Object.fromEntries(formData));

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

export async function connectLabel(id: number, formData: FormData) {
  const parsed = UpdateTaskLabelSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    throw new Error("Please fill in the form with valid values.");
  }

  await prisma.task.update({
    where: { id },
    data: {
      labels: {
        connect: { id: parsed.data.labelId },
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

export async function disconnectLabel(id: number, formData: FormData) {
  const parsed = UpdateTaskLabelSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    throw new Error("Please fill in the form with valid values.");
  }

  await prisma.task.update({
    where: { id },
    data: {
      labels: {
        disconnect: { id: parsed.data.labelId },
      },
    },
  });

  revalidateTag(`task-${id}`);
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

export async function reorderTask(id: number, formData: FormData) {
  const schema = z.object({
    childOrder: z.coerce.number().int(),
  });

  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    throw new Error("Please fill in the form with valid values.");
  }

  const { childOrder } = parsed.data;

  const modifiedTasks = await prisma.$queryRawTyped(
    setTaskChildOrder(id, childOrder),
  );

  console.log(modifiedTasks);

  for (const task of modifiedTasks) {
    if (task.id !== null) {
      revalidateTag(`task-${task.id}`);
    }
  }
  // may revalidate parent task id in future
  // should revalidate project id too
}
