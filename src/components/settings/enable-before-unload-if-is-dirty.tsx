"use client";

import useBeforeUnload from "@/hooks/use-before-unload";
import { useFormState } from "react-hook-form";

export default function EnableBeforeUnloadIfIsDirty() {
  const { isDirty } = useFormState();

  useBeforeUnload(isDirty);

  return null;
}
