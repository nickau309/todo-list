import "server-only";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import type { UserType } from "@/types/user";
import { unstable_cache } from "next/cache";
import { redirect } from "next/navigation";

export async function getUser(): Promise<UserType> {
  const id = await getUserId();
  const user = await queryUser(id);

  if (user === null) {
    redirect("/auth/login");
  }

  return Object.fromEntries(
    Object.entries(user).filter(([key]) => key !== "password"),
  ) as UserType;
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
