import { useSettingsDialogState } from "@/contexts/settings-dialog-context";
import clsx from "clsx";
import Image from "next/image";
import { useId, useRef } from "react";

type PhotoInputType = {
  disabled: boolean;
};

export default function PhotoInput({ disabled }: PhotoInputType) {
  const descriptionId = useId();
  const ref = useRef<HTMLInputElement>(null);

  const { optimisticSettings } = useSettingsDialogState();

  const clickFileInput = () => {
    if (!disabled) {
      ref.current?.click();
    }
  };

  const name = optimisticSettings.name ?? "";
  const initLetter = name.at(0)?.toUpperCase() ?? "";

  return (
    <div className="flex flex-col gap-2">
      <h3 className="truncate text-sm/[17.6px] font-bold">Photo</h3>
      <div className="flex items-center gap-3">
        <span className="size-20 shrink-0 overflow-hidden rounded-full">
          <Image
            src={`https://d1nbslm0j6pual.cloudfront.net?text=${initLetter}&size=195&bg=ffffff`}
            alt={name}
            width="80"
            height="80"
          />
        </span>
        <div className="flex min-w-0 flex-col items-start gap-2">
          <p className="text-xs/[15.2px]">&nbsp;</p>
          <div>
            <button
              type="button"
              aria-disabled={disabled}
              onClick={clickFileInput}
              tabIndex={disabled ? -1 : undefined}
              className={clsx(
                "flex h-8 min-w-[68px] select-none items-center justify-center rounded-[5px] border border-transparent",
                "bg-actionable-secondary-idle-fill px-3 text-actionable-secondary-idle-tint",
                "transition-colors duration-300",
                "aria-disabled:cursor-not-allowed aria-disabled:bg-actionable-secondary-disabled-fill aria-disabled:text-actionable-secondary-disabled-tint",
                "custom-active:scale-[.97] custom-active:transition-transform custom-active:duration-200 custom-active:ease-[cubic-bezier(.02,1.505,.745,1.235)]",
                "custom-hocus:bg-actionable-secondary-hover-fill custom-hocus:text-actionable-secondary-hover-tint",
              )}
            >
              <span className="truncate text-[13px]/8 font-semibold">
                Upload photo
              </span>
            </button>
            <input
              ref={ref}
              type="file"
              accept=".jpg,.jpeg,.png"
              aria-describedby={descriptionId}
              disabled={disabled}
              className="sr-only"
            />
          </div>
          <div className="flex w-full flex-wrap gap-1">
            <p
              id={descriptionId}
              className="truncate text-xs/[15.2px] text-display-secondary-idle-tint"
            >
              Pick a photo up to 4MB.
            </p>
            <p className="truncate text-xs/[15.2px] text-display-secondary-idle-tint">
              Your avatar photo will be public.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
