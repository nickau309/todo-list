import { ExclamationIcon16 } from "@/assets";
import clsx from "clsx";
import type { ChangeEvent, ChangeEventHandler } from "react";

type EmailInputProps = {
  onChange?: ChangeEventHandler<HTMLInputElement>;
  errors?: string[];
};

export default function EmailInput({ onChange, errors }: EmailInputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
  };

  return (
    <div className="flex flex-col">
      <div
        className={clsx(
          "rounded-[10px] border",
          errors ? "border-input-error" : "border-input-idle",
          "p-2 pb-1",
          !errors && "has-[:focus-visible]:border-input-focus",
        )}
      >
        <label htmlFor="email" className="flex cursor-text flex-col gap-2">
          <div className="flex">
            <span className="cursor-default text-xs/[15.2px]">Email</span>
          </div>
          <div className="flex items-center gap-1">
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
              placeholder="Enter your email..."
              className={clsx(
                "flex-1 font-[Arial] font-semibold focus-visible:outline-none",
                "placeholder:font-normal placeholder:text-[#757575]",
              )}
            />
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
