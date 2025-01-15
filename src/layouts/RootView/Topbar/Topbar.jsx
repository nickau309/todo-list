import React from "react";
import { Link } from "react-router-dom";
import { CloseIcon24, HomeIcon24, MenuIcon24 } from "@/assets";
import { useShowSidebarSm, useSetShowSidebar } from "@/contexts";
import { classNames } from "@/utils";

export default function Topbar() {
  const showSidebarSm = useShowSidebarSm();
  const setShowSidebar = useSetShowSidebar();

  return (
    <div
      className={classNames(
        "flex h-full items-center justify-between border-b border-transparent bg-navbar-idle-fill px-3 text-navbar-idle-tint shadow-topbar",
        "min-[750px]:px-4",
      )}
    >
      <div className="flex gap-1 pl-[3px] min-[750px]:pl-[5px]">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setShowSidebar((show) => !show);
          }}
          className="flex aspect-square w-7 items-center justify-center rounded-[3px] hover:bg-navbar-hover-fill"
        >
          {showSidebarSm ? <CloseIcon24 /> : <MenuIcon24 />}
        </button>
        <Link
          to="/"
          aria-label="Go to Home view"
          className="flex aspect-square w-7 items-center justify-center rounded-[3px] hover:bg-navbar-hover-fill"
        >
          <HomeIcon24 />
        </Link>
      </div>
      <div className="flex items-center gap-3 pl-3 pr-2.5"></div>
    </div>
  );
}
