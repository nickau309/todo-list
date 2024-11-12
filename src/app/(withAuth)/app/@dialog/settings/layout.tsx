import SettingsClientLayout from "@/containers/settings/settings-client-layout";
import type { Metadata } from "next";
import type { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: {
    template: "%s – Settings – Todoist",
    default: "Settings – Todoist",
  },
};

export default function Layout({ children }: LayoutProps) {
  return <SettingsClientLayout>{children}</SettingsClientLayout>;
}
