"use client";

import { useEffect } from "react";
import { useTaskInfoFormContext } from "../contexts/task-info-form-context";

export default function ResetAfterSubmission() {
  const {
    formState: { isSubmitSuccessful },
    reset,
    getValues,
  } = useTaskInfoFormContext();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(getValues());
    }
  }, [getValues, isSubmitSuccessful, reset]);

  return null;
}
