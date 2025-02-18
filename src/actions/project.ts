"use server";

import { getUser } from "@/lib/data";
import prisma from "@/lib/prisma";
import { ProjectSchema } from "@/lib/zod";
import { revalidateTag } from "next/cache";

export async function createProject(formData: FormData) {
  const { id: userId } = await getUser();

  const data = {
    name: formData.get("name"),
    color: formData.get("color") ?? undefined,
  };

  const parsed = ProjectSchema.parse(data);

  await prisma.$transaction(async (tx) => {
    const count = await tx.project.count({
      where: {
        userId,
      },
    });

    await tx.project.create({
      data: {
        childOrder: count,
        name: parsed.name,
        color: parsed.color,
        userId,
      },
    });
  });

  revalidateTag("projects");
}
