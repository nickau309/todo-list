import { useSetSidebarWidth } from "@/contexts/sidebar-width-context";
import clsx from "clsx";
import { useState } from "react";

export default function SidebarResizer() {
  const setSidebarWidth = useSetSidebarWidth();

  const [isDragging, setIsDragging] = useState(false);

  return (
    <>
      <div
        onMouseDown={() => {
          setIsDragging(true);
        }}
        className={clsx(
          "absolute right-0 top-0 h-full w-1 cursor-col-resize",
          "hover:bg-divider-primary active:bg-divider-primary",
        )}
      />
      {isDragging && (
        <div
          onMouseMove={(e) => {
            setSidebarWidth(Math.min(Math.max(e.pageX, 210), 420));
          }}
          onMouseUp={() => {
            setIsDragging(false);
          }}
          className="fixed inset-0 z-[9999] cursor-col-resize"
        />
      )}
    </>
  );
}
