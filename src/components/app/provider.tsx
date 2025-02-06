import { TaskDialogProvider } from "@/components/task-dialog/task-dialog-context";
import { LabelsDataProvider } from "@/contexts/labels-data-context";
import { LocalSettingsProvider } from "@/contexts/local-settings-context";
import { OptimisticUserProvider } from "@/contexts/optimistic-user-context";
import { PrefersColorSchemeProvider } from "@/contexts/prefers-color-scheme-context";
import { SettingsDialogProvider } from "@/contexts/settings-dialog-context";
import { WidthProvider } from "@/contexts/width-context";
import type { LabelType } from "@/types/label";
import type { UserType } from "@/types/user";
import type { ReactNode } from "react";

type ProviderProps = {
  children: ReactNode;
  user: UserType;
  labels: LabelType[];
};

export default function Provider({ children, user, labels }: ProviderProps) {
  return (
    <LabelsDataProvider labels={labels}>
      <LocalSettingsProvider>
        <OptimisticUserProvider user={user}>
          <PrefersColorSchemeProvider>
            <SettingsDialogProvider user={user}>
              <TaskDialogProvider>
                <WidthProvider>{children}</WidthProvider>
              </TaskDialogProvider>
            </SettingsDialogProvider>
          </PrefersColorSchemeProvider>
        </OptimisticUserProvider>
      </LocalSettingsProvider>
    </LabelsDataProvider>
  );
}
