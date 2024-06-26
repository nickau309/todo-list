import { TodoistFullLogo, TodoistSquareLogo32 } from "@/assets";
import clsx from "clsx";
import Link from "next/link";
import type { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div id="root" className="theme_todoist font-reactist">
      <div className="flex h-dvh justify-center p-6">
        <div
          className={clsx(
            "flex w-full max-w-[400px] flex-col gap-7 text-display-primary-idle-tint",
            "md:gap-24",
            "min-[992px]:max-w-[940px]",
          )}
        >
          <div className="flex">
            <Link href="/" aria-label="Todoist Homepage">
              <div className="h-[35.2px] max-md:hidden">
                <TodoistFullLogo />
              </div>
              <div className="h-[35.2px] md:hidden">
                <TodoistSquareLogo32 />
              </div>
            </Link>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
