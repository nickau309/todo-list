import Text from "@/components/ui/text";
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
      <Text
        as="h3"
        overflow="truncate"
        font="reactist"
        size="14px"
        weight={700}
        height="17.6px"
        color="primary"
      >
        Photo
      </Text>
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
          <Text
            as="p"
            font="reactist"
            size="12px"
            height="15.2px"
            color="primary"
          >
            &nbsp;
          </Text>
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
              <Text
                overflow="truncate"
                font="reactist"
                size="13px"
                weight={600}
                height="32px"
              >
                Upload photo
              </Text>
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
            <Text
              as="p"
              id={descriptionId}
              overflow="truncate"
              font="reactist"
              size="12px"
              height="15.2px"
              color="secondary"
            >
              Pick a photo up to 4MB.
            </Text>
            <Text
              as="p"
              overflow="truncate"
              font="reactist"
              size="12px"
              height="15.2px"
              color="secondary"
            >
              Your avatar photo will be public.
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}
