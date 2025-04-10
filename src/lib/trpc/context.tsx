// import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { cache } from "react";
import { auth } from "../auth";

// export const createTRPCContext = cache(async function createTRPCContext({
//   req,
//   resHeaders,
// }: FetchCreateContextFnOptions) {});

export const createTRPCContext = cache(async function createTRPCContext() {
  /**
   * @see: https://trpc.io/docs/server/context
   */
  const session = await auth();

  return { session };
});

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;
