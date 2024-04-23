import { Title } from "@/components/dialog";
import { NAV_MENU_ITEMS } from "@/constants/settings";
import AddTeamButton from "./add-team-button";
import CloseNavMenuButton from "./close-nav-menu-button";
import Item from "./item";
import Items from "./items";
import Wrapper from "./wrapper";

export default function NavMenu() {
  return (
    <Wrapper>
      <header className="flex min-w-[220px] basis-12 items-center justify-between p-2 pl-3">
        <Title className="truncate text-base/5 font-bold">Settings</Title>
        <CloseNavMenuButton />
      </header>
      <div className="h-8"></div>
      <Items>
        {NAV_MENU_ITEMS.map((item) => (
          <Item key={item.segment} {...item} />
        ))}
      </Items>
      <hr className="border-divider-primary" />
      <div className="px-3 py-1">
        <AddTeamButton />
      </div>
    </Wrapper>
  );
}
