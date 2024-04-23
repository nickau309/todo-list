import { ExclamationIcon16, EyeIcon24, EyeSlashIcon24 } from "@/assets";
import clsx from "clsx";
import type { ChangeEvent, ChangeEventHandler } from "react";
import { useState } from "react";

type PasswordInputProps = {
  onChange?: ChangeEventHandler<HTMLInputElement>;
  errors?: string[];
};

export default function PasswordInput({
  onChange,
  errors,
}: PasswordInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="flex flex-col">
      <div
        className={clsx(
          "rounded-[10px] border",
          errors ? "border-input-alert" : "border-input-idle",
          "p-2 pb-1",
          !errors && "focus-within:border-input-focus",
        )}
      >
        <label htmlFor="password" className="flex cursor-text flex-col gap-2">
          <div className="flex">
            <span className="cursor-default text-xs/[15.2px]">Password</span>
          </div>
          <div className="flex items-center gap-1">
            <input
              type={isPasswordVisible ? "text" : "password"}
              id="password"
              name="password"
              autoComplete="current-password"
              minLength={8}
              onChange={handleChange}
              placeholder="Enter your password..."
              className={clsx(
                "flex-1 font-[Arial] font-semibold focus-visible:outline-none",
                "placeholder:font-normal placeholder:text-[#757575]",
              )}
            />
            <div className="-mr-1 flex">
              <button
                type="button"
                aria-label="Toggle password visibility"
                onClick={togglePasswordVisibility}
                className={clsx(
                  "grid size-6 place-items-center rounded-[5px]",
                  "transition-colors duration-300",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-display-primary-idle-tint",
                  "custom-active:scale-[.97] custom-active:transition-transform custom-active:duration-200 custom-active:ease-[cubic-bezier(.02,1.505,.745,1.235)]",
                  "custom-hocus:bg-actionable-quaternary-hover-fill",
                )}
              >
                {isPasswordVisible ? <EyeIcon24 /> : <EyeSlashIcon24 />}
              </button>
            </div>
          </div>
        </label>
      </div>
      <div aria-atomic="true" aria-live="polite">
        {errors?.map((error) => (
          <p
            key={error}
            className="flex gap-1 pt-2 text-display-content-danger"
          >
            <ExclamationIcon16 />
            <span className="text-[13px]/[16.8px]">{error}</span>
          </p>
        ))}
      </div>
    </div>
  );
}
