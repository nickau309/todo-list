"use client";

import { useOptimisticUser } from "@/contexts/optimistic-user-context";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

export default function ResetAfterSubmission() {
  const { theme } = useOptimisticUser();

  const {
    formState: { isSubmitted },
    reset,
    getValues,
  } = useFormContext();

  useEffect(() => {
    if (isSubmitted) {
      reset({ ...getValues(), theme });
    }
  }, [getValues, isSubmitted, reset, theme]);

  return null;
}
