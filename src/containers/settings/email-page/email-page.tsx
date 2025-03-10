"use client";

import { updateEmail } from "@/actions/settings";
import Text from "@/components/ui/text";
import { useSettingsDialogControl } from "@/contexts/settings-dialog-context";
import type { FormEvent } from "react";
import { useState } from "react";
import CancelLink from "../components/cancel-link";
import CloseSettingsDialogButton from "../components/close-settings-dialog-button";
import GoBackLink from "../components/go-back-link";
import OpenNavMenuButton from "../components/open-nav-menu-button";
import ConfirmEmailInput from "./confirm-email-input";
import NewEmailInput from "./new-email-input";
import PasswordInput from "./password-input";
import SubmitButton from "./submit-button";

type PageProps = {
  email: string;
  id: number;
};

export default function EmailPage({ email, id }: PageProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { setInputValues } = useSettingsDialogControl();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const state = await updateEmail(id, formData);
    setIsSubmitting(false);
    if (state !== undefined) {
      setErrorMessage(state.message);
      setInputValues((inputValues) => ({
        ...inputValues,
        password: "",
      }));
    } else {
      setInputValues((inputValues) => ({
        ...inputValues,
        "confirm-email": "",
        "new-email": "",
        password: "",
      }));
    }
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
          <GoBackLink />
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
              Change email address
            </Text>
          </div>
        </div>
        <CloseSettingsDialogButton />
      </header>
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden p-4 pb-8">
        <div className="flex flex-col gap-6">
          <Text
            as="p"
            font="reactist"
            size="14px"
            height="17.6px"
            color="primary"
          >
            Update the email you use for your Todoist account. Your email is
            currently <strong>{email}</strong>.
          </Text>
          <NewEmailInput setErrorMessage={setErrorMessage} />
          <ConfirmEmailInput setErrorMessage={setErrorMessage} />
          <PasswordInput setErrorMessage={setErrorMessage} />
          <div role="alert" aria-atomic="true" aria-live="assertive">
            {errorMessage && (
              <Text
                as="p"
                font="reactist"
                size="14px"
                height="17.6px"
                color="text-display-content-danger"
              >
                {errorMessage}
              </Text>
            )}
          </div>
        </div>
      </div>
      <footer className="flex flex-wrap justify-end gap-2.5 p-3">
        <CancelLink />
        <SubmitButton isSubmitting={isSubmitting} />
      </footer>
    </form>
  );
}
