"use client";

import { type ReactNode, useEffect, useState } from "react";

type ClientComponentProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

export default function ClientComponent({
  children,
  fallback,
}: ClientComponentProps) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return hasMounted ? children : fallback;
}
