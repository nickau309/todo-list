"use client";

import { useSetLocalSettings } from "@/contexts/local-settings-context";
import type { ThemeType } from "@/types/user";
import { useEffect } from "react";

type Props = {
  theme: ThemeType;
};

export default function UpdateLocalSettings({ theme }: Props) {
  const setLocalSettings = useSetLocalSettings();

  // Update `localSettings` under some conditions only after initial render
  useEffect(() => {
    setLocalSettings((localSettings) => {
      if (localSettings.syncTheme && localSettings.theme !== theme) {
        return { ...localSettings, theme };
      }
      return localSettings;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
