import { ProIcon24 } from "@/assets";
import Menu from "@/components/menu";
import { useSetIsOpen } from "@/contexts/upgrade-to-pro-dialog-context";
import clsx from "clsx";

export default function UpgradeToPro() {
  const setIsOpen = useSetIsOpen();

  const openDialog = () => {
    setIsOpen(true);
  };

  const label = "Upgrade to Pro";

  return (
    <Menu.Item
      aria-haspopup="dialog"
      label={label}
      onClick={openDialog}
      className={clsx(
        "mx-1.5 flex min-h-8 items-center gap-2.5 rounded-[5px] px-1.5",
        "focus-visible:outline-none",
        "custom-hocus:bg-actionable-focus-fill",
      )}
    >
      <span className="grid size-6 place-items-center text-display-secondary-idle-tint">
        <ProIcon24 className="fill-[#FEBA07] stroke-[#ED9D04] [fill-opacity:.1]" />
      </span>
      <div className="flex min-w-0 flex-1 items-center justify-between gap-2">
        <span className="truncate text-[13px]/[16.8px]">{label}</span>
      </div>
    </Menu.Item>
  );
}
