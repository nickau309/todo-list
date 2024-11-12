import ThemePage from "@/containers/settings/theme-page";
import { getUser } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Theme",
};

export default async function Page() {
  const user = await getUser();

  return <ThemePage id={user.id} />;
}
