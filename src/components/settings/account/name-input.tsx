"use client";

import { maxNameLength } from "@/constants/user";
import clsx from "clsx";
import { useId } from "react";
import { useFormContext } from "react-hook-form";

export default function NameInput() {
  const { register } = useFormContext();

  const id = useId();

  return (
    <div className="flex w-full max-w-[400px] flex-col gap-2">
      <div className="flex justify-between gap-2">
        <label htmlFor={id} className="truncate font-bold">
          Name
        </label>
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
          className={clsx(
            "flex-1 bg-transparent px-2 py-1.5 font-sans leading-[18px]",
            "focus-visible:outline-none",
          )}
          {...register("name")}
        />
      </div>
    </div>
  );
}
