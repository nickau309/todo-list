import { CheckLgIcon24 } from "@/assets";
import {
  useLocalSettings,
  useSetLocalSettings,
} from "@/contexts/local-settings-context";
import type { ThemeItemType } from "@/types/settings";
import { CompositeItem } from "@floating-ui/react";
import clsx from "clsx";
import { useId } from "react";
import { useFormContext } from "react-hook-form";

export default function ThemeInputItem({ className, name }: ThemeItemType) {
  const { syncTheme, theme } = useLocalSettings();
  const setLocalSettings = useSetLocalSettings();

  const labelId = useId();

  const { setValue } = useFormContext();

  const setTheme = () => {
    setLocalSettings((localSettings) => ({
      ...localSettings,
      theme: name,
    }));
    if (syncTheme) {
      setValue("theme", name, { shouldValidate: true, shouldDirty: true });
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
          role="radio"
          onClick={setTheme}
          className={clsx(
            "group flex overflow-hidden rounded-lg border border-theme-card",
            "transition-transform duration-100 ease-[cubic-bezier(.42,0,.58,1)]",
            "focus-visible:border-transparent focus-visible:outline-none focus-visible:ring focus-visible:ring-outer focus-visible:ring-offset-1 focus-visible:ring-offset-inner",
            "custom-hover:translate-y-[-3px]",
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
          <span id={labelId} className="text-xs/[15.2px] font-bold">
            {`${name[0]}${name.slice(1).toLowerCase()}`}
          </span>
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
