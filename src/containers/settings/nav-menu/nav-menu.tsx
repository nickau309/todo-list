import { NAV_MENU_ITEMS } from "@/constants/settings";
import { Composite } from "@floating-ui/react";
import { SettingsDialogLabel } from "../settings-dialog";
import AddTeamButton from "./add-team-button";
import CloseNavMenuButton from "./close-nav-menu-button";
import Item from "./item";
import Wrapper from "./wrapper";

export default function NavMenu() {
  return (
    <Wrapper>
      <div className="flex flex-col gap-2 p-3 pt-2">
        <header className="flex shrink-0 basis-8 items-center justify-between pl-1 pr-2">
          <SettingsDialogLabel className="truncate text-base/[23px] font-semibold">
            Settings
          </SettingsDialogLabel>
          <CloseNavMenuButton />
        </header>
        <div className="h-8"></div>
      </div>
      <Composite
        render={
          <nav className="flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden p-3 pt-0" />
        }
        orientation="vertical"
      >
        {NAV_MENU_ITEMS.map((item) => (
          <Item key={item.segment} {...item} />
        ))}
      </Composite>
      <hr className="border-divider-primary" />
      <div className="flex flex-col p-3">
        <AddTeamButton />
      </div>
    </Wrapper>
  );
}
