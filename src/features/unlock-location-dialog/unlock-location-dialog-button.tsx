import type { ComponentPropsWithoutRef } from "react";
import { useUnlockLocationDialog } from "./unlock-location-dialog";

type ButtonProps = ComponentPropsWithoutRef<"button">;

export default function UnlockLocationDialogButton(props: ButtonProps) {
  const { disabled, refs, getReferenceProps } = useUnlockLocationDialog(
    "UnlockLocationDialogButton",
  );

  return (
    <button
      ref={refs.setReference}
      aria-disabled={disabled}
      {...getReferenceProps(props)}
    />
  );
}
