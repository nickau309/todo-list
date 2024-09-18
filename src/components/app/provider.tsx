import { AddTeamDialogProvider } from "@/contexts/add-team-dialog-context";
import { KeyboardShortcutsDialogProvider } from "@/contexts/keyboard-shortcuts-dialog-context";
import { LocalSettingsProvider } from "@/contexts/local-settings-context";
import { OptimisticUserProvider } from "@/contexts/optimistic-user-context";
import { PrefersColorSchemeProvider } from "@/contexts/prefers-color-scheme-context";
import { PrintDialogProvider } from "@/contexts/print-dialog-context";
import { ProductivityDialogProvider } from "@/contexts/productivity-dialog-context";
import { SettingsDialogProvider } from "@/contexts/settings-dialog-context";
import { SidebarProvider } from "@/contexts/sidebar-context";
import { SidebarWidthProvider } from "@/contexts/sidebar-width-context";
import { SyncDialogProvider } from "@/contexts/sync-dialog-context";
import { TaskDialogProvider } from "@/components/task-dialog/task-dialog-context";
import { UpgradeToProDialogProvider } from "@/contexts/upgrade-to-pro-dialog-context";
import { WidthProvider } from "@/contexts/width-context";
import type { UserType } from "@/types/user";
import type { ReactNode } from "react";

type ProviderProps = {
  children: ReactNode;
  user: UserType;
};

export default function Provider({ children, user }: ProviderProps) {
  return (
    <AddTeamDialogProvider>
      <KeyboardShortcutsDialogProvider>
        <LocalSettingsProvider>
          <OptimisticUserProvider user={user}>
            <PrefersColorSchemeProvider>
              <PrintDialogProvider>
                <ProductivityDialogProvider>
                  <SettingsDialogProvider>
                    <SidebarProvider>
                      <SidebarWidthProvider>
                        <SyncDialogProvider>
                          <TaskDialogProvider>
                            <UpgradeToProDialogProvider>
                              <WidthProvider>{children}</WidthProvider>
                            </UpgradeToProDialogProvider>
                          </TaskDialogProvider>
                        </SyncDialogProvider>
                      </SidebarWidthProvider>
                    </SidebarProvider>
                  </SettingsDialogProvider>
                </ProductivityDialogProvider>
              </PrintDialogProvider>
            </PrefersColorSchemeProvider>
          </OptimisticUserProvider>
        </LocalSettingsProvider>
      </KeyboardShortcutsDialogProvider>
    </AddTeamDialogProvider>
  );
}
