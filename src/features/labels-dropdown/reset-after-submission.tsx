import { useEffect } from "react";
import { useCreateLabelFormContext } from "./context/create-label-form-context";

export default function ResetAfterSubmission() {
  const {
    formState: { isSubmitSuccessful },
    reset,
  } = useCreateLabelFormContext();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(undefined, { keepValues: true });
    }
  }, [isSubmitSuccessful, reset]);

  return null;
}
