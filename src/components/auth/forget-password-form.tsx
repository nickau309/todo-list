"use client";

import { forgetPassword } from "@/lib/actions";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import EmailInput from "./emain-input";
import SubmitButton from "./submit-button";

export default function ForgetPasswordForm() {
  const [shouldShowError, setShouldShowError] = useState(false);

  const [state, action] = useFormState(forgetPassword, { success: false });

  useEffect(() => {
    setShouldShowError(true);
  }, [state]);

  const hideError = () => {
    setShouldShowError(false);
  };

  if (state.success) {
    return (
      <div className="text-[13px]/[16.8px]">
        In the actual Todoist App, an email containing a password reset link
        will be sent. As this is just a clone, your password will be reset to
        12345678.
      </div>
    );
  }

  return (
    <>
      <div className="text-[13px]/[16.8px]">
        DO NOT enter the email address of your actual Todoist account.
      </div>
      <form action={action} className="flex flex-col">
        <div aria-atomic="true" aria-live="polite">
          {shouldShowError && state.message && (
            <p className="pb-4 text-xs/[15.2px] text-display-content-danger">
              {state.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <EmailInput
            onChange={hideError}
            errors={shouldShowError ? state.email : undefined}
          />
          <SubmitButton>Reset my password</SubmitButton>
        </div>
      </form>
    </>
  );
}
