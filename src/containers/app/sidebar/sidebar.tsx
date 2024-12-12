"use client";

import { SidebarProvider } from "./contexts/sidebar-context";
import Notifications from "./notifications";
import Overlay from "./overlay";
import Panel from "./panel";
import Placeholder from "./placeholder";
import Resizer from "./resizer";
import SettingsMenu from "./settings-menu";
import ShowSidebarSideEffect from "./show-sidebar-side-effect";
import Toggle from "./toggle";
import WidthSideEffect from "./width-side-effect";

export default function Sidebar() {
  return (
    <SidebarProvider>
      {/* Side Effect */}
      <ShowSidebarSideEffect />
      <WidthSideEffect />
      {/* Component */}
      <Placeholder />
      <Overlay />
      <Panel>
        <div className="flex h-full w-full flex-col">
          <div className="flex items-center justify-between p-3">
            <div className="ml-[-3px] max-w-[calc(85%-40px)]">
              <SettingsMenu />
            </div>
            <div className="relative flex pr-10">
              <Notifications />
              <Toggle />
            </div>
          </div>
          <div>bla</div>
        </div>
        <Resizer />
      </Panel>
    </SidebarProvider>
  );
}
