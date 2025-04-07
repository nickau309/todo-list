import { useTRPC } from "@/lib/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useUpdateTask() {
  const trpc = useTRPC();

  const queryClient = useQueryClient();

  const mutation = useMutation(
    trpc.task.update.mutationOptions({
      onMutate: async (input) => {
        const queryKey = trpc.task.findUniqueById.queryKey({ id: input.id });

        await queryClient.cancelQueries({ queryKey });

        const prevState = queryClient.getQueryData(queryKey);

        const dueDate =
          typeof input.date === "string" ? new Date(input.date) : null;

        queryClient.setQueryData(queryKey, (task) => {
          if (task === undefined) {
            return task;
          }
          return { ...task, dueDate };
        });

        return { prevState };
      },
      onSuccess: (data, input) => {
        const queryKey = trpc.task.findUniqueById.queryKey({ id: input.id });

        queryClient.setQueryData(queryKey, data);
      },
      onError: (error, input, context) => {
        const queryKey = trpc.task.findUniqueById.queryKey({ id: input.id });

        queryClient.setQueryData(queryKey, context?.prevState);
      },
      onSettled: (data, error, input) => {
        const queryKey = trpc.task.findUniqueById.queryKey({ id: input.id });

        void queryClient.invalidateQueries({ queryKey });
      },
    }),
  );

  return mutation;
}
