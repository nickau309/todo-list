import { OldConfirmDialogProvider } from "@/components/old-confirm-dialog";
import { AddTeamDialogProvider } from "@/contexts/add-team-dialog-context";
import { ShowNavMenuProvider } from "@/contexts/settings/show-nav-menu-context";
import type { ReactNode } from "react";

type ProviderProps = {
  children: ReactNode;
};

export default function ContextProvider({ children }: ProviderProps) {
  return (
    <AddTeamDialogProvider>
      <OldConfirmDialogProvider>
        <ShowNavMenuProvider>{children}</ShowNavMenuProvider>
      </OldConfirmDialogProvider>
    </AddTeamDialogProvider>
  );
}
