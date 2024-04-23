import { ChevronDownSmIcon24 } from "@/assets";
import Menu from "@/components/menu";
import clsx from "clsx";
import Image from "next/image";
import ActivityLog from "./activity-log";
import AddTeam from "./add-team";
import LogOut from "./log-out";
import Print from "./print";
import Productivity from "./productivity";
import Resources from "./resources";
import Settings from "./settings";
import Sync from "./sync";
import UpgradeToPro from "./upgrade-to-pro";
import Version from "./version";
import WhatsNew from "./whats-new";

type SettingsMenuProps = {
  name: string;
};

export default function SidebarMenu({ name }: SettingsMenuProps) {
  const initLetter = name.at(0)?.toUpperCase() ?? "";

  return (
    <Menu>
      <Menu.Button
        type="button"
        aria-disabled="false"
        aria-label="Settings"
        className={clsx(
          "flex h-8 w-full select-none items-center gap-2.5 rounded-[5px] border border-transparent pl-1.5",
          "text-actionable-quaternary-idle-tint",
          "transition-colors duration-300",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-display-primary-idle-tint",
          "custom-active:scale-[.97] custom-active:transition-transform custom-active:duration-200 custom-active:ease-[cubic-bezier(.02,1.505,.745,1.235)]",
          "custom-hocus:bg-selectable-secondary-hover-fill custom-hocus:text-actionable-quaternary-hover-tint",
        )}
      >
        <span className="size-[26px] overflow-hidden rounded-full">
          <Image
            src={`https://d1nbslm0j6pual.cloudfront.net?text=${initLetter}&size=195&bg=ffffff`}
            alt={name}
            width="26"
            height="26"
          />
        </span>
        <div className="flex min-w-0 flex-1 items-center">
          <span className="truncate text-sm/8 font-semibold text-display-primary-idle-tint">
            {name}
          </span>
          <span>
            <ChevronDownSmIcon24 />
          </span>
        </div>
      </Menu.Button>
      <Menu.Items
        className={clsx(
          "z-20 box-content flex min-w-[280px] max-w-[300px] flex-col rounded-[10px] border border-divider-primary",
          "bg-background-raised-primary py-1.5 text-display-primary-idle-tint shadow-[0_0_8px_rgba(0,0,0,.12)]",
          "focus-visible:outline-none",
        )}
      >
        <Productivity name={name} />
        <hr className="my-1.5 h-px border-0 bg-divider-primary" />
        <Settings />
        <AddTeam />
        <hr className="my-1.5 h-px border-0 bg-divider-primary" />
        <ActivityLog />
        <Print />
        <Resources />
        <hr className="my-1.5 h-px border-0 bg-divider-primary" />
        <UpgradeToPro />
        <hr className="my-1.5 h-px border-0 bg-divider-primary" />
        <Sync />
        <hr className="my-1.5 h-px border-0 bg-divider-primary" />
        <LogOut />
        <hr className="my-1.5 h-px border-0 bg-divider-primary" />
        <div aria-label="Todoist version info" className="flex items-center">
          <Version />
          <span className="truncate text-[13px]/[16.8px]">.</span>
          <WhatsNew />
        </div>
      </Menu.Items>
    </Menu>
  );
}
