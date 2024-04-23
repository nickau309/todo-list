"use client";

import clsx from "clsx";
import { useId } from "react";
import { useFormContext } from "react-hook-form";

export default function ReasonInput() {
  const id = useId();

  const { register } = useFormContext();

  return (
    <div className="flex w-full max-w-[400px] flex-col gap-2">
      <div className="flex justify-between gap-2">
        <label htmlFor={id} className="truncate font-bold">
          Reason for deleting (optional)
        </label>
      </div>
      <div className="flex min-h-[35.2px] flex-col">
        <textarea
          id={id}
          className={clsx(
            "min-h-5 rounded-[5px] border border-input-idle bg-transparent p-2",
            "focus-visible:border-input-focus focus-visible:outline-none",
          )}
          {...register("reason")}
        />
      </div>
    </div>
  );
}
