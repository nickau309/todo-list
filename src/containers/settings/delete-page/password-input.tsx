import { EyeIcon24, EyeSlashIcon24 } from "@/assets";
import {
  useSettingsDialogControl,
  useSettingsDialogState,
} from "@/contexts/settings-dialog-context";
import clsx from "clsx";
import Link from "next/link";
import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import { useId, useState } from "react";

type InputProps = {
  setErrorMessage: Dispatch<SetStateAction<string>>;
};

export default function PasswordInput({ setErrorMessage }: InputProps) {
  const descriptionId = useId();
  const id = useId();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const { inputValues } = useSettingsDialogState();
  const { setInputValues } = useSettingsDialogControl();

  const handleButtonClick = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setErrorMessage("");
    setInputValues((inputValues) => ({
      ...inputValues,
      password: e.target.value,
    }));
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex w-full max-w-[400px] flex-col gap-2">
        <div className="flex">
          <label htmlFor={id} className="truncate text-sm/[17.6px] font-bold">
            Todoist password
          </label>
        </div>
        <div
          className={clsx(
            "flex h-8 cursor-text items-center overflow-hidden rounded-[5px] border border-input-idle",
            "focus-within:border-input-focus",
          )}
        >
          <input
            type={isPasswordVisible ? "text" : "password"}
            aria-describedby={descriptionId}
            autoComplete="off"
            id={id}
            minLength={8}
            name="password"
            onChange={handleInputChange}
            value={inputValues.password}
            className={clsx(
              "min-w-0 flex-1",
              isPasswordVisible && "truncate",
              "bg-transparent px-2 py-1.5 font-sans text-sm/[18px]",
              "focus-visible:outline-none",
            )}
          />
          <button
            type="button"
            aria-disabled="false"
            aria-label="Toggle password visibility"
            onClick={handleButtonClick}
            className={clsx(
              "-ml-1 mr-1",
              "grid size-6 place-items-center rounded-[5px]",
              "text-actionable-quaternary-idle-tint",
              "transition-colors duration-300",
              "aria-disabled:cursor-not-allowed aria-disabled:text-actionable-quaternary-disabled-tint",
              "custom-active:scale-[.97] custom-active:transition-transform custom-active:duration-200 custom-active:ease-[cubic-bezier(.02,1.505,.745,1.235)]",
              "custom-hocus:bg-actionable-quaternary-hover-fill custom-hocus:text-actionable-quaternary-hover-tint",
            )}
          >
            {isPasswordVisible ? <EyeIcon24 /> : <EyeSlashIcon24 />}
          </button>
        </div>
      </div>
      <div className="flex w-full max-w-[400px]">
        <p
          id={descriptionId}
          className="text-[13px]/[16.8px] text-display-secondary-idle-tint"
        >
          Deleting your account requires your current password as confirmation.
          If you signed up via Google, Facebook, or Apple, you must first set a
          password in{" "}
          <Link
            href="/app/settings/account/password"
            className={clsx(
              "truncate text-[13px]/[16.8px]",
              "text-display-accent-primary-tint",
              "custom-hover:underline",
            )}
          >
            Account settings
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
