import { ArrowLeftIcon24 } from "@/assets";
import {
  ConfirmEmailInput,
  ErrorMessage,
  NewEmailInput,
  PasswordInput,
  ResetAfterSubmission,
  UpdateEmailForm,
} from "@/components/settings/account/email";
import {
  CloseSettingsDialogButton,
  Footer,
  Header,
  QuaternaryLink,
  SecondaryLink,
  SubmitButton,
} from "@/components/settings/form";
import { getUser } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Change email address",
};

export default async function Page() {
  const user = await getUser();

  return (
    <>
      <ResetAfterSubmission />
      <UpdateEmailForm id={user.id}>
        <Header>
          <QuaternaryLink href="/app/settings" aria-label="Go back">
            <ArrowLeftIcon24 />
          </QuaternaryLink>
          <div className="flex min-w-0 flex-1 items-center gap-1">
            <h2 className="truncate font-bold">Change email address</h2>
          </div>
          <CloseSettingsDialogButton />
        </Header>
        <hr className="border-divider-primary" />
        <div className="flex flex-1 flex-col gap-6 overflow-y-auto overflow-x-hidden p-4 pb-6">
          <p>
            Update the email you use for your Todoist account. Your email is
            currently <strong>{user.email}</strong>.
          </p>
          <NewEmailInput />
          <ConfirmEmailInput />
          <PasswordInput />
          <ErrorMessage />
        </div>
        <Footer>
          <SecondaryLink href="/app/settings">Cancel</SecondaryLink>
          <SubmitButton>Change email</SubmitButton>
        </Footer>
      </UpdateEmailForm>
    </>
  );
}
