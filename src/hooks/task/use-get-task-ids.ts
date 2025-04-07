import { useTRPC } from "@/lib/trpc/client";
import type { AppRouter } from "@/lib/trpc/routers/_app";
import { useQuery } from "@tanstack/react-query";
import { inferRouterInputs } from "@trpc/server";
import { useMemo } from "react";

type UseGetTaskIdsProps = inferRouterInputs<AppRouter>["task"]["getIds"];

export default function useGetTaskIds(props: UseGetTaskIdsProps) {
  const trpc = useTRPC();

  const { data } = useQuery(trpc.task.getIds.queryOptions(props));

  const value = useMemo(() => ({ data }), [data]);

  return value;
}
