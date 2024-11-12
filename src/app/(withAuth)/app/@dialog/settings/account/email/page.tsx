import EmailPage from "@/containers/settings/email-page";
import { getUser } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Change email address",
};

export default async function Page() {
  const user = await getUser();

  return <EmailPage email={user.email} id={user.id} />;
}
