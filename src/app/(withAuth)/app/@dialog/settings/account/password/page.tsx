import { ArrowLeftIcon24 } from "@/assets";
import {
  ConfirmPasswordInput,
  ErrorMessage,
  NewPasswordInput,
  PasswordInput,
  ResetAfterSubmission,
  UpdatePasswordForm,
} from "@/components/settings/account/password";
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
  title: "Change password",
};

export default async function Page() {
  const user = await getUser();

  return (
    <>
      <ResetAfterSubmission />
      <UpdatePasswordForm id={user.id}>
        <Header>
          <QuaternaryLink href="/app/settings" aria-label="Go back">
            <ArrowLeftIcon24 />
          </QuaternaryLink>
          <div className="flex min-w-0 flex-1 items-center gap-1">
            <h2 className="truncate font-bold">Change password</h2>
          </div>
          <CloseSettingsDialogButton />
        </Header>
        <hr className="border-divider-primary" />
        <div className="flex flex-1 flex-col gap-6 overflow-y-auto overflow-x-hidden p-4 pb-6">
          <PasswordInput />
          <NewPasswordInput />
          <ConfirmPasswordInput />
          <ErrorMessage />
        </div>
        <Footer>
          <SecondaryLink href="/app/settings">Cancel</SecondaryLink>
          <SubmitButton>Change password</SubmitButton>
        </Footer>
      </UpdatePasswordForm>
    </>
  );
}
