"use client";

import { useFormState } from "react-hook-form";

export default function ErrorMessage() {
  const { errors } = useFormState();

  return (
    <div role="alert" aria-atomic="true" aria-live="assertive">
      {errors.root?.message ? (
        <p className="text-display-content-danger">{errors.root.message}</p>
      ) : (
        <p className="text-display-secondary-idle-tint">
          Your password must be at least 8 characters long. Avoid common words
          or patterns.
        </p>
      )}
    </div>
  );
}
