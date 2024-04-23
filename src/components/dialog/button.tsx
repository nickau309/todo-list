"use client";

import type { ComponentPropsWithoutRef } from "react";
import { useDialogContext } from "./dialog";

type ButtonProps = ComponentPropsWithoutRef<"button">;

export default function Button(props: ButtonProps) {
  const { refs, getReferenceProps } = useDialogContext("Dialog.Button");

  return <button ref={refs.setReference} {...getReferenceProps(props)} />;
}
