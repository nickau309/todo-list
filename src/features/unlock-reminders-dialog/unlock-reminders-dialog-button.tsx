import type { ComponentPropsWithoutRef } from "react";
import { useUnlockRemindersDialog } from "./unlock-reminders-dialog";

type ButtonProps = ComponentPropsWithoutRef<"button">;

export default function UnlockRemindersDialogButton(props: ButtonProps) {
  const { disabled, refs, getReferenceProps } = useUnlockRemindersDialog(
    "UnlockRemindersDialogButton",
  );

  return (
    <button
      ref={refs.setReference}
      aria-disabled={disabled}
      {...getReferenceProps(props)}
    />
  );
}
