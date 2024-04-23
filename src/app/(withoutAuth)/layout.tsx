import type { Metadata } from "next";
import type { ReactNode } from "react";
import "../globals.css";
import Scroll from "../scroll";

export const metadata: Metadata = {
  title: "To-do List",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <Scroll />
      <body>{children}</body>
    </html>
  );
}
