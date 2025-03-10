"use client";

import { deleteAccount } from "@/actions/settings";
import { AlertIcon24 } from "@/assets";
import Text from "@/components/ui/text";
import { useSettingsDialogControl } from "@/contexts/settings-dialog-context";
import type { FormEvent } from "react";
import { useState } from "react";
import CancelLink from "../components/cancel-link";
import CloseSettingsDialogButton from "../components/close-settings-dialog-button";
import GoBackLink from "../components/go-back-link";
import OpenNavMenuButton from "../components/open-nav-menu-button";
import EmailInput from "./email-input";
import PasswordInput from "./password-input";
import ReasonInput from "./reason-input";
import SubmitButton from "./submit-button";

type PageProps = {
  id: number;
};

export default function DeletePage({ id }: PageProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { setInputValues } = useSettingsDialogControl();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const state = await deleteAccount(id, formData);
    setIsSubmitting(false);
    if (state !== undefined) {
      setErrorMessage(state.message);
    } else {
      setInputValues((inputValues) => ({
        ...inputValues,
        email: "",
        password: "",
        reason: "",
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
              Delete account
            </Text>
          </div>
        </div>
        <CloseSettingsDialogButton />
      </header>
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden p-4 pb-8">
        <div className="flex w-full max-w-[660px] flex-col gap-6">
          <Text
            as="p"
            font="reactist"
            size="14px"
            height="17.6px"
            color="primary"
          >
            We&apos;ll be sorry to see you go, but thanks for trying Todoist!
          </Text>
          <Text
            as="p"
            font="reactist"
            size="14px"
            height="17.6px"
            color="primary"
          >
            Deleting your account is permanent.{" "}
            <strong>All your data will be wiped out immediately</strong> and you
            won&apos;t be able to get it back.
          </Text>
          <ReasonInput />
          <EmailInput setErrorMessage={setErrorMessage} />
          <PasswordInput setErrorMessage={setErrorMessage} />
          <div role="alert" aria-atomic="true" aria-live="assertive">
            {errorMessage && (
              <div className="flex items-center gap-2">
                <span className="text-info-attention-primary-idle-fill">
                  <AlertIcon24 />
                </span>
                <div className="py-1">
                  <Text
                    as="p"
                    font="sans"
                    size="14px"
                    height="18.4px"
                    color="primary"
                  >
                    {errorMessage}
                  </Text>
                </div>
              </div>
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
