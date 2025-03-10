import { CheckLgIcon24 } from "@/assets";
import Text from "@/components/ui/text";
import {
  useLocalSettings,
  useSetLocalSettings,
} from "@/contexts/local-settings-context";
import { useSettingsDialogControl } from "@/contexts/settings-dialog-context";
import type { ThemeItemType } from "@/types/settings";
import { CompositeItem } from "@floating-ui/react";
import clsx from "clsx";
import { useId } from "react";

export default function ThemeInputItem({ className, name }: ThemeItemType) {
  const { syncTheme, theme } = useLocalSettings();
  const setLocalSettings = useSetLocalSettings();

  const labelId = useId();

  const { setInputValues } = useSettingsDialogControl();

  const handleClick = () => {
    setLocalSettings((localSettings) => ({
      ...localSettings,
      theme: name,
    }));
    if (syncTheme) {
      setInputValues((inputValues) => ({
        ...inputValues,
        theme: name,
      }));
    }
  };

  return (
    <CompositeItem
      render={
        <button
          type="button"
          aria-checked={name === theme}
          aria-disabled="false"
          aria-labelledby={labelId}
          onClick={handleClick}
          role="radio"
          className={clsx(
            "group flex overflow-hidden rounded-[10px] border border-divider-primary",
            className,
            "theme_card",
          )}
        />
      }
    >
      <div className="flex h-full w-[44px] flex-col gap-1 bg-theme-card-sidebar px-1 py-2">
        <div className="h-2 rounded-full bg-theme-card-accent" />
        <div className="h-2 rounded-full bg-theme-card-sidebar-selected" />
        <div className="h-2 rounded-full bg-theme-card-sidebar-hover" />
        <div className="h-2 rounded-full bg-theme-card-sidebar-hover" />
      </div>
      <div className="flex h-full flex-1 flex-col items-start gap-2 bg-theme-card p-2 pt-0">
        <div className="flex w-full items-center justify-between text-theme-card-accent">
          <Text
            overflow="truncate"
            font="reactist"
            size="12px"
            weight={700}
            height="15.2px"
          >
            {`${name[0]}${name.slice(1).toLowerCase()}`}
          </Text>
          <span
            className={clsx(
              "grid size-6 place-items-center opacity-0",
              "transition-opacity duration-100 ease-[cubic-bezier(.42,0,.58,1)]",
              "group-aria-checked:opacity-100",
            )}
          >
            <CheckLgIcon24 />
          </span>
        </div>
        <div className="grid grid-cols-[min-content_100px_auto_min-content] grid-rows-[repeat(2,min-content)] items-center gap-2">
          <div className="col-span-1 row-span-1 box-content size-2.5 rounded-full border border-theme-card-priority" />
          <div className="col-start-2 col-end-5 row-span-1 h-2 rounded-full bg-theme-card-content" />
          <div className="col-start-2 col-end-3 row-span-1 h-2 rounded-full bg-theme-card-content" />
        </div>
      </div>
    </CompositeItem>
  );
}
