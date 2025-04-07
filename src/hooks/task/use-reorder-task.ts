import { useTRPC } from "@/lib/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";

export default function useReorderTask() {
  const trpc = useTRPC();

  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    trpc.task.reorderTask.mutationOptions({
      onMutate: async (input) => {
        const { activeId, overId, parentTaskId, projectId } = input;

        const queryKey = trpc.task.getIds.queryKey({ projectId });

        await queryClient.cancelQueries({ queryKey });

        const prevState = queryClient.getQueryData(queryKey);

        queryClient.setQueryData(queryKey, (tasks) => {
          if (tasks === undefined) {
            return tasks;
          }

          const activeIndex = tasks.findIndex((task) => task.id === activeId);
          const overIndex = tasks.findIndex((task) => task.id === overId);

          const getTaskCount = (
            tasks: {
              id: number;
              parentTaskId: number | null;
            }[],
            index: number,
          ) => {
            const path = [tasks[index].id];
            let count = 1;
            for (let i = index + 1; i < tasks.length; ++i) {
              while (
                path.length > 0 &&
                path[path.length - 1] !== tasks[i].parentTaskId
              ) {
                path.pop();
              }
              if (path.length === 0) {
                break;
              }
              path.push(tasks[i].id);
              count += 1;
            }
            return count;
          };

          const activeCount = getTaskCount(tasks, activeIndex);
          const overCount = getTaskCount(tasks, overIndex);

          const activeItem = tasks[activeIndex];
          tasks[activeIndex] = {
            ...activeItem,
            parentTaskId,
          };

          const newTasks = tasks.slice();
          const activeTasks = newTasks.splice(activeIndex, activeCount);
          if (activeIndex < overIndex) {
            newTasks.splice(
              overIndex + overCount - activeCount,
              0,
              ...activeTasks,
            );
          } else {
            newTasks.splice(overIndex, 0, ...activeTasks);
          }
          return newTasks;
        });

        return { prevState };
      },
      onSuccess: (data, input) => {
        // const queryKey = trpc.task.findUniqueById.queryKey({ id: input.id });
        //
        // queryClient.setQueryData(queryKey, data);
      },
      onError: (error, input, context) => {
        // const queryKey = trpc.task.findUniqueById.queryKey({ id: input.id });
        //
        // queryClient.setQueryData(queryKey, context?.prevState);
      },
      onSettled: (data, error, input) => {
        // const queryKey = trpc.task.findUniqueById.queryKey({ id: input.id });
        //
        // void queryClient.invalidateQueries({ queryKey });
      },
    }),
  );

  const value = useMemo(() => ({ mutate }), [mutate]);

  return value;
}
