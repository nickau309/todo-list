import { updateInfo } from "@/actions/task";
import type { ReactNode } from "react";
import { startTransition } from "react";
import {
  useOptimisticTask,
  useSetOptimisticTask,
} from "../contexts/optimistic-task-context";
import { useTaskControl } from "../contexts/task-context";
import type { TaskInfoFormSubmitHandler } from "../contexts/task-info-form-context";
import { useTaskInfoFormContext } from "../contexts/task-info-form-context";

type FormProps = {
  children: ReactNode;
};

export default function TaskInfoForm({ children }: FormProps) {
  const { id } = useOptimisticTask();
  const setOptimisticTask = useSetOptimisticTask();

  const { setIsEditingInfo } = useTaskControl();

  const { handleSubmit } = useTaskInfoFormContext();

  const onSubmit: TaskInfoFormSubmitHandler = async (data) => {
    setIsEditingInfo(false);
    startTransition(() => {
      setOptimisticTask((optimisticTask) => ({
        ...optimisticTask,
        ...data,
      }));
    });
    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }
    await updateInfo(id, formData);
  };

  return (
    <form
      onSubmit={(e) => {
        void handleSubmit(onSubmit)(e);
      }}
      className="flex min-w-0 flex-1 flex-col gap-2"
    >
      {children}
    </form>
  );
}
