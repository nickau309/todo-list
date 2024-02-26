import React, { useId } from "react";
import { RadioGroup } from "@headlessui/react";
import { CheckLgIcon24 } from "@/assets";
import { Switch } from "@/components/switches";
import { useSettingsControl, useSettingsState } from "@/contexts";
import { themeData } from "@/data";
import { classNames } from "@/utils";

export default function SettingsTheme() {
  const id = useId();

  const { previewSettings } = useSettingsState();
  const { updatePreviewSettings } = useSettingsControl();

  const { isAutoDark, themeName } = previewSettings;

  return (
    <div className="flex h-full min-h-0 w-full grow flex-col gap-4 overflow-auto p-4 pb-6">
      <p className="font-reactist">
        Personalize your Todoist with colors to match your style, mood, and
        personality.
      </p>
      <div className="flex gap-2 line-through">
        <Switch
          id={id + "-sync"}
          className={classNames(
            "cursor-not-allowed",
            "focus-visible:outline-none focus-visible:ring-[1.6px] focus-visible:ring-primary-fill focus-visible:ring-offset-[2.4px]",
          )}
        />
        <label htmlFor={id + "-sync"} className="cursor-not-allowed">
          Sync theme
        </label>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <input type="hidden" name="isAutoDark" value={isAutoDark} readOnly />
          <Switch
            id={id + "-autodark"}
            isChecked={isAutoDark}
            onClick={() => updatePreviewSettings({ isAutoDark: !isAutoDark })}
            className="focus-visible:outline-none focus-visible:ring-[1.6px] focus-visible:ring-primary-fill focus-visible:ring-offset-[2.4px]"
          />
          <label htmlFor={id + "-autodark"} className="cursor-pointer">
            Auto Dark Mode
          </label>
        </div>
        <p className="text-[13px]/[16.8px] text-content-secondary">
          Automatically switch between light and dark themes when your system
          does.
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="font-bold">Your themes</h3>
        <RadioGroup
          value={themeName}
          onChange={(value) => updatePreviewSettings({ themeName: value })}
          name="themeName"
          className="grid grid-cols-[repeat(auto-fill,200px)] gap-4"
        >
          {themeData.map((theme) => (
            <RadioGroup.Option
              as="button"
              type="button"
              key={theme.name}
              value={theme.name}
              className={classNames(
                "overflow-hidden rounded-lg border border-theme-card transition-transform duration-100 ease-[cubic-bezier(.42,0,.58,1)]",
                "hover:translate-y-[-3px]",
                "focus-visible:outline-none focus-visible:ring focus-visible:ring-outer focus-visible:ring-offset-1 focus-visible:ring-offset-inner",
              )}
            >
              <div className={classNames("theme_card", theme.className)}>
                <div className="flex h-[34px] items-center bg-theme-card-header pl-2 text-theme-card-header">
                  <h4 className="text-xs/[15.2px] font-bold">{theme.name}</h4>
                </div>
                <div className="relative grid grid-cols-[min-content_100px_auto_min-content] grid-rows-[repeat(2,min-content)] items-center gap-2 bg-theme-card p-3">
                  <div className="col-span-1 row-span-1 box-content h-3 w-3 rounded-full border text-theme-card-priority"></div>
                  <div className="col-start-2 col-end-5 row-span-1 h-2 rounded-full bg-theme-card-content"></div>
                  <div className="col-start-2 col-end-3 row-span-1 h-2 rounded-full bg-theme-card-content"></div>
                  <div className="absolute bottom-px right-1 text-theme-card-selected-icon opacity-0 transition-opacity duration-100 ease-[cubic-bezier(.42,0,.58,1)] ui-checked:opacity-100">
                    <CheckLgIcon24 className="h-[30px] w-[30px]" />
                  </div>
                </div>
              </div>
            </RadioGroup.Option>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}
