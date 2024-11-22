import { LocalSettingsProvider } from "@/contexts/local-settings-context";
import { OptimisticUserProvider } from "@/contexts/optimistic-user-context";
import { PrefersColorSchemeProvider } from "@/contexts/prefers-color-scheme-context";
import { SettingsDialogProvider } from "@/contexts/settings-dialog-context";
import { SidebarProvider } from "@/contexts/sidebar-context";
import { TaskDialogProvider } from "@/components/task-dialog/task-dialog-context";
import { WidthProvider } from "@/contexts/width-context";
import type { UserType } from "@/types/user";
import type { ReactNode } from "react";

type ProviderProps = {
  children: ReactNode;
  user: UserType;
};

export default function Provider({ children, user }: ProviderProps) {
  return (
    <LocalSettingsProvider>
      <OptimisticUserProvider user={user}>
        <PrefersColorSchemeProvider>
          <SettingsDialogProvider user={user}>
            <TaskDialogProvider>
              <WidthProvider>
                <SidebarProvider>{children}</SidebarProvider>
              </WidthProvider>
            </TaskDialogProvider>
          </SettingsDialogProvider>
        </PrefersColorSchemeProvider>
      </OptimisticUserProvider>
    </LocalSettingsProvider>
  );
}
