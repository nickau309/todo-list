import { maxNameLength } from "@/constants/user";
import { Theme } from "@prisma/client";
import { z } from "zod";

export const CredentialSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, "Passwords must be at least 8 characters long."),
});

export const LocalSettingsSchema = z
  .record(z.string(), z.unknown())
  .catch({})
  .transform((data) => ({
    ...z.object({ syncTheme: z.boolean() }).or(z.object({})).parse(data),
    ...z
      .object({ theme: z.nativeEnum(Theme) })
      .or(z.object({}))
      .parse(data),
    ...z.object({ useSystemTheme: z.boolean() }).or(z.object({})).parse(data),
  }));

export const DeleteAccountSchema = z.object({
  reason: z.string().optional(),
  password: z.string().min(8),
});

export const UpdateAccountSchema = z.object({
  name: z.string().max(maxNameLength),
});

export const UpdateEmailSchema = z.object({
  "confirm-email": z.string().email(),
  "new-email": z.string().email(),
  password: z.string().min(8),
});

export const UpdatePasswordSchema = z.object({
  "confirm-password": z.string().min(8),
  "new-password": z.string().min(8),
  password: z.string().min(8),
});

export const UpdateThemeSchema = z.object({
  theme: z.nativeEnum(Theme),
});
