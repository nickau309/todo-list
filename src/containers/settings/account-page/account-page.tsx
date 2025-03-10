"use client";

import { updateAccount } from "@/actions/settings";
import Text from "@/components/ui/text";
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
            <Text
              as="h2"
              overflow="truncate"
              font="reactist"
              size="16px"
              weight={600}
              height="23px"
              color="primary"
            >
              Account
            </Text>
          </div>
        </div>
        <CloseSettingsDialogButton />
      </header>
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden p-4 pb-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <Text
                as="h3"
                overflow="truncate"
                font="reactist"
                size="14px"
                weight={700}
                height="17.6px"
                color="primary"
              >
                Plan
              </Text>
              <Text
                as="p"
                overflow="truncate"
                font="reactist"
                size="16px"
                weight={700}
                height="20px"
                color="primary"
              >
                Beginner
              </Text>
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
              <Text
                as="h3"
                overflow="truncate"
                font="reactist"
                size="14px"
                weight={700}
                height="17.6px"
                color="primary"
              >
                Email
              </Text>
              <Text
                as="p"
                font="reactist"
                size="14px"
                height="17.6px"
                color="primary"
              >
                {email}
              </Text>
              <SecondaryLink href="/app/settings/account/email">
                Change email
              </SecondaryLink>
            </div>
            <div className="flex flex-col items-start gap-2">
              <Text
                as="h3"
                overflow="truncate"
                font="reactist"
                size="14px"
                weight={700}
                height="17.6px"
                color="primary"
              >
                Password
              </Text>
              <SecondaryLink href="/app/settings/account/password">
                Change password
              </SecondaryLink>
            </div>
            <div className="flex flex-col items-start gap-2">
              <Text
                as="h3"
                overflow="truncate"
                font="reactist"
                size="14px"
                weight={700}
                height="17.6px"
                color="primary"
              >
                Two-factor authentication
              </Text>
              <TwoFAButton />
            </div>
          </div>
          <hr className="border-divider-secondary" />
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Text
                as="h3"
                overflow="truncate"
                font="reactist"
                size="14px"
                weight={700}
                height="17.6px"
                color="primary"
              >
                Connected accounts
              </Text>
              <Text
                as="p"
                font="reactist"
                size="12px"
                height="15.2px"
                color="secondary"
              >
                Log in to Todoist with your Google, Facebook, or Apple account.
              </Text>
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
                    <Text
                      overflow="truncate"
                      font="reactist"
                      size="13px"
                      weight={600}
                      height="32px"
                    >
                      Connect with {provider.name}
                    </Text>
                  </a>
                </div>
              );
            })}
          </div>
          <hr className="border-divider-secondary" />
          <div className="flex flex-col items-start gap-2">
            <Text
              as="h3"
              overflow="truncate"
              font="reactist"
              size="14px"
              weight={700}
              height="17.6px"
              color="primary"
            >
              Delete account
            </Text>
            <Text
              as="p"
              font="reactist"
              size="12px"
              height="15.2px"
              color="primary"
            >
              This will immediately delete all of your data including tasks,
              projects, comments, and more. This can’t be undone.
            </Text>
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
              <Text
                overflow="truncate"
                font="reactist"
                size="13px"
                weight={600}
                height="32px"
              >
                Delete account
              </Text>
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
