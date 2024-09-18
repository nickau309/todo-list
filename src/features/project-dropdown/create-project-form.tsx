import { createProject } from "@/actions/project";
import {
  useOptimisticUser,
  useSetOptimisticUser,
} from "@/contexts/optimistic-user-context";
import type { CreateProjectFormType } from "@/types/project";
import type { ReactNode } from "react";
import { startTransition } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useFormContext } from "react-hook-form";

type FormProps = {
  children: ReactNode;
};

export default function CreateProjectForm({ children }: FormProps) {
  const { id } = useOptimisticUser();
  const setOptimisticUser = useSetOptimisticUser();

  const { handleSubmit } = useFormContext<CreateProjectFormType>();

  const onSubmit: SubmitHandler<CreateProjectFormType> = async (data) => {
    startTransition(() => {
      setOptimisticUser((optimisticUser) => ({
        ...optimisticUser,
        projects: [
          ...optimisticUser.projects,
          {
            color: "CHARCOAL",
            id: Number.MAX_SAFE_INTEGER,
            isArchived: false,
            isCreating: true,
            isInboxProject: false,
            name: data.name,
          },
        ],
      }));
    });
    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }
    await createProject(id, formData);
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
