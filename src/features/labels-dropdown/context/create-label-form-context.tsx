import { CreateLabelSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ReactNode } from "react";
import type { SubmitHandler } from "react-hook-form";
import {
  FormProvider,
  useForm,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { z } from "zod";

type CreateLabelFormType = z.infer<typeof CreateLabelSchema>;

export type CreateLabelFormSubmitHandler = SubmitHandler<CreateLabelFormType>;

type ProviderProps = {
  children: ReactNode;
};

export function CreateLabelFormProvider({ children }: ProviderProps) {
  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
    },
    shouldUnregister: true,
    resolver: zodResolver(CreateLabelSchema),
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
}

export const useCreateLabelFormContext = useFormContext<CreateLabelFormType>;

export const useCreateLabelFormWatch = useWatch<CreateLabelFormType>;
