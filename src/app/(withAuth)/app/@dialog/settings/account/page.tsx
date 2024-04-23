import {
  NameInput,
  PhotoInput,
  ResetAfterSubmission,
  TwoFAInput,
  UpdateAccountForm,
} from "@/components/settings/account";
import {
  CancelButton,
  CloseSettingsDialogButton,
  Footer,
  Header,
  OpenNavMenuButton,
  SecondaryLink,
  ShowChildrenIfIsDirty,
  SubmitButton,
} from "@/components/settings/form";
import { NAV_MENU_ITEMS, OAUTH_PROVIDERS } from "@/constants/settings";
import { getUser } from "@/lib/data";
import clsx from "clsx";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Account",
};

export default async function Page() {
  const user = await getUser();

  const currentItem =
    NAV_MENU_ITEMS.find((item) => item.segment === "account") ??
    NAV_MENU_ITEMS[0];

  return (
    <>
      <ResetAfterSubmission />
      <UpdateAccountForm id={user.id}>
        <Header>
          <OpenNavMenuButton />
          <div className="flex min-w-0 flex-1 items-center gap-1">
            <h2 className="truncate font-bold">{currentItem.description}</h2>
          </div>
          <CloseSettingsDialogButton />
        </Header>
        <hr className="border-divider-primary" />
        <div className="flex flex-1 flex-col gap-6 overflow-y-auto overflow-x-hidden p-4 pb-6">
          <hr className="border-divider-secondary" />
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <h3 className="truncate font-bold">Plan</h3>
              <p className="truncate text-base/5 font-bold">Beginner</p>
            </div>
            <SecondaryLink href="/app/settings/subscription">
              Manage plan
            </SecondaryLink>
          </div>
          <hr className="border-divider-secondary" />
          <div className="flex flex-col gap-3">
            <PhotoInput disabled={true} name={user.name ?? ""} />
            <NameInput />
            <div className="flex flex-col items-start gap-2">
              <h3 className="truncate font-bold">Email</h3>
              <p>{user.email}</p>
              <SecondaryLink href="/app/settings/account/email">
                Change email
              </SecondaryLink>
            </div>
            <div className="flex flex-col items-start gap-2">
              <h3 className="truncate font-bold">Password</h3>
              <SecondaryLink href="/app/settings/account/password">
                Change password
              </SecondaryLink>
            </div>
            <div className="flex flex-col items-start gap-2">
              <h3 className="truncate font-bold">Two-factor authentication</h3>
              <TwoFAInput />
            </div>
          </div>
          <hr className="border-divider-secondary" />
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h3 className="truncate font-bold">Connected accounts</h3>
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
                      "transition-[border,box-shadow] duration-300 ease-[cubic-bezier(.25,.1,.25,1)]",
                      "focus-visible:border-transparent focus-visible:outline-none focus-visible:ring focus-visible:ring-outer focus-visible:ring-offset-1 focus-visible:ring-offset-inner",
                      "aria-disabled:cursor-not-allowed aria-disabled:bg-actionable-secondary-disabled-fill aria-disabled:text-actionable-secondary-disabled-tint",
                      "custom-active:scale-[.97] custom-active:transition-transform custom-active:duration-200 custom-active:ease-[cubic-bezier(.02,1.505,.745,1.235)]",
                      "custom-hocus:bg-actionable-secondary-hover-fill custom-hocus:text-actionable-secondary-hover-tint",
                    )}
                  >
                    <span className="-ml-1.5">
                      <Icon />
                    </span>
                    <span className="truncate text-[13px]/8 font-semibold">
                      Log in with {provider.name}
                    </span>
                  </a>
                </div>
              );
            })}
          </div>
          <hr className="border-divider-secondary" />
          <div className="flex flex-col items-start gap-2">
            <h3 className="truncate font-bold">Delete account</h3>
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
                "transition-[border,box-shadow] duration-300 ease-[cubic-bezier(.25,.1,.25,1)]",
                "focus-visible:border-transparent focus-visible:outline-none focus-visible:ring focus-visible:ring-outer focus-visible:ring-offset-1 focus-visible:ring-offset-inner",
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
        <ShowChildrenIfIsDirty>
          <Footer>
            <CancelButton />
            <SubmitButton>Update</SubmitButton>
          </Footer>
        </ShowChildrenIfIsDirty>
      </UpdateAccountForm>
    </>
  );
}
