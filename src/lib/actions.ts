"use server";

import { signIn, signOut } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { CredentialSchema } from "@/lib/zod";
import type { AuthFormState, ForgetPasswordFormState } from "@/types";
import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import { AuthError } from "next-auth";

export async function authenticate(
  _: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const validatedEmail = CredentialSchema.pick({
    email: true,
  }).safeParse({
    email: formData.get("email"),
  });

  if (!validatedEmail.success) {
    return validatedEmail.error.flatten().fieldErrors;
  }

  const validatedPassword = CredentialSchema.pick({
    password: true,
  }).safeParse({
    password: formData.get("password"),
  });

  if (!validatedPassword.success) {
    return validatedPassword.error.flatten().fieldErrors;
  }

  try {
    await signIn("login", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        return { message: "Wrong email or password." };
      }
      return { message: "Something went wrong." };
    }
    throw error;
  }
}

export async function createUser(
  _: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const validatedEmail = CredentialSchema.pick({
    email: true,
  }).safeParse({
    email: formData.get("email"),
  });

  if (!validatedEmail.success) {
    return validatedEmail.error.flatten().fieldErrors;
  }

  const validatedPassword = CredentialSchema.pick({
    password: true,
  }).safeParse({
    password: formData.get("password"),
  });

  if (!validatedPassword.success) {
    return validatedPassword.error.flatten().fieldErrors;
  }

  try {
    await signIn("signup", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      const realError = error.cause?.err;
      if (realError instanceof Prisma.PrismaClientKnownRequestError) {
        if (realError.code === "P2002") {
          return {
            message:
              "Oh no, this email address is unavailable! Please try a different address.",
          };
        }
      }
      return { message: "Something went wrong." };
    }
    throw error;
  }
}

export async function forgetPassword(
  _: ForgetPasswordFormState,
  formData: FormData,
): Promise<ForgetPasswordFormState> {
  const validatedEmail = CredentialSchema.pick({
    email: true,
  }).safeParse({
    email: formData.get("email"),
  });

  if (!validatedEmail.success) {
    return {
      success: false,
      email: validatedEmail.error.flatten().fieldErrors.email,
    };
  }

  const { email } = validatedEmail.data;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return {
      success: false,
      message: "User not found.",
    };
  }

  const password = await bcrypt.hash("12345678", 10);

  await prisma.user.update({
    where: { email },
    data: { password },
  });

  return { success: true };
}

export async function logOut() {
  await signOut();
}
