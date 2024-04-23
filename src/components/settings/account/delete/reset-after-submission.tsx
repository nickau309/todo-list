"use client";

import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

export default function ResetAfterSubmission() {
  const {
    formState: { isSubmitSuccessful, isSubmitted },
    reset,
    getValues,
  } = useFormContext();

  useEffect(() => {
    if (isSubmitted) {
      if (isSubmitSuccessful) {
        reset({ ...getValues(), password: "", reason: "" });
      } else {
        reset({ ...getValues(), password: "" }, { keepErrors: true });
      }
    }
  }, [getValues, isSubmitSuccessful, isSubmitted, reset]);

  return null;
}
