"use client";

import { AlertIcon24 } from "@/assets";
import { useFormState } from "react-hook-form";

export default function ErrorMessage() {
  const { errors } = useFormState();

  return (
    <div role="alert" aria-atomic="true" aria-live="assertive">
      {errors.root?.message && (
        <div className="flex items-center gap-2">
          <span className="text-info-attention-primary-idle-fill">
            <AlertIcon24 />
          </span>
          <p className="py-1 font-sans text-sm/[18.4px]">
            {errors.root.message}
          </p>
        </div>
      )}
    </div>
  );
}
