import { CloseIcon24 } from "@/assets";
import { useSettingsDialogControl } from "@/contexts/settings-dialog-context";
import clsx from "clsx";

export default function CloseSettingsDialogButton() {
  const { setIsOpen } = useSettingsDialogControl();

  const handleClick = () => {
    setIsOpen(false);
  };

  return (
    <button
      type="button"
      aria-disabled="false"
      aria-label="Close settings"
      onClick={handleClick}
      className={clsx(
        "grid size-8 shrink-0 place-items-center rounded-[5px] border border-transparent",
        "text-actionable-quaternary-idle-tint",
        "transition-colors duration-300",
        "aria-disabled:cursor-not-allowed aria-disabled:text-actionable-quaternary-disabled-tint",
        "custom-active:scale-[.97] custom-active:transition-transform custom-active:duration-200 custom-active:ease-[cubic-bezier(.02,1.505,.745,1.235)]",
        "custom-hocus:bg-actionable-quaternary-hover-fill custom-hocus:text-actionable-quaternary-hover-tint",
      )}
    >
      <CloseIcon24 />
    </button>
  );
}
