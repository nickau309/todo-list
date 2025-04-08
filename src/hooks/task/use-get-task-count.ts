import { useTRPC } from "@/lib/trpc/client";
import type { AppRouter } from "@/lib/trpc/routers/_app";
import { useQuery } from "@tanstack/react-query";
import { inferRouterInputs } from "@trpc/server";
import { useMemo } from "react";

type UseGetTaskCountProps = inferRouterInputs<AppRouter>["task"]["getCount"];

export default function useGetTaskCount(props: UseGetTaskCountProps) {
  const trpc = useTRPC();

  const query = useQuery(trpc.task.getCount.queryOptions(props));

  return query;
}
