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
        reset({
          ...getValues(),
          "confirm-email": "",
          "new-email": "",
          password: "",
        });
      } else {
        reset({ ...getValues(), password: "" }, { keepErrors: true });
      }
    }
  }, [getValues, isSubmitSuccessful, isSubmitted, reset]);

  return null;
}
