import DownloadApps from "./download-apps";
import GettingStartedGuide from "./getting-started-guide";
import HelpCenter from "./help-center";
import Inspiration from "./inspiration";
import Integrations from "./integrations";
import KeyboardShortcuts from "./keyboard-shortcuts";
import ResourcesMenuButton from "./resources-menu-button";
import { ResourcesMenuProvider } from "./resources-menu-context";
import ResourcesMenuPanel from "./resources-menu-panel";

type MenuProps = {
  disabled?: boolean;
};

export default function ResourcesMenu({ disabled = false }: MenuProps) {
  return (
    <ResourcesMenuProvider disabled={disabled}>
      <ResourcesMenuButton />
      <ResourcesMenuPanel>
        <div role="group" className="p-1.5">
          <HelpCenter disabled />
          <Inspiration disabled />
          <Integrations />
          <KeyboardShortcuts disabled />
          <GettingStartedGuide disabled />
          <DownloadApps disabled />
        </div>
      </ResourcesMenuPanel>
    </ResourcesMenuProvider>
  );
}
