import { SidebarIcon24 } from "@/assets";
import {
  useShowSidebarLg,
  useShowSidebarSm,
  useSidebarDispatch,
} from "@/contexts/sidebar-context";
import { useWidth } from "@/contexts/width-context";
import clsx from "clsx";

export default function SidebarToggle() {
  const showSidebarLg = useShowSidebarLg();
  const showSidebarSm = useShowSidebarSm();
  const { setShowSidebarLg, setShowSidebarSm } = useSidebarDispatch();
  const width = useWidth();

  const showSidebar = width > 750 ? showSidebarLg : showSidebarSm;
  const setShowSidebar = width > 750 ? setShowSidebarLg : setShowSidebarSm;

  return (
    <button
      type="button"
      aria-disabled="false"
      aria-label="Open/close sidebar"
      onClick={() => {
        setShowSidebar((showSidebar) => !showSidebar);
      }}
      className={clsx(
        "absolute right-3 z-10",
        "grid size-8 shrink-0 place-items-center rounded-[5px] border border-transparent",
        "text-actionable-quaternary-idle-tint",
        "transition-[color,background-color,margin-right] duration-300",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-display-primary-idle-tint",
        "custom-active:scale-[.97] custom-active:transition-transform custom-active:duration-200 custom-active:ease-[cubic-bezier(.02,1.505,.745,1.235)]",
        "custom-hocus:bg-selectable-secondary-hover-fill custom-hocus:text-actionable-quaternary-hover-tint",
      )}
      style={{
        marginRight: showSidebar ? 0 : -60,
      }}
    >
      <SidebarIcon24 />
    </button>
  );
}
