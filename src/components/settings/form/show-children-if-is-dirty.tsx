"use client";

import type { ReactNode } from "react";
import { useFormState } from "react-hook-form";

type ShowChildrenIfIsDirtyProps = {
  children: ReactNode;
};

export default function ShowChildrenIfIsDirty({
  children,
}: ShowChildrenIfIsDirtyProps) {
  const { isDirty } = useFormState();

  return isDirty ? children : null;
}
