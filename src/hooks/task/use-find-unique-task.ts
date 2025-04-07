import { useTRPC } from "@/lib/trpc/client";
import type { AppRouter } from "@/lib/trpc/routers/_app";
import { useQuery } from "@tanstack/react-query";
import { inferRouterInputs } from "@trpc/server";

type UseFindUniqueTaskProps =
  inferRouterInputs<AppRouter>["task"]["findUniqueById"];

export default function useFindUniqueTask(props: UseFindUniqueTaskProps) {
  const trpc = useTRPC();

  const query = useQuery(trpc.task.findUniqueById.queryOptions(props));

  return query;
}
