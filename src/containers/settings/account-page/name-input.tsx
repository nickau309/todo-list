import Text from "@/components/ui/text";
import { maxNameLength } from "@/constants/user";
import {
  useSettingsDialogControl,
  useSettingsDialogState,
} from "@/contexts/settings-dialog-context";
import clsx from "clsx";
import type { ChangeEvent } from "react";
import { useId } from "react";

export default function NameInput() {
  const id = useId();

  const { inputValues } = useSettingsDialogState();
  const { setInputValues } = useSettingsDialogControl();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValues((inputValues) => ({
      ...inputValues,
      name: e.target.value,
    }));
  };

  const name = inputValues.name ?? "";

  return (
    <div className="flex flex-col gap-1">
      <div className="flex w-full max-w-[400px] flex-col gap-2">
        <div className="flex">
          <Text
            as="label"
            htmlFor={id}
            overflow="truncate"
            font="reactist"
            size="14px"
            weight={700}
            height="17.6px"
            color="primary"
          >
            Name
          </Text>
        </div>
        <div
          className={clsx(
            "flex h-8 cursor-text items-center overflow-hidden rounded-[5px] border border-input-idle",
            "focus-within:border-input-focus",
          )}
        >
          <input
            type="text"
            id={id}
            maxLength={maxNameLength}
            onChange={handleChange}
            value={name}
            className={clsx(
              "min-w-0 flex-1 truncate px-2 py-1.5 font-sans text-sm/[18px]",
              "focus-visible:outline-none",
            )}
          />
        </div>
      </div>
      <div className="flex w-full max-w-[400px] justify-end">
        <Text
          overflow="truncate"
          font="reactist"
          size="13px"
          height="16.8px"
          color={
            name.length > 244 ? "text-display-content-danger" : "secondary"
          }
        >
          {name.length}/{maxNameLength}
        </Text>
      </div>
    </div>
  );
}
