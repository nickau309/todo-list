import {
  useShowSidebarLg,
  useShowSidebarSm,
  useSidebarDispatch,
} from "@/contexts/sidebar-context";
import { useSidebarWidth } from "@/contexts/sidebar-width-context";
import { useWidth } from "@/contexts/width-context";
import clsx from "clsx";
import type { ReactNode } from "react";
import { useEffect } from "react";

type SidebarWrapperProps = {
  children: ReactNode;
};

export default function SidebarWrapper({ children }: SidebarWrapperProps) {
  const showSidebarLg = useShowSidebarLg();
  const showSidebarSm = useShowSidebarSm();
  const sidebarWidth = useSidebarWidth();
  const { setShowSidebarSm, setShowSidebarLg } = useSidebarDispatch();
  const width = useWidth();

  useEffect(() => {
    if (width > 750) {
      setShowSidebarSm(false);
    } else {
      setShowSidebarLg(true);
    }
  }, [setShowSidebarLg, setShowSidebarSm, width]);

  if (width > 750) {
    return (
      <div
        key="lg"
        className={clsx(
          "relative flex h-full flex-col bg-background-base-secondary",
          "transition-[margin-left] duration-300",
        )}
        style={{
          width: sidebarWidth,
          marginLeft: showSidebarLg ? 0 : -sidebarWidth,
        }}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      key="sm"
      className="flex h-full flex-col transition-[margin-left] duration-300"
      style={{
        width: sidebarWidth,
        marginLeft: -sidebarWidth,
      }}
    >
      <div
        onClick={() => {
          setShowSidebarSm(false);
        }}
        className={clsx(
          "fixed inset-0 bg-black/40",
          showSidebarSm ? "opacity-100" : "pointer-events-none opacity-0",
          "transition-opacity duration-300",
        )}
      />
      <div
        className={clsx(
          "relative",
          showSidebarSm && "z-10",
          "min-h-0 flex-1 bg-background-base-secondary",
          "transition-transform duration-300",
        )}
        style={{
          transform: `translateX(${showSidebarSm ? sidebarWidth : 0}px)`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
