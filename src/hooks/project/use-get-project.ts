import { useTRPC } from "@/lib/trpc/client";
import type { AppRouter } from "@/lib/trpc/routers/_app";
import { useQuery } from "@tanstack/react-query";
import { inferRouterInputs } from "@trpc/server";

type Props = inferRouterInputs<AppRouter>["project"]["get"];

export default function useGetProject(props: Props) {
  const trpc = useTRPC();

  const query = useQuery(trpc.project.get.queryOptions(props));

  return query;
}
