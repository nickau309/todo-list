import { CloseIcon24 } from "@/assets";
import Heading1 from "@/components/ui/heading1";
import Text from "@/components/ui/text";
import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
} from "@floating-ui/react";
import clsx from "clsx";
import type { FormEvent } from "react";
import { useId, useRef } from "react";
import { useUnlockLocationDialog } from "./unlock-location-dialog";

export default function UnlockRemindersDialogPanel() {
  const labelId = useId();
  const initialFocus = useRef<HTMLButtonElement>(null);

  const { setIsOpen, context, refs, getFloatingProps, isMounted, styles } =
    useUnlockLocationDialog("UnlockRemindersDialogPanel");

  if (!isMounted) {
    return null;
  }

  const closeDialog = () => {
    setIsOpen(false);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <FloatingPortal id="root">
      <FloatingOverlay lockScroll className="z-30 bg-black/50" style={styles}>
        <div className="flex h-full items-start justify-center px-8 py-[13vh]">
          <FloatingFocusManager context={context} initialFocus={initialFocus}>
            <div
              ref={refs.setFloating}
              aria-labelledby={labelId}
              className={clsx(
                "flex max-h-full w-full max-w-[450px] overflow-hidden rounded-[10px]",
                "bg-background-base-primary text-display-primary-idle-tint",
                "shadow-[0_2px_8px_rgba(0,0,0,.16)]",
              )}
              {...getFloatingProps()}
            >
              <form onSubmit={handleSubmit} className="flex flex-1 flex-col">
                <header className="flex items-center justify-between gap-4 p-2 pl-4">
                  <Heading1
                    id={labelId}
                    font="reactist"
                    size="20px"
                    weight={700}
                    height="24.8px"
                    color="primary"
                  >
                    Unlock location-based reminders
                  </Heading1>
                  <button
                    type="button"
                    aria-disabled="false"
                    aria-label="Cancel"
                    onClick={closeDialog}
                    className={clsx(
                      "grid size-8 shrink-0 place-items-center rounded-[5px] border border-transparent",
                      "text-actionable-quaternary-idle-tint",
                      "transition-colors duration-300",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-display-primary-idle-tint",
                      "aria-disabled:cursor-not-allowed aria-disabled:text-actionable-quaternary-disabled-tint",
                      "custom-active:scale-[.97] custom-active:transition-transform custom-active:duration-200 custom-active:ease-[cubic-bezier(.02,1.505,.745,1.235)]",
                      "custom-hocus:bg-actionable-quaternary-hover-fill custom-hocus:text-actionable-quaternary-hover-tint",
                    )}
                  >
                    <CloseIcon24 />
                  </button>
                </header>
                <div className="mx-4 overflow-hidden rounded-lg">
                  <video autoPlay loop width={418}>
                    <source
                      src="/videos/unlockLocationVideo.mp4"
                      type="video/mp4"
                    />
                  </video>
                </div>
                <div className="p-4">
                  <Text
                    as="p"
                    font="sans"
                    size="14px"
                    height={1.5}
                    color="primary"
                  >
                    Upgrade to add reminders for when you arrive or leave a
                    location. That way, you get notified when you need it most,
                    like &quot;buy broccoli&quot; when you reach the
                    supermarket.
                  </Text>
                </div>
                <footer className="flex justify-end gap-4 p-4">
                  <button
                    ref={initialFocus}
                    type="button"
                    aria-disabled="false"
                    onClick={closeDialog}
                    className={clsx(
                      "flex h-8 min-w-[68px] select-none items-center justify-center rounded-[5px] border border-transparent",
                      "bg-actionable-secondary-idle-fill px-3 text-actionable-secondary-idle-tint",
                      "transition-colors duration-300",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-display-primary-idle-tint",
                      "aria-disabled:cursor-not-allowed aria-disabled:bg-actionable-secondary-disabled-fill aria-disabled:text-actionable-secondary-disabled-tint",
                      "custom-active:scale-[.97] custom-active:transition-transform custom-active:duration-200 custom-active:ease-[cubic-bezier(.02,1.505,.745,1.235)]",
                      "custom-hocus:bg-actionable-secondary-hover-fill custom-hocus:text-actionable-secondary-hover-tint",
                    )}
                  >
                    <Text
                      overflow="truncate"
                      font="reactist"
                      size="13px"
                      weight={600}
                      height="32px"
                    >
                      Cancel
                    </Text>
                  </button>
                  <button
                    type="submit"
                    aria-disabled="true"
                    className={clsx(
                      "flex h-8 min-w-[68px] select-none items-center justify-center rounded-[5px] border border-transparent",
                      "bg-actionable-primary-idle-fill px-3 text-actionable-primary-idle-tint",
                      "transition-colors duration-300",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-display-primary-idle-tint",
                      "aria-disabled:cursor-not-allowed aria-disabled:bg-actionable-primary-disabled-fill aria-disabled:text-actionable-primary-disabled-tint",
                      "custom-active:scale-[.97] custom-active:transition-transform custom-active:duration-200 custom-active:ease-[cubic-bezier(.02,1.505,.745,1.235)]",
                      "custom-hocus:bg-actionable-primary-hover-fill custom-hocus:text-actionable-primary-hover-tint",
                    )}
                  >
                    <Text
                      overflow="truncate"
                      font="reactist"
                      size="13px"
                      weight={600}
                      height="32px"
                    >
                      Upgrade
                    </Text>
                  </button>
                </footer>
              </form>
            </div>
          </FloatingFocusManager>
        </div>
      </FloatingOverlay>
    </FloatingPortal>
  );
}
