"use client";

import { useOptimisticUser } from "@/contexts/optimistic-user-context";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

export default function ResetAfterSubmission() {
  const { name } = useOptimisticUser();

  const {
    formState: { isSubmitted },
    reset,
    getValues,
  } = useFormContext();

  useEffect(() => {
    if (isSubmitted) {
      reset({ ...getValues(), name: name ?? "" });
    }
  }, [getValues, isSubmitted, name, reset]);

  return null;
}
