"use client";

import useTheme from "@/hooks/use-theme";
import clsx from "clsx";
import type { ReactNode } from "react";

type ThemeWrapperProps = {
  children: ReactNode;
};

export default function ThemeWrapper({ children }: ThemeWrapperProps) {
  const { className } = useTheme();

  return (
    <div id="root" className={clsx(className, "font-reactist")}>
      {children}
    </div>
  );
}
