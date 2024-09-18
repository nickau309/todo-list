"use client";

import type { ComponentPropsWithoutRef } from "react";
import { useMoreActionMenu } from "./more-action-menu";

type ButtonProps = ComponentPropsWithoutRef<"button">;

export default function MoreActionMenuButton(props: ButtonProps) {
  const { disabled, refs, getReferenceProps } = useMoreActionMenu(
    "MoreActionMenuButton",
  );

  return (
    <button
      ref={refs.setReference}
      aria-disabled={disabled}
      {...getReferenceProps(props)}
    />
  );
}
