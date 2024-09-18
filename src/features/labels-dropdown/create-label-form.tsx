import { createLabel } from "@/actions/label";
import {
  useOptimisticUser,
  useSetOptimisticUser,
} from "@/contexts/optimistic-user-context";
import type { ReactNode } from "react";
import { startTransition } from "react";
import type { CreateLabelFormSubmitHandler } from "./context/create-label-form-context";
import { useCreateLabelFormContext } from "./context/create-label-form-context";

type FormProps = {
  children: ReactNode;
};

export default function CreateLabelForm({ children }: FormProps) {
  const { id } = useOptimisticUser();
  const setOptimisticUser = useSetOptimisticUser();

  const { handleSubmit } = useCreateLabelFormContext();

  const onSubmit: CreateLabelFormSubmitHandler = async (data) => {
    startTransition(() => {
      setOptimisticUser((optimisticUser) => ({
        ...optimisticUser,
        labels: [
          ...optimisticUser.labels,
          {
            childOrder: Number.MAX_SAFE_INTEGER,
            color: "CHARCOAL",
            id: Number.MAX_SAFE_INTEGER,
            isCreating: true,
            name: data.name,
          },
        ],
      }));
    });
    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }
    await createLabel(id, formData);
  };

  return (
    <form
      onSubmit={(e) => {
        void handleSubmit(onSubmit)(e);
      }}
      className="flex flex-col divide-y divide-divider-secondary"
    >
      {children}
    </form>
  );
}
