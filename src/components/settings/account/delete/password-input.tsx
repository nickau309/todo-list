"use client";

import { EyeIcon24, EyeSlashIcon24 } from "@/assets";
import clsx from "clsx";
import Link from "next/link";
import { useId, useState } from "react";
import { useFormContext } from "react-hook-form";

export default function PasswordInput() {
  const descriptionId = useId();
  const id = useId();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const { register, clearErrors } = useFormContext();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex w-full max-w-[400px] flex-col gap-2">
        <div className="flex justify-between gap-2">
          <label htmlFor={id} className="truncate font-bold">
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
            id={id}
            aria-describedby={descriptionId}
            autoComplete="off"
            minLength={8}
            className={clsx(
              "flex-1 bg-transparent px-2 py-1.5 font-sans leading-[18px]",
              "focus-visible:outline-none",
            )}
            {...register("password", {
              onChange: () => {
                clearErrors();
              },
            })}
          />
          <button
            type="button"
            aria-disabled="false"
            aria-label="Toggle password visibility"
            onClick={togglePasswordVisibility}
            className={clsx(
              "-ml-1 mr-1 grid size-6 place-items-center rounded-[5px]",
              "transition-[border,box-shadow] duration-300 ease-[cubic-bezier(.25,.1,.25,1)]",
              "focus-visible:border-transparent focus-visible:outline-none focus-visible:ring focus-visible:ring-outer focus-visible:ring-offset-1 focus-visible:ring-offset-inner",
              "custom-active:scale-[.97] custom-active:transition-transform custom-active:duration-200 custom-active:ease-[cubic-bezier(.02,1.505,.745,1.235)]",
              "custom-hocus:bg-actionable-quaternary-hover-fill",
            )}
          >
            {isPasswordVisible ? <EyeIcon24 /> : <EyeSlashIcon24 />}
          </button>
        </div>
      </div>
      <p
        id={descriptionId}
        className="text-[13px]/[16.8px] text-display-secondary-idle-tint"
      >
        Deleting your account requires your current password as confirmation. If
        you signed up via Google, Facebook, or Apple, you must first set a
        password in{" "}
        <Link
          href="/app/settings/account/password"
          className={clsx(
            "truncate text-display-accent-primary-fill",
            "transition-[border,box-shadow] duration-300 ease-[cubic-bezier(.25,.1,.25,1)]",
            "focus-visible:border-transparent focus-visible:outline-none focus-visible:ring focus-visible:ring-outer focus-visible:ring-offset-1 focus-visible:ring-offset-inner",
          )}
        >
          Account settings
        </Link>
        .
      </p>
    </div>
  );
}
