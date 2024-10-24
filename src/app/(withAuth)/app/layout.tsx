import { Provider, Sidebar } from "@/components/app";
import ClientComponent from "@/components/client-component";
import LoadingComponent from "@/components/loading-component";
import AddTeamDialog from "@/components/dialogs/add-team-dialog";
import KeyboardShortcutsDialog from "@/components/dialogs/keyboard-shortcuts-dialog";
import PrintDialog from "@/components/dialogs/print-dialog";
import ProductivityDialog from "@/components/dialogs/productivity-dialog";
import SyncDialog from "@/components/dialogs/sync-dialog";
import UpgradeToProDialog from "@/components/dialogs/upgrade-to-pro-dialog";
import { getUser } from "@/lib/data";
import Link from "next/link";
import { type ReactNode } from "react";
import ThemeWrapper from "./theme-wrapper";
import UpdateLocalSettings from "./update-local-settings";
import "./app.css";

type LayoutProps = {
  children: ReactNode;
  dialog: ReactNode;
  task: ReactNode;
};

export default async function Layout({ children, dialog, task }: LayoutProps) {
  const user = await getUser();

  return (
    <Provider user={user}>
      <UpdateLocalSettings theme={user.theme} />
      <ThemeWrapper>
        <div className="flex h-dvh items-center justify-center">
          <ClientComponent fallback={<LoadingComponent />}>
            <Sidebar name={user.name ?? ""} />
            <div className="h-full min-w-0 flex-1">{children}</div>
            {dialog}
            {task}
            <AddTeamDialog />
            <KeyboardShortcutsDialog />
            <PrintDialog />
            <ProductivityDialog />
            <SyncDialog />
            <UpgradeToProDialog />
          </ClientComponent>
        </div>
      </ThemeWrapper>
    </Provider>
  );
}
