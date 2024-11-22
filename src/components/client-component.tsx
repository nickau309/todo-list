"use client";

import useHasMounted from "@/hooks/use-has-mounted";
import type { ReactNode } from "react";

type ClientComponentProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

export default function ClientComponent({
  children,
  fallback,
}: ClientComponentProps) {
  const hasMounted = useHasMounted();

  return hasMounted ? children : fallback;
}
