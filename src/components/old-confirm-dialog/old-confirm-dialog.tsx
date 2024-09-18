"use client";

import {
  useOldConfirmDialogControl,
  useOldConfirmDialogState,
} from "./old-confirm-dialog-context";
import ConfirmDialog from "../confirm-dialog";

export default function OldConfirmDialog() {
  const { isOpen, handleSubmit } = useOldConfirmDialogState("ConfirmDialog");
  const { setIsOpen } = useOldConfirmDialogControl("ConfirmDialog");

  return (
    <ConfirmDialog
      handleSubmit={handleSubmit ?? (() => {})}
      onOpenChange={setIsOpen}
      open={isOpen}
    />
  );
}
