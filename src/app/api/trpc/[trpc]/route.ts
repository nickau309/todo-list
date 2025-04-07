import { createTRPCContext } from "@/lib/trpc/context";
import { appRouter } from "@/lib/trpc/routers/_app";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

const handler = (req: Request) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: createTRPCContext,
  });
};

export { handler as GET, handler as POST };
