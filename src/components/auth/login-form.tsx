"use client";

import { authenticate } from "@/lib/actions";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import EmailInput from "./emain-input";
import PasswordInput from "./password-input";
import SubmitButton from "./submit-button";

export default function LoginForm() {
  const [shouldShowError, setShouldShowError] = useState(false);

  const [state, action] = useFormState(authenticate, undefined);

  useEffect(() => {
    setShouldShowError(true);
  }, [state]);

  const hideError = () => {
    setShouldShowError(false);
  };

  return (
    <form action={action} className="flex flex-col">
      <div aria-atomic="true" aria-live="polite">
        {shouldShowError && state?.message && (
          <p className="pb-4 text-xs/[15.2px] text-display-content-danger">
            {state.message}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-4">
        <EmailInput
          onChange={hideError}
          errors={shouldShowError ? state?.email : undefined}
        />
        <PasswordInput
          onChange={hideError}
          errors={shouldShowError ? state?.password : undefined}
        />
        <SubmitButton>Log in</SubmitButton>
      </div>
    </form>
  );
}
