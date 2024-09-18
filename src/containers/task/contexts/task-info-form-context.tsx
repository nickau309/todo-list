"use client";

import { TaskInfoSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ReactNode } from "react";
import type { SubmitHandler } from "react-hook-form";
import {
  FormProvider,
  useController,
  useForm,
  useFormContext,
} from "react-hook-form";
import { z } from "zod";

export type TaskInfoFormType = z.infer<typeof TaskInfoSchema>;

export type TaskInfoFormSubmitHandler = SubmitHandler<TaskInfoFormType>;

type ProviderProps = {
  children: ReactNode;
};

export function TaskInfoFormProvider({ children }: ProviderProps) {
  const methods = useForm<TaskInfoFormType>({
    mode: "onChange",
    defaultValues: {
      name: "",
      description: "",
    },
    resolver: zodResolver(TaskInfoSchema),
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
}

export const useTaskInfoFormController = useController<TaskInfoFormType>;

export const useTaskInfoFormContext = useFormContext<TaskInfoFormType>;
