"use client";

import { Composite } from "@floating-ui/react";
import type { ReactNode } from "react";

type ItemsProps = {
  children: ReactNode;
};

export default function Items({ children }: ItemsProps) {
  return (
    <Composite
      render={
        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto overflow-x-hidden p-3" />
      }
      orientation="vertical"
    >
      {children}
    </Composite>
  );
}
