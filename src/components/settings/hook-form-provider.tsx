"use client";

import { useOptimisticUser } from "@/contexts/settings/optimistic-user-context";
import {
  DeleteAccountSchema,
  UpdateAccountSchema,
  UpdateEmailSchema,
  UpdatePasswordSchema,
  UpdateThemeSchema,
} from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelectedLayoutSegments } from "next/navigation";
import type { ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";
import type { ZodType } from "zod";

type ProviderProps = {
  children: ReactNode;
};

const schemaMap = new Map<string, ZodType>([
  ["account", UpdateAccountSchema],
  ["delete", DeleteAccountSchema],
  ["email", UpdateEmailSchema],
  ["password", UpdatePasswordSchema],
  ["theme", UpdateThemeSchema],
]);

export default function HookFormProvider({ children }: ProviderProps) {
  const { name, theme } = useOptimisticUser();

  const segment = useSelectedLayoutSegments();

  const schema = schemaMap.get(segment.at(-1) ?? "");

  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      "confirm-email": "",
      "confirm-password": "",
      name: name ?? "",
      "new-email": "",
      "new-password": "",
      password: "",
      reason: "",
      theme,
    },
    shouldUnregister: true,
    resolver: schema ? zodResolver(schema) : undefined,
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
}
