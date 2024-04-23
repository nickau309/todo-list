"use client";

import { updateEmail } from "@/actions/settings";
import type { ReactNode } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useFormContext } from "react-hook-form";

type UpdateEmailFormProps = {
  children: ReactNode;
  id: number;
};

export default function UpdateEmailForm({
  children,
  id,
}: UpdateEmailFormProps) {
  const { handleSubmit, setError } = useFormContext();

  const onSubmit: SubmitHandler<Record<string, string>> = async (data) => {
    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }
    const state = await updateEmail(id, undefined, formData);
    if (state !== undefined) {
      setError("root", { message: state.message });
    }
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
