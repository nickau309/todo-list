import ActivityLog from "./activity-log";
import AddTeam from "./add-team";
import Changelog from "./changelog";
import LogOut from "./log-out";
import Print from "./print";
import Productivity from "./productivity";
import ResourcesMenu from "./resources-menu";
import Settings from "./settings";
import SettingsMenuButton from "./settings-menu-button";
import { SettingsMenuProvider } from "./settings-menu-context";
import SettingsMenuPanel from "./settings-menu-panel";
import Sync from "./sync";
import UpgradeToPro from "./upgrade-to-pro";
import Version from "./version";
import WhatsNew from "./whats-new";

export default function SettingsMenu() {
  return (
    <SettingsMenuProvider>
      <SettingsMenuButton />
      <SettingsMenuPanel>
        <div role="group" className="p-1.5">
          <Productivity disabled />
        </div>
        <hr className="h-px border-0 bg-divider-primary" />
        <div role="group" className="p-1.5">
          <Settings />
          <AddTeam disabled />
        </div>
        <hr className="h-px border-0 bg-divider-primary" />
        <div role="group" className="p-1.5">
          <ActivityLog disabled />
          <Print disabled />
          <ResourcesMenu />
        </div>
        <hr className="h-px border-0 bg-divider-primary" />
        <div role="group" className="p-1.5">
          <WhatsNew disabled />
        </div>
        <hr className="h-px border-0 bg-divider-primary" />
        <div role="group" className="p-1.5">
          <UpgradeToPro disabled />
        </div>
        <hr className="h-px border-0 bg-divider-primary" />
        <div role="group" className="p-1.5">
          <Sync disabled />
        </div>
        <hr className="h-px border-0 bg-divider-primary" />
        <div role="group" className="p-1.5">
          <LogOut />
        </div>
        <hr className="h-px border-0 bg-divider-primary" />
        <div
          aria-label="Todoist version info"
          role="group"
          className="flex items-center p-1.5"
        >
          <Version disabled />
          <span className="truncate text-[13px]/[16.8px]">.</span>
          <Changelog disabled />
        </div>
      </SettingsMenuPanel>
    </SettingsMenuProvider>
  );
}
