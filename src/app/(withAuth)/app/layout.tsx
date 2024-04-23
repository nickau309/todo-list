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
};

export default async function Layout({ children, dialog }: LayoutProps) {
  const user = await getUser();

  return (
    <Provider>
      <UpdateLocalSettings theme={user.theme} />
      <ThemeWrapper>
        <div className="flex h-dvh items-center justify-center">
          <ClientComponent fallback={<LoadingComponent />}>
            <Sidebar name={user.name ?? ""} />
            <div className="h-full flex-1 overflow-y-auto">
              right
              <br />
              <a href="#test" className="focus:border focus:border-red">
                test
              </a>
              <Link href="/app/temp">Test</Link>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              bottom
              {children}
            </div>
            {dialog}
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
