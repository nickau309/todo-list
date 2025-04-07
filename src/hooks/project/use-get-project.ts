import { useTRPC } from "@/lib/trpc/client";
import type { AppRouter } from "@/lib/trpc/routers/_app";
import { useQuery } from "@tanstack/react-query";
import { inferRouterInputs } from "@trpc/server";
import { useMemo } from "react";

type UseGetProjectProps = inferRouterInputs<AppRouter>["project"]["get"];

export default function useGetProject(props: UseGetProjectProps) {
  const trpc = useTRPC();

  const { data } = useQuery(trpc.project.get.queryOptions(props));

  const value = useMemo(() => ({ data }), [data]);

  return value;
}
