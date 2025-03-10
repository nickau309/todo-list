import Text from "@/components/ui/text";
import { useSetLocalSettings } from "@/contexts/local-settings-context";
import {
  useSettingsDialogControl,
  useSettingsDialogState,
} from "@/contexts/settings-dialog-context";
import clsx from "clsx";

export default function CancelButton() {
  const setLocalSettings = useSetLocalSettings();

  const { optimisticSettings } = useSettingsDialogState();
  const { setInputValues } = useSettingsDialogControl();

  const handleClick = () => {
    setLocalSettings((localSettings) => ({
      ...localSettings,
      theme: optimisticSettings.theme,
    }));
    setInputValues(optimisticSettings);
  };

  return (
    <button
      type="button"
      aria-disabled="false"
      onClick={handleClick}
      className={clsx(
        "flex h-8 min-w-[68px] select-none items-center justify-center rounded-[5px] border border-transparent",
        "bg-actionable-secondary-idle-fill px-3 text-actionable-secondary-idle-tint",
        "transition-[border,box-shadow] duration-300 ease-[cubic-bezier(.25,.1,.25,1)]",
        "focus-visible:border-transparent focus-visible:outline-none focus-visible:ring focus-visible:ring-outer focus-visible:ring-offset-1 focus-visible:ring-offset-inner",
        "aria-disabled:cursor-not-allowed aria-disabled:bg-actionable-secondary-disabled-fill aria-disabled:text-actionable-secondary-disabled-tint",
        "custom-active:scale-[.97] custom-active:transition-transform custom-active:duration-200 custom-active:ease-[cubic-bezier(.02,1.505,.745,1.235)]",
        "custom-hocus:bg-actionable-secondary-hover-fill custom-hocus:text-actionable-secondary-hover-tint",
      )}
    >
      <Text
        overflow="truncate"
        font="reactist"
        size="13px"
        weight={600}
        height="32px"
      >
        Cancel
      </Text>
    </button>
  );
}
