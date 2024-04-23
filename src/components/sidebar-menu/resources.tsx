import { ChevronRightIcon24, ResourceIcon24 } from "@/assets";
import Menu from "@/components/menu";
import clsx from "clsx";
import DownloadApps from "./download-apps";
import GettingStartedGuide from "./getting-started-guide";
import HelpCenter from "./help-center";
import Inspiration from "./inspiration";
import Integrations from "./integrations";
import KeyboardShortcuts from "./keyboard-shortcuts";

export default function Resources() {
  const label = "Resources";

  return (
    <Menu>
      <Menu.Button
        label={label}
        className={clsx(
          "mx-1.5 flex min-h-8 items-center gap-2.5 rounded-[5px] px-1.5",
          "focus-visible:outline-none",
          "custom-hocus:bg-actionable-focus-fill",
        )}
      >
        <span className="grid size-6 place-items-center text-display-secondary-idle-tint">
          <ResourceIcon24 />
        </span>
        <div className="flex min-w-0 flex-1 items-center justify-between gap-2">
          <span className="truncate text-[13px]/[16.8px]">{label}</span>
          <span className="text-display-secondary-idle-tint">
            <ChevronRightIcon24 />
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
        <HelpCenter />
        <Inspiration />
        <Integrations />
        <KeyboardShortcuts />
        <GettingStartedGuide />
        <DownloadApps />
      </Menu.Items>
    </Menu>
  );
}
