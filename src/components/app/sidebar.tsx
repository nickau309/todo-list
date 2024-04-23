"use client";

import SidebarMenu from "@/components/sidebar-menu";
import SidebarNotifications from "./sidebar-notifications";
import SidebarResizer from "./sidebar-resizer";
import SidebarToggle from "./sidebar-toggle";
import SidebarWrapper from "./sidebar-wrapper";

type SidebarProps = {
  name: string;
};

export default function Sidebar({ name }: SidebarProps) {
  return (
    <SidebarWrapper>
      <div className="flex flex-col">
        <div className="flex items-center justify-between p-3">
          <div className="ml-[-3px] max-w-[calc(85%-40px)]">
            <SidebarMenu name={name} />
          </div>
          <div className="mr-10 flex">
            <SidebarNotifications />
            <SidebarToggle />
          </div>
        </div>
        <div>bla</div>
      </div>
      <SidebarResizer />
    </SidebarWrapper>
  );
}
