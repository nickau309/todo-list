import { ProductivityIcon24 } from "@/assets";
import Menu from "@/components/menu";
import { useSetIsOpen } from "@/contexts/productivity-dialog-context";
import clsx from "clsx";

type ProductivityProps = {
  name: string;
};

export default function Productivity({ name }: ProductivityProps) {
  const setIsOpen = useSetIsOpen();

  const openDialog = () => {
    setIsOpen(true);
  };

  return (
    <Menu.Item
      type="button"
      aria-haspopup="dialog"
      label={name}
      onClick={openDialog}
      className={clsx(
        "mx-1.5 flex min-h-8 items-center gap-2.5 rounded-[5px] px-1.5",
        "focus-visible:outline-none",
        "custom-hocus:bg-actionable-focus-fill",
      )}
    >
      <span className="grid size-6 place-items-center text-display-secondary-idle-tint">
        <ProductivityIcon24 />
      </span>
      <div className="flex min-w-0 flex-1 items-center justify-between gap-2">
        <div className="flex min-w-0 flex-col gap-1 py-1 text-left">
          <div className="truncate text-sm/[17.6px] font-bold">{name}</div>
          <div className="text-xs/[15.2px] text-display-secondary-idle-tint">
            0/5 tasks
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs text-display-secondary-idle-tint">
          <kbd className="font-sans text-xs">O</kbd>
          <span className="text-xs/[15.2px]">then</span>
          <kbd className="font-sans text-xs">P</kbd>
        </div>
      </div>
    </Menu.Item>
  );
}
