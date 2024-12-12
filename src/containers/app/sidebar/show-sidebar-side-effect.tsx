import { useStore } from "@/contexts/store-context";
import { useEffect } from "react";
import useShowSidebar from "./hooks/use-show-sidebar";

export default function ShowSidebarSideEffect() {
  const setIsSettingsMenuOpen = useStore(
    (state) => state.settingsMenu.setIsOpen,
  );
  const setIsResourcesMenuOpen = useStore(
    (state) => state.resourcesMenu.setIsOpen,
  );

  const showSidebar = useShowSidebar();

  useEffect(() => {
    if (!showSidebar) {
      setIsSettingsMenuOpen(false);
      setIsResourcesMenuOpen(false);
    }
  }, [setIsResourcesMenuOpen, setIsSettingsMenuOpen, showSidebar]);

  return null;
}
