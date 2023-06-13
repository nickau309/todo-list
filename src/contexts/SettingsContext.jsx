/* eslint-disable react-refresh/only-export-components */
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useRouteLoaderData } from "react-router-dom";
import equal from "fast-deep-equal";
import { themeData } from "@data";
import { usePrefersColorScheme } from "@hooks";

const SettingsStateContext = createContext(null);
const SettingsControlContext = createContext(null);
const ThemeContext = createContext(themeData[0]);

export function SettingsProvider({ children }) {
  const { settings } = useRouteLoaderData("root");

  const [previewSettings, setPreviewSettings] = useState(settings);

  // Settings State Context
  const hasChanged = !equal(settings, previewSettings);

  const settingsStateContextValue = useMemo(
    () => ({ previewSettings, hasChanged }),
    [previewSettings, hasChanged]
  );

  // Settings Control Context
  const discardChanges = useCallback(() => {
    setPreviewSettings(settings);
  }, [settings]);

  const updatePreviewSettings = useCallback((data) => {
    setPreviewSettings((s) => ({ ...s, ...data }));
  }, []);

  const settingsControlContextValue = useMemo(
    () => ({ discardChanges, updatePreviewSettings }),
    [discardChanges, updatePreviewSettings]
  );

  // Theme Context
  const { isAutoDark, themeName } = previewSettings;

  const isDark = usePrefersColorScheme();

  const theme =
    isAutoDark && isDark
      ? themeData.find((t) => t.name === "Dark")
      : themeData.find((t) => t.name === themeName);

  return (
    <SettingsStateContext.Provider value={settingsStateContextValue}>
      <SettingsControlContext.Provider value={settingsControlContextValue}>
        <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
      </SettingsControlContext.Provider>
    </SettingsStateContext.Provider>
  );
}

export function useSettingsState() {
  return useContext(SettingsStateContext);
}

export function useSettingsControl() {
  return useContext(SettingsControlContext);
}

export function useTheme() {
  return useContext(ThemeContext);
}
