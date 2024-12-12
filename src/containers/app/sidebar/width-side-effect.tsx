import { useStore } from "@/contexts/store-context";
import { useWidth } from "@/contexts/width-context";
import { useEffect } from "react";

export default function WidthSideEffect() {
  const setShowSidebarLg = useStore((state) => state.sidebar.setShowSidebarLg);
  const setShowSidebarSm = useStore((state) => state.sidebar.setShowSidebarSm);

  const width = useWidth();

  useEffect(() => {
    if (width > 750) {
      setShowSidebarSm(false);
    } else {
      setShowSidebarLg(true);
    }
  }, [setShowSidebarLg, setShowSidebarSm, width]);

  return null;
}
