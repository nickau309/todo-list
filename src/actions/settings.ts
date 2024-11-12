"use server";

import { signOut } from "@/lib/auth";
import prisma from "@/lib/prisma";
import {
  DeleteAccountSchema,
  UpdateAccountSchema,
  UpdateEmailSchema,
  UpdatePasswordSchema,
  UpdateThemeSchema,
} from "@/lib/zod";
import type {
  DeleteAccountFormState,
  UpdateEmailFormState,
  UpdatePasswordFormState,
} from "@/types/settings";
import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteAccount(
  id: number,
  formData: FormData,
): Promise<DeleteAccountFormState> {
  const parsed = DeleteAccountSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return {
      message: "Please fill in the form in the correct format.",
    };
  }

  const { email, password } = parsed.data;

  // Check if email and password correct
  const user = await prisma.user.findUnique({
    where: { id },
    select: { email: true, password: true },
  });
  // For type safety only. Impossible case.
  if (!user) {
    throw new Error("User not found");
  }

  if (email !== user.email) {
    return {
      message: "You entered an incorrect email. Please confirm and try again.",
    };
  }

  const passwordsMatch = await bcrypt.compare(password, user.password);
  if (!passwordsMatch) {
    return {
      message:
        "You entered an incorrect password. Please confirm and try again.",
    };
  }

  // Delete account
  try {
    await prisma.user.delete({
      where: { id },
    });
  } catch (error) {
    return { message: "Something went wrong." };
  }

  await signOut({ redirectTo: "/auth/account-deleted" });
}

export async function updateAccount(
  id: number,
  formData: FormData,
): Promise<void> {
  const parsed = UpdateAccountSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    throw new Error("Please fill in the form with valid values.");
  }

  await prisma.user.update({
    where: { id },
    data: parsed.data,
  });

  revalidateTag("user");
}

export async function updateEmail(
  id: number,
  formData: FormData,
): Promise<UpdateEmailFormState> {
  const parsed = UpdateEmailSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return {
      message: "Please fill in the form in the correct format.",
    };
  }

  const {
    "confirm-email": confirmEmail,
    "new-email": newEmail,
    password,
  } = parsed.data;

  // Check if email matches confirm-email
  if (newEmail !== confirmEmail) {
    return {
      message:
        "Your confirmation email doesn't match your new email. Please try again.",
    };
  }

  // Check if password correct
  const user = await prisma.user.findUnique({
    where: { id },
    select: { password: true },
  });
  // For type safety only. Impossible case.
  if (!user) {
    throw new Error("User not found");
  }
  const passwordsMatch = await bcrypt.compare(password, user.password);
  if (!passwordsMatch) {
    return {
      message:
        "You entered an incorrect password. Please confirm and try again.",
    };
  }

  // Update email
  try {
    await prisma.user.update({
      where: { id },
      data: { email: newEmail },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          message:
            "An error occurred. Please check that this email address is not already in use.",
        };
      }
    }
    return { message: "Something went wrong." };
  }

  revalidateTag("user");
  redirect("/app/settings");
}

export async function updatePassword(
  id: number,
  formData: FormData,
): Promise<UpdatePasswordFormState> {
  const parsed = UpdatePasswordSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return {
      message: "Please fill in the form in the correct format.",
    };
  }

  const {
    "confirm-password": confirmPassword,
    "new-password": newPassword,
    password,
  } = parsed.data;

  // Check if password correct
  const user = await prisma.user.findUnique({
    where: { id },
    select: { password: true },
  });
  // For type safety only. Impossible case.
  if (!user) {
    throw new Error("User not found");
  }
  const passwordsMatch = await bcrypt.compare(password, user.password);
  if (!passwordsMatch) {
    return {
      message:
        "You entered an incorrect password. Please confirm and try again.",
    };
  }

  // Check if new-password matches confirm-password
  if (newPassword !== confirmPassword) {
    return {
      message:
        "Your confirmation password doesn't match your new password. Please try again.",
    };
  }

  // Update password
  const hashPassword = await bcrypt.hash(newPassword, 10);
  try {
    await prisma.user.update({
      where: { id },
      data: { password: hashPassword },
    });
  } catch (error) {
    return { message: "Something went wrong." };
  }

  revalidateTag("user");
  redirect("/app/settings");
}

export async function updateTheme(id: number, formData: FormData) {
  const parsed = UpdateThemeSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    throw new Error("Please fill in the form with valid values.");
  }

  await prisma.user.update({
    where: { id },
    data: parsed.data,
  });

  revalidateTag("user");
}
