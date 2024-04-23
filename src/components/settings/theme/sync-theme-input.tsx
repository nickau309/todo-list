"use client";

import Switch from "@/components/switch";
import {
  useLocalSettings,
  useSetLocalSettings,
} from "@/contexts/local-settings-context";
import { useId } from "react";
import { useFormContext } from "react-hook-form";

export default function SyncThemeInput() {
  const { syncTheme, theme } = useLocalSettings();
  const setLocalSettings = useSetLocalSettings();

  const id = useId();

  const { resetField, setValue } = useFormContext();

  const toggleCheckbox = () => {
    setLocalSettings((localSettings) => ({
      ...localSettings,
      syncTheme: !syncTheme,
    }));
    if (syncTheme) {
      resetField("theme");
    } else {
      setValue("theme", theme, { shouldValidate: true, shouldDirty: true });
    }
  };

  return (
    <div className="flex gap-2">
      <input
        type="checkbox"
        checked={syncTheme}
        id={id}
        onChange={toggleCheckbox}
        className="hidden"
      />
      <Switch isChecked={syncTheme} onClick={toggleCheckbox} />
      <label htmlFor={id} className="cursor-pointer">
        Sync theme
      </label>
    </div>
  );
}
