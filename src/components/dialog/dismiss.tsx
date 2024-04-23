"use client";

import type { ComponentPropsWithoutRef } from "react";
import { useDialogContext } from "./dialog";

type DismissProps = ComponentPropsWithoutRef<"button">;

export default function Dismiss({ onClick, ...props }: DismissProps) {
  const { onOpenChange } = useDialogContext("Dialog.Dismiss");

  return (
    <button
      onClick={(e) => {
        onOpenChange(false);
        onClick?.(e);
      }}
      {...props}
    />
  );
}
