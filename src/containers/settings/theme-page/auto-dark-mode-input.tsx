import Switch from "@/components/switch";
import {
  useLocalSettings,
  useSetLocalSettings,
} from "@/contexts/local-settings-context";
import { useId } from "react";

export default function AutoDarkModeInput() {
  const id = useId();
  const descriptionId = useId();

  const { useSystemTheme } = useLocalSettings();
  const setLocalSettings = useSetLocalSettings();

  const setUseSystemTheme = (useSystemTheme: boolean) => {
    setLocalSettings((localSettings) => ({
      ...localSettings,
      useSystemTheme,
    }));
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Switch
          aria-describedby={descriptionId}
          id={id}
          isChecked={useSystemTheme}
          setIsChecked={setUseSystemTheme}
        />
        <label htmlFor={id} className="cursor-pointer text-sm/[17.6px]">
          Auto Dark Mode
        </label>
      </div>
      <p
        id={descriptionId}
        className="text-[13px]/[16.8px] text-display-secondary-idle-tint"
      >
        Automatically switch between light and dark themes when your system
        does.
      </p>
    </div>
  );
}
