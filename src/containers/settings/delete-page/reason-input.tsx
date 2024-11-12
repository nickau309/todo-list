import {
  useSettingsDialogControl,
  useSettingsDialogState,
} from "@/contexts/settings-dialog-context";
import clsx from "clsx";
import type { ChangeEvent } from "react";
import { useId } from "react";

export default function ReasonInput() {
  const id = useId();

  const { inputValues } = useSettingsDialogState();
  const { setInputValues } = useSettingsDialogControl();

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValues((inputValues) => ({
      ...inputValues,
      reason: e.target.value,
    }));
  };

  return (
    <div className="flex w-full max-w-[400px] flex-col gap-2">
      <div className="flex justify-between gap-2">
        <label htmlFor={id} className="truncate text-sm/[17.6px] font-bold">
          Reason for deleting (optional)
        </label>
      </div>
      <div className="flex min-h-[35.2px] flex-col">
        <textarea
          id={id}
          name="reason"
          onChange={handleChange}
          value={inputValues.reason}
          className={clsx(
            "min-h-5 rounded-[5px] border border-input-idle bg-transparent p-2",
            "focus-visible:border-input-focus focus-visible:outline-none",
          )}
        />
      </div>
    </div>
  );
}
