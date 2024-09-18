import { getIncompleteTaskCountOn } from "@/lib/data";
import { DateSchema } from "@/lib/zod";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const dueDate = searchParams.get("dueDate");

  let count = 0;
  const parsed = DateSchema.safeParse(dueDate);
  if (parsed.success) {
    count = await getIncompleteTaskCountOn(new Date(parsed.data));
  }

  return Response.json(count);
}
