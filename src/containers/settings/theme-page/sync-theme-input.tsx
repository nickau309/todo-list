import Switch from "@/components/switch";
import Text from "@/components/ui/text";
import {
  useLocalSettings,
  useSetLocalSettings,
} from "@/contexts/local-settings-context";
import {
  useSettingsDialogControl,
  useSettingsDialogState,
} from "@/contexts/settings-dialog-context";
import { useId } from "react";

export default function SyncThemeInput() {
  const { syncTheme, theme } = useLocalSettings();
  const setLocalSettings = useSetLocalSettings();

  const id = useId();

  const { optimisticSettings } = useSettingsDialogState();
  const { setInputValues } = useSettingsDialogControl();

  const setSyncTheme = (syncTheme: boolean) => {
    setLocalSettings((localSettings) => ({
      ...localSettings,
      syncTheme,
    }));
    if (syncTheme) {
      setInputValues((inputValues) => ({
        ...inputValues,
        theme,
      }));
    } else {
      setInputValues((inputValues) => ({
        ...inputValues,
        theme: optimisticSettings.theme,
      }));
    }
  };

  return (
    <div className="flex gap-2">
      <Switch id={id} isChecked={syncTheme} setIsChecked={setSyncTheme} />
      <Text
        as="label"
        htmlFor={id}
        overflow="truncate"
        font="reactist"
        size="14px"
        height="17.6px"
        color="primary"
      >
        Sync theme
      </Text>
    </div>
  );
}
