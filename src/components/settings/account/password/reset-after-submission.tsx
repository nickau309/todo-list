"use client";

import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

export default function ResetAfterSubmission() {
  const {
    formState: { isSubmitted },
    reset,
    getValues,
  } = useFormContext();

  useEffect(() => {
    if (isSubmitted) {
      reset(
        {
          ...getValues(),
          "confirm-password": "",
          "new-password": "",
          password: "",
        },
        { keepErrors: true },
      );
    }
  }, [getValues, isSubmitted, reset]);

  return null;
}
