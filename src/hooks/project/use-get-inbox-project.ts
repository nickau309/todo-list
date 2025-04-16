import { useTRPC } from "@/lib/trpc/client";
import type { AppRouter } from "@/lib/trpc/routers/_app";
import { useQuery } from "@tanstack/react-query";
import { inferRouterInputs } from "@trpc/server";

type Props = inferRouterInputs<AppRouter>["project"]["getInboxProject"];

export default function useGetInboxProject(props: Props) {
  const trpc = useTRPC();

  const query = useQuery(trpc.project.getInboxProject.queryOptions(props));

  return query;
}
