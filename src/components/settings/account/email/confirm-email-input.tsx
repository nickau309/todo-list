"use client";

import clsx from "clsx";
import { useId } from "react";
import { useFormContext } from "react-hook-form";

export default function ConfirmEmailInput() {
  const id = useId();

  const { register, clearErrors } = useFormContext();

  return (
    <div className="flex w-full max-w-[400px] flex-col gap-2">
      <div className="flex justify-between gap-2">
        <label htmlFor={id} className="truncate font-bold">
          Confirm new email
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
          id={id}
          autoComplete="off"
          className={clsx(
            "flex-1 bg-background-base-secondary px-2 py-1.5 font-sans leading-[18px]",
            "focus-visible:outline-none",
          )}
          {...register("confirm-email", {
            onChange: () => {
              clearErrors();
            },
          })}
        />
      </div>
    </div>
  );
}
