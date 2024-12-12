import { useStore } from "@/contexts/store-context";
import { useWidth } from "@/contexts/width-context";

export default function useSetShowSidebar() {
  const setShowSidebarLg = useStore((state) => state.sidebar.setShowSidebarLg);
  const setShowSidebarSm = useStore((state) => state.sidebar.setShowSidebarSm);

  const width = useWidth();

  return width > 750 ? setShowSidebarLg : setShowSidebarSm;
}
