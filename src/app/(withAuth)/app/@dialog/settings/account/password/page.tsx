import PasswordPage from "@/containers/settings/password-page";
import { getUser } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Change password",
};

export default async function Page() {
  const user = await getUser();

  return <PasswordPage id={user.id} />;
}
