import { KeyboardIcon24 } from "@/assets";
import Menu from "@/components/menu";
import { useSetIsOpen } from "@/contexts/keyboard-shortcuts-dialog-context";
import clsx from "clsx";

export default function KeyboardShortcuts() {
  const setIsOpen = useSetIsOpen();

  const openDialog = () => {
    setIsOpen(true);
  };

  const label = "Keyboard shortcuts";

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
        <KeyboardIcon24 />
      </span>
      <div className="flex min-w-0 flex-1 items-center justify-between gap-2">
        <span className="truncate text-[13px]/[16.8px]">{label}</span>
        <div className="flex items-center gap-1 text-xs text-display-secondary-idle-tint">
          <kbd className="font-sans text-xs">?</kbd>
        </div>
      </div>
    </Menu.Item>
  );
}
