"use client";

import { updateTheme } from "@/actions/settings";
import Text from "@/components/ui/text";
import {
  useSettingsDialogControl,
  useSettingsDialogState,
} from "@/contexts/settings-dialog-context";
import type { FormEvent } from "react";
import { startTransition } from "react";
import CancelButton from "../components/cancel-button";
import CloseSettingsDialogButton from "../components/close-settings-dialog-button";
import OpenNavMenuButton from "../components/open-nav-menu-button";
import AutoDarkModeInput from "./auto-dark-mode-input";
import SubmitButton from "./submit-button";
import SyncThemeInput from "./sync-theme-input";
import ThemeInput from "./theme-input";

type PageProps = {
  id: number;
};

export default function ThemePage({ id }: PageProps) {
  const { inputValues, optimisticSettings } = useSettingsDialogState();
  const { setOptimisticSettings } = useSettingsDialogControl();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(() => {
      setOptimisticSettings((optimisticSettings) => ({
        ...optimisticSettings,
        theme: inputValues.theme,
      }));
    });
    const formData = new FormData();
    formData.set("theme", inputValues.theme);
    await updateTheme(id, formData);
  };

  return (
    <form
      onSubmit={(e) => {
        void handleSubmit(e);
      }}
      className="flex h-full w-full flex-col divide-y divide-divider-secondary"
    >
      <header className="flex items-center justify-between gap-4 p-2 pl-4">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <OpenNavMenuButton />
          <div className="flex min-w-0 flex-1 items-center gap-1">
            <Text
              as="h2"
              overflow="truncate"
              font="reactist"
              size="16px"
              weight={600}
              height="23px"
              color="primary"
            >
              Theme
            </Text>
          </div>
        </div>
        <CloseSettingsDialogButton />
      </header>
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden p-4 pb-8">
        <div className="flex flex-col gap-4">
          <Text
            as="p"
            font="reactist"
            size="14px"
            height="17.6px"
            color="primary"
          >
            Personalize your Todoist with colors to match your style, mood, and
            personality.
          </Text>
          <SyncThemeInput />
          <AutoDarkModeInput />
          <ThemeInput />
        </div>
      </div>
      {optimisticSettings.theme !== inputValues.theme && (
        <footer className="flex flex-wrap justify-end gap-2.5 p-3">
          <CancelButton />
          <SubmitButton />
        </footer>
      )}
    </form>
  );
}
