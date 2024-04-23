"use client";

import { useWidth } from "@/contexts/width-context";
import clsx from "clsx";
import type { ReactNode } from "react";

type HeaderProps = {
  children: ReactNode;
};

export default function Header({ children }: HeaderProps) {
  const width = useWidth();

  return (
    <header
      className={clsx(
        "flex items-center justify-between gap-1.5 p-2",
        width > 660 && "pl-4",
      )}
    >
      {children}
    </header>
  );
}
