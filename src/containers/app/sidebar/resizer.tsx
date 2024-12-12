import { MAX_SIDEBAR_WIDTH, MIN_SIDEBAR_WIDTH } from "@/constants/sidebar";
import clsx from "clsx";
import type { MouseEvent } from "react";
import { useState } from "react";
import { useSidebarControl } from "./contexts/sidebar-context";

export default function Resizer() {
  const { setSidebarWidth } = useSidebarControl();

  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    setSidebarWidth(
      Math.min(Math.max(e.pageX, MIN_SIDEBAR_WIDTH), MAX_SIDEBAR_WIDTH),
    );
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <>
      <div
        onMouseDown={handleMouseDown}
        className={clsx(
          "absolute right-0 top-0 h-full w-1 cursor-col-resize",
          "hover:bg-divider-primary active:bg-divider-primary",
        )}
      />
      {isDragging && (
        <div
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          className="fixed inset-0 z-[9999] cursor-col-resize"
        />
      )}
    </>
  );
}
