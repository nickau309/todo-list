import { ArrowLeftIcon24 } from "@/assets";
import {
  DeleteAccountForm,
  ErrorMessage,
  PasswordInput,
  ReasonInput,
  ResetAfterSubmission,
} from "@/components/settings/account/delete";
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
  title: "Delete account",
};

export default async function Page() {
  const user = await getUser();

  return (
    <>
      <ResetAfterSubmission />
      <DeleteAccountForm id={user.id}>
        <Header>
          <QuaternaryLink href="/app/settings" aria-label="Go back">
            <ArrowLeftIcon24 />
          </QuaternaryLink>
          <div className="flex min-w-0 flex-1 items-center gap-1">
            <h2 className="truncate font-bold">Delete account</h2>
          </div>
          <CloseSettingsDialogButton />
        </Header>
        <hr className="border-divider-primary" />
        <div className="flex flex-1 overflow-y-auto overflow-x-hidden p-4 pb-6">
          <div className="flex w-full max-w-[660px] flex-col gap-6">
            <p>
              We&apos;ll be sorry to see you go, but thanks for trying Todoist!
            </p>
            <p>
              Deleting your account is permanent.{" "}
              <strong>All your data will be wiped out immediately</strong> and
              you won&apos;t be able to get it back.
            </p>
            <ReasonInput />
            <PasswordInput />
            <ErrorMessage />
          </div>
        </div>
        <Footer>
          <SecondaryLink href="/app/settings">Cancel</SecondaryLink>
          <SubmitButton>Delete account</SubmitButton>
        </Footer>
      </DeleteAccountForm>
    </>
  );
}
