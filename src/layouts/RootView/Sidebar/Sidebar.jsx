import React from "react";
import { classNames } from "@utils";
import FavoriteProjects from "./FavoriteProjects";
import FiltersLabels from "./FiltersLabels";
import Inbox from "./Inbox";
import OtherProjects from "./OtherProjects";
import Today from "./Today";
import Upcoming from "./Upcoming";

export default function Sidebar({ showSidebar }) {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          e.stopPropagation();
        }
      }}
      className={classNames(
        "group/sidebar flex h-full w-[305px] flex-col gap-4 overflow-y-auto overflow-x-hidden bg-aside px-[18px] pt-[18px]",
        showSidebar &&
          "max-[751px]:shadow-[0_2px_10px_rgba(0,0,0,.3)] min-[751px]:pt-[30px]"
      )}
    >
      <ul>
        <Inbox />
        <Today />
        <Upcoming />
        <FiltersLabels />
      </ul>
      <FavoriteProjects />
      <OtherProjects />
    </div>
  );
}
