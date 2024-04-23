import { AddTeamDialogProvider } from "@/contexts/add-team-dialog-context";
import { KeyboardShortcutsDialogProvider } from "@/contexts/keyboard-shortcuts-dialog-context";
import { LocalSettingsProvider } from "@/contexts/local-settings-context";
import { PrefersColorSchemeProvider } from "@/contexts/prefers-color-scheme-context";
import { PrintDialogProvider } from "@/contexts/print-dialog-context";
import { ProductivityDialogProvider } from "@/contexts/productivity-dialog-context";
import { SettingsDialogProvider } from "@/contexts/settings-dialog-context";
import { SidebarProvider } from "@/contexts/sidebar-context";
import { SidebarWidthProvider } from "@/contexts/sidebar-width-context";
import { SyncDialogProvider } from "@/contexts/sync-dialog-context";
import { UpgradeToProDialogProvider } from "@/contexts/upgrade-to-pro-dialog-context";
import { WidthProvider } from "@/contexts/width-context";
import type { ReactNode } from "react";

type ProviderProps = {
  children: ReactNode;
};

export default function Provider({ children }: ProviderProps) {
  return (
    <AddTeamDialogProvider>
      <KeyboardShortcutsDialogProvider>
        <LocalSettingsProvider>
          <PrefersColorSchemeProvider>
            <PrintDialogProvider>
              <ProductivityDialogProvider>
                <SettingsDialogProvider>
                  <SidebarProvider>
                    <SidebarWidthProvider>
                      <SyncDialogProvider>
                        <UpgradeToProDialogProvider>
                          <WidthProvider>{children}</WidthProvider>
                        </UpgradeToProDialogProvider>
                      </SyncDialogProvider>
                    </SidebarWidthProvider>
                  </SidebarProvider>
                </SettingsDialogProvider>
              </ProductivityDialogProvider>
            </PrintDialogProvider>
          </PrefersColorSchemeProvider>
        </LocalSettingsProvider>
      </KeyboardShortcutsDialogProvider>
    </AddTeamDialogProvider>
  );
}
