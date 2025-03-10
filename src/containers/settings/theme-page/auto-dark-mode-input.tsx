import Switch from "@/components/switch";
import Text from "@/components/ui/text";
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
        <Text
          as="label"
          htmlFor={id}
          overflow="truncate"
          font="reactist"
          size="14px"
          height="17.6px"
          color="primary"
        >
          Auto Dark Mode
        </Text>
      </div>
      <Text
        as="p"
        id={descriptionId}
        font="reactist"
        size="13px"
        height="16.8px"
        color="secondary"
      >
        Automatically switch between light and dark themes when your system
        does.
      </Text>
    </div>
  );
}
