"use client";

import { updateTheme } from "@/actions/settings";
import { useSetOptimisticUser } from "@/contexts/settings/optimistic-user-context";
import type { ReactNode } from "react";
import { startTransition } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useFormContext } from "react-hook-form";

type UpdateThemeFormProps = {
  children: ReactNode;
  id: number;
};

export default function UpdateThemeForm({
  children,
  id,
}: UpdateThemeFormProps) {
  const setOptimisticUser = useSetOptimisticUser();

  const { handleSubmit } = useFormContext();

  const onSubmit: SubmitHandler<Record<string, string>> = (data) => {
    startTransition(() => {
      setOptimisticUser((optimisticUser) => ({
        ...optimisticUser,
        ...data,
      }));
    });
    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }
    void updateTheme(id, formData);
  };

  return (
    <form
      onSubmit={(e) => {
        void handleSubmit(onSubmit)(e);
      }}
      className="flex min-h-0 flex-1 flex-col"
    >
      {children}
    </form>
  );
}
