import { getTask } from "@/lib/data";
import type { ReactNode } from "react";
import { OptimisticTaskProvider } from "./contexts/optimistic-task-context";
import { TaskProvider } from "./contexts/task-context";
import { TaskInfoFormProvider } from "./contexts/task-info-form-context";
import TaskClientLayout from "./task-client-layout";

type LayoutProps = {
  children: ReactNode;
  params: {
    taskId: string;
  };
};

export default async function TaskServerLayout({
  children,
  params,
}: LayoutProps) {
  const { taskId } = params;
  const task = await getTask(taskId);

  return (
    <OptimisticTaskProvider task={task}>
      <TaskProvider>
        <TaskInfoFormProvider>
          <TaskClientLayout>{children}</TaskClientLayout>
        </TaskInfoFormProvider>
      </TaskProvider>
    </OptimisticTaskProvider>
  );
}
