import {
  useSettingsDialogControl,
  useSettingsDialogState,
} from "@/contexts/settings-dialog-context";
import clsx from "clsx";
import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import { useId } from "react";

type InputProps = {
  setErrorMessage: Dispatch<SetStateAction<string>>;
};

export default function NewEmailInput({ setErrorMessage }: InputProps) {
  const id = useId();

  const { inputValues } = useSettingsDialogState();
  const { setInputValues } = useSettingsDialogControl();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setErrorMessage("");
    setInputValues((inputValues) => ({
      ...inputValues,
      "new-email": e.target.value,
    }));
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex w-full max-w-[400px] flex-col gap-2">
        <div className="flex">
          <label htmlFor={id} className="truncate text-sm/[17.6px] font-bold">
            New email
          </label>
        </div>
        <div
          className={clsx(
            "flex h-8 cursor-text items-center overflow-hidden rounded-[5px] border border-input-idle",
            "focus-within:border-input-focus",
          )}
        >
          <input
            type="email"
            autoComplete="off"
            id={id}
            name="new-email"
            onChange={handleChange}
            value={inputValues["new-email"]}
            className={clsx(
              "min-w-0 flex-1 bg-background-base-secondary px-2 py-1.5 font-sans text-sm/[18px]",
              "focus-visible:outline-none",
            )}
          />
        </div>
      </div>
    </div>
  );
}
