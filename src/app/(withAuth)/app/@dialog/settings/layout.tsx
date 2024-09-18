import { OldConfirmDialog } from "@/components/old-confirm-dialog";
import AddTeamDialog from "@/components/dialogs/add-team-dialog";
import ContextProvider from "@/components/settings/context-provider";
import EnableBeforeUnloadIfIsDirty from "@/components/settings/enable-before-unload-if-is-dirty";
import HookFormProvider from "@/components/settings/hook-form-provider";
import NavMenu from "@/components/settings/nav-menu";
import OpenSettingsDialog from "@/components/settings/open-settings-dialog";
import SettingsDialog from "@/components/settings/settings-dialog";
import UpdateShowNavMenu from "@/components/settings/update-show-nav-menu";
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
  return (
    <ContextProvider>
      <HookFormProvider>
        <EnableBeforeUnloadIfIsDirty />
        <OpenSettingsDialog />
        <UpdateShowNavMenu />
        <SettingsDialog>
          <NavMenu />
          <div className="flex min-w-0 flex-1 flex-col text-sm/[17.6px]">
            {children}
          </div>
          <AddTeamDialog />
          <OldConfirmDialog />
        </SettingsDialog>
      </HookFormProvider>
    </ContextProvider>
  );
}
