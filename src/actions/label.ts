"use server";

import prisma from "@/lib/prisma";
import { CreateLabelSchema } from "@/lib/zod";
import { revalidateTag } from "next/cache";

export async function createLabel(userId: number, formData: FormData) {
  const parsed = CreateLabelSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    throw new Error("Please fill in the form with valid values.");
  }

  await prisma.label.create({
    data: {
      userId,
      ...parsed.data,
      childOrder: 0,
    },
  });

  revalidateTag("user");
}
