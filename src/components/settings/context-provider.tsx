import { AddTeamDialogProvider } from "@/contexts/add-team-dialog-context";
import { ConfirmDialogProvider } from "@/contexts/confirm-dialog-context";
import { OptimisticUserProvider } from "@/contexts/settings/optimistic-user-context";
import { ShowNavMenuProvider } from "@/contexts/settings/show-nav-menu-context";
import type { UserType } from "@/types/user";
import type { ReactNode } from "react";

type ProviderProps = {
  children: ReactNode;
  user: UserType;
};

export default function ContextProvider({ children, user }: ProviderProps) {
  return (
    <AddTeamDialogProvider>
      <ConfirmDialogProvider>
        <OptimisticUserProvider user={user}>
          <ShowNavMenuProvider>{children}</ShowNavMenuProvider>
        </OptimisticUserProvider>
      </ConfirmDialogProvider>
    </AddTeamDialogProvider>
  );
}
