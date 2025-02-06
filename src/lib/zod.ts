import { maxNameLength } from "@/constants/user";
import { Color, Theme } from "@prisma/client";
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
  email: z.string().email(),
  reason: z.string().optional(),
  password: z.string().min(8),
});

// settings
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

// project
export const CreateProjectSchema = z.object({
  name: z.string().max(120),
});

// task
export const TaskSchema = z.object({
  name: z
    .string({
      errorMap: (issue, ctx) => {
        if (issue.code === "too_big") {
          const length = typeof ctx.data === "string" ? ctx.data.length : 0;
          return {
            message: `Task name character limit: ${length} / ${issue.maximum}`,
          };
        }
        return { message: ctx.defaultError };
      },
    })
    .min(1)
    .max(500),
  description: z
    .string({
      errorMap: (issue, ctx) => {
        if (issue.code === "too_big") {
          const length = typeof ctx.data === "string" ? ctx.data.length : 0;
          return {
            message: `Task description character limit: ${length} / ${issue.maximum}`,
          };
        }
        return { message: ctx.defaultError };
      },
    })
    .max(16383),
  dueDate: z
    .union([z.date(), z.string().datetime().pipe(z.coerce.date())])
    .nullable(),
  priority: z.coerce.number().int().gte(1).lte(4),
  labelIds: z.coerce.number().int().array(),
  projectId: z.coerce.number().int().nullable(),
  childOrder: z.coerce.number().int().gte(0).nullish(),
});

export const TaskInfoSchema = TaskSchema.pick({
  name: true,
  description: true,
});

export const TaskDueDateSchema = TaskSchema.pick({
  dueDate: true,
}).required();

export const TaskIsCompletedSchema = z.object({
  isCompleted: z.enum(["true", "false"]).transform((value) => value === "true"),
});

export const TaskPrioritySchema = TaskSchema.pick({
  priority: true,
});

export const TaskLabelIdsSchema = TaskSchema.pick({
  labelIds: true,
});

export const UpdateProjectIdSchema = z.object({
  projectId: z.coerce.number().int(),
});

// label
export const LabelSchema = z.object({
  name: z.string().min(1).max(60),
  color: z.nativeEnum(Color).optional(),
});

// General
export const DateSchema = z.string().date();
