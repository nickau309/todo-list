import { ReminderIcon16 } from "@/assets";
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
      <div className="relative flex items-center">
        <UnlockRemindersDialogButton
          type="button"
          className={clsx(
            "flex h-7 items-center gap-1 rounded-[5px] border border-input-idle",
            "px-1.5",
            "text-actionable-quaternary-idle-tint",
            "transition-[border,box-shadow] duration-300 ease-[cubic-bezier(.25,.1,.25,1)]",
            "focus-visible:border-transparent focus-visible:outline-none focus-visible:ring focus-visible:ring-outer focus-visible:ring-offset-1 focus-visible:ring-offset-inner",
            "aria-disabled:cursor-not-allowed aria-disabled:text-actionable-quaternary-disabled-tint",
            "custom-hocus:bg-actionable-quaternary-hover-fill custom-hocus:text-actionable-quaternary-hover-tint",
          )}
        >
          <span>
            <ReminderIcon16 />
          </span>
          <Text
            overflow="truncate"
            font="reactist"
            size="13px"
            height="16.8px"
            color="secondary"
          >
            Reminders
          </Text>
        </UnlockRemindersDialogButton>
      </div>
      <UnlockRemindersDialogPanel />
    </UnlockRemindersDialog>
  );
}
