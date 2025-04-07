import { useTRPC } from "@/lib/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useUpdateIsCompleted() {
  const trpc = useTRPC();

  const queryClient = useQueryClient();

  const mutation = useMutation(
    trpc.task.updateIsCompleted.mutationOptions({
      onMutate: async (input) => {
        const queryKey = trpc.task.findUniqueById.queryKey({ id: input.id });

        await queryClient.cancelQueries({ queryKey });

        const prevState = queryClient.getQueryData(queryKey);

        queryClient.setQueryData(queryKey, (task) => {
          if (task === undefined) {
            return task;
          }
          return { ...task, isCompleted: input.isCompleted };
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
