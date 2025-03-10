import { ReminderIcon24 } from "@/assets";
import Text from "@/components/ui/text";
import {
  UnlockRemindersDialog,
  UnlockRemindersDialogButton,
  UnlockRemindersDialogPanel,
} from "@/features/unlock-reminders-dialog";
import clsx from "clsx";

type RemindersProps = {
  disabled?: boolean;
};

export default function Reminders({ disabled = false }: RemindersProps) {
  return (
    <UnlockRemindersDialog disabled={disabled}>
      <div className="flex items-center px-3">
        <UnlockRemindersDialogButton
          type="button"
          className={clsx(
            "group",
            "flex h-10 min-w-[68px] flex-1 select-none items-center gap-3.5 rounded-[5px] pl-1.5 pr-3",
            "text-display-secondary-idle-tint",
            "transition-colors duration-300",
            "aria-disabled:cursor-not-allowed aria-disabled:text-actionable-quaternary-disabled-tint",
            "custom-hocus:bg-actionable-quaternary-hover-fill custom-hocus:text-actionable-quaternary-hover-tint",
          )}
        >
          <span>
            <ReminderIcon24 />
          </span>
          <Text overflow="truncate" font="reactist" size="14px" height="32px">
            Add reminders
          </Text>
        </UnlockRemindersDialogButton>
      </div>
      <UnlockRemindersDialogPanel />
    </UnlockRemindersDialog>
  );
}
