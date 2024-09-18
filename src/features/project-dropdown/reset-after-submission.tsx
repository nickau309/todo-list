import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

export default function ResetAfterSubmission() {
  const {
    formState: { isSubmitted },
    reset,
  } = useFormContext();

  useEffect(() => {
    if (isSubmitted) {
      reset(undefined, { keepValues: true });
    }
  }, [isSubmitted, reset]);

  return null;
}
