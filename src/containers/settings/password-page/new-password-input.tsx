import { EyeIcon24, EyeSlashIcon24 } from "@/assets";
import Text from "@/components/ui/text";
import {
  useSettingsDialogControl,
  useSettingsDialogState,
} from "@/contexts/settings-dialog-context";
import clsx from "clsx";
import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import { useId, useState } from "react";

type InputProps = {
  setErrorMessage: Dispatch<SetStateAction<string>>;
};

export default function NewPasswordInput({ setErrorMessage }: InputProps) {
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
      "new-password": e.target.value,
    }));
  };

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
            New password
          </Text>
        </div>
        <div
          className={clsx(
            "flex h-8 cursor-text items-center overflow-hidden rounded-[5px] border border-input-idle",
            "focus-within:border-input-focus",
          )}
        >
          <input
            type={isPasswordVisible ? "text" : "password"}
            autoComplete="off"
            id={id}
            minLength={8}
            name="new-password"
            onChange={handleInputChange}
            value={inputValues["new-password"]}
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
    </div>
  );
}
