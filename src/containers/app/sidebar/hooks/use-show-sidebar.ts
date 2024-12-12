import { useStore } from "@/contexts/store-context";
import { useWidth } from "@/contexts/width-context";

export default function useShowSidebar() {
  const showSidebarLg = useStore((state) => state.sidebar.showSidebarLg);
  const showSidebarSm = useStore((state) => state.sidebar.showSidebarSm);

  const width = useWidth();

  return width > 750 ? showSidebarLg : showSidebarSm;
}
