"use server";

import prisma from "@/lib/prisma";
import { CreateProjectSchema } from "@/lib/zod";
import { revalidateTag } from "next/cache";

export async function createProject(userId: number, formData: FormData) {
  const parsed = CreateProjectSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    throw new Error("Please fill in the form with valid values.");
  }

  await prisma.project.create({
    data: {
      userId,
      ...parsed.data,
      childOrder: 0,
    },
  });

  revalidateTag("user");
}
