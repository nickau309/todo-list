"use client";

import { updateAccount } from "@/actions/settings";
import { OAUTH_PROVIDERS } from "@/constants/settings";
import { useSetOptimisticUser } from "@/contexts/optimistic-user-context";
import {
  useSettingsDialogControl,
  useSettingsDialogState,
} from "@/contexts/settings-dialog-context";
import clsx from "clsx";
import Link from "next/link";
import type { FormEvent } from "react";
import { startTransition } from "react";
import CancelButton from "../components/cancel-button";
import CloseSettingsDialogButton from "../components/close-settings-dialog-button";
import OpenNavMenuButton from "../components/open-nav-menu-button";
import SecondaryLink from "../components/secondary-link";
import NameInput from "./name-input";
import PhotoInput from "./photo-input";
import SubmitButton from "./submit-button";
import TwoFAButton from "./two-fa-button";

type PageProps = {
  email: string;
  id: number;
};

export default function AccountPage({ email, id }: PageProps) {
  const setOptimisticUser = useSetOptimisticUser();

  const { inputValues, optimisticSettings } = useSettingsDialogState();
  const { setOptimisticSettings } = useSettingsDialogControl();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(() => {
      setOptimisticSettings((optimisticSettings) => ({
        ...optimisticSettings,
        name: inputValues.name,
      }));
      setOptimisticUser((optimisticUser) => ({
        ...optimisticUser,
        name: inputValues.name,
      }));
    });
    const formData = new FormData();
    formData.set("name", inputValues.name ?? "");
    await updateAccount(id, formData);
  };

  return (
    <form
      onSubmit={(e) => {
        void handleSubmit(e);
      }}
      className="flex h-full w-full flex-col divide-y divide-divider-secondary"
    >
      <header className="flex items-center justify-between gap-4 p-2 pl-4">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <OpenNavMenuButton />
          <div className="flex min-w-0 flex-1 items-center gap-1">
            <h2 className="truncate text-base/[23px] font-semibold">Account</h2>
          </div>
        </div>
        <CloseSettingsDialogButton />
      </header>
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden p-4 pb-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <h3 className="truncate text-sm/[17.6px] font-bold">Plan</h3>
              <p className="truncate text-base/5 font-bold">Beginner</p>
            </div>
            <SecondaryLink href="/app/settings/subscription" disabled>
              Manage plan
            </SecondaryLink>
          </div>
          <hr className="border-divider-secondary" />
          <div className="flex flex-col gap-3">
            <PhotoInput disabled={true} />
            <NameInput />
            <div className="flex flex-col items-start gap-2">
              <h3 className="truncate text-sm/[17.6px] font-bold">Email</h3>
              <p className="text-sm/[17.6px]">{email}</p>
              <SecondaryLink href="/app/settings/account/email">
                Change email
              </SecondaryLink>
            </div>
            <div className="flex flex-col items-start gap-2">
              <h3 className="truncate text-sm/[17.6px] font-bold">Password</h3>
              <SecondaryLink href="/app/settings/account/password">
                Change password
              </SecondaryLink>
            </div>
            <div className="flex flex-col items-start gap-2">
              <h3 className="truncate text-sm/[17.6px] font-bold">
                Two-factor authentication
              </h3>
              <TwoFAButton />
            </div>
          </div>
          <hr className="border-divider-secondary" />
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h3 className="truncate text-sm/[17.6px] font-bold">
                Connected accounts
              </h3>
              <p className="text-xs/[15.2px] text-display-secondary-idle-tint">
                Log in to Todoist with your Google, Facebook, or Apple account.
              </p>
            </div>
            {OAUTH_PROVIDERS.map((provider) => {
              const Icon = provider.large_icon;
              return (
                <div
                  key={provider.name}
                  className="flex w-full max-w-[400px] flex-col"
                >
                  <a
                    aria-disabled="true"
                    className={clsx(
                      "flex h-8 min-w-[68px] select-none items-center justify-center gap-1.5 rounded-[5px] border border-transparent",
                      "bg-actionable-secondary-idle-fill px-3 text-actionable-secondary-idle-tint",
                      "transition-colors duration-300",
                      "aria-disabled:cursor-not-allowed aria-disabled:bg-actionable-secondary-disabled-fill aria-disabled:text-actionable-secondary-disabled-tint",
                      "custom-active:scale-[.97] custom-active:transition-transform custom-active:duration-200 custom-active:ease-[cubic-bezier(.02,1.505,.745,1.235)]",
                      "custom-hocus:bg-actionable-secondary-hover-fill custom-hocus:text-actionable-secondary-hover-tint",
                    )}
                  >
                    <span className="-ml-1.5">
                      <Icon />
                    </span>
                    <span className="truncate text-[13px]/8 font-semibold">
                      Connect with {provider.name}
                    </span>
                  </a>
                </div>
              );
            })}
          </div>
          <hr className="border-divider-secondary" />
          <div className="flex flex-col items-start gap-2">
            <h3 className="truncate text-sm/[17.6px] font-bold">
              Delete account
            </h3>
            <p className="text-xs/[15.2px]">
              This will immediately delete all of your data including tasks,
              projects, comments, and more. This can’t be undone.
            </p>
            <Link
              href="/app/settings/account/delete"
              aria-disabled="false"
              className={clsx(
                "flex h-8 min-w-[68px] select-none items-center justify-center rounded-[5px] border",
                "px-3 text-actionable-destructive-idle-tint",
                "transition-colors duration-300",
                "aria-disabled:cursor-not-allowed aria-disabled:text-actionable-destructive-disabled-tint",
                "custom-active:scale-[.97] custom-active:transition-transform custom-active:duration-200 custom-active:ease-[cubic-bezier(.02,1.505,.745,1.235)]",
                "custom-hocus:text-actionable-destructive-hover-tint",
              )}
            >
              <span className="truncate text-[13px]/8 font-semibold">
                Delete account
              </span>
            </Link>
          </div>
        </div>
      </div>
      {optimisticSettings.name !== inputValues.name && (
        <footer className="flex flex-wrap justify-end gap-2.5 p-3">
          <CancelButton />
          <SubmitButton />
        </footer>
      )}
    </form>
  );
}
