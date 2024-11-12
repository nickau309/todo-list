import DeletePage from "@/containers/settings/delete-page";
import { getUser } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Delete account",
};

export default async function Page() {
  const user = await getUser();

  return <DeletePage id={user.id} />;
}
