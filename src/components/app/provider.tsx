import { TaskDialogProvider } from "@/components/task-dialog/task-dialog-context";
import { LabelsDataProvider } from "@/contexts/labels-data-context";
import { LocalSettingsProvider } from "@/contexts/local-settings-context";
import { OptimisticUserProvider } from "@/contexts/optimistic-user-context";
import { PrefersColorSchemeProvider } from "@/contexts/prefers-color-scheme-context";
import { ProjectsProvider } from "@/contexts/projects-context";
import { SettingsDialogProvider } from "@/contexts/settings-dialog-context";
import { WidthProvider } from "@/contexts/width-context";
import type { LabelType } from "@/types/label";
import { NewProjectType } from "@/types/project";
import type { UserType } from "@/types/user";
import type { ReactNode } from "react";

type ProviderProps = {
  children: ReactNode;
  user: UserType;
  labels: LabelType[];
  projects: NewProjectType[];
};

export default function Provider({
  children,
  labels,
  projects,
  user,
}: ProviderProps) {
  return (
    <LabelsDataProvider labels={labels}>
      <LocalSettingsProvider>
        <OptimisticUserProvider user={user}>
          <PrefersColorSchemeProvider>
            <ProjectsProvider projects={projects}>
              <SettingsDialogProvider user={user}>
                <TaskDialogProvider>
                  <WidthProvider>{children}</WidthProvider>
                </TaskDialogProvider>
              </SettingsDialogProvider>
            </ProjectsProvider>
          </PrefersColorSchemeProvider>
        </OptimisticUserProvider>
      </LocalSettingsProvider>
    </LabelsDataProvider>
  );
}
