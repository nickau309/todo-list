"use server";

import { getUser } from "@/lib/data";
import prisma from "@/lib/prisma";
import { LabelSchema } from "@/lib/zod";
import { revalidateTag } from "next/cache";

export async function createLabel(formData: FormData) {
  const { id: userId } = await getUser();

  const data = {
    name: formData.get("name"),
    color: formData.get("color") ?? undefined,
  };

  const parsed = LabelSchema.parse(data);

  await prisma.$transaction(async (tx) => {
    const count = await tx.label.count({
      where: {
        userId,
      },
    });

    await tx.label.create({
      data: {
        childOrder: count,
        name: parsed.name,
        color: parsed.color,
        userId,
      },
    });
  });

  revalidateTag("labels");
}
