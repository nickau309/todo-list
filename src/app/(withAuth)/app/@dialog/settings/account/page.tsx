import AccountPage from "@/containers/settings/account-page";
import { getUser } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account",
};

export default async function Page() {
  const user = await getUser();

  return <AccountPage email={user.email} id={user.id} />;
}
