import Heading1 from "@/components/ui/heading1";
import Text from "@/components/ui/text";
import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
  useTransitionStyles,
} from "@floating-ui/react";
import clsx from "clsx";
import type { FormEvent } from "react";
import { useId, useRef } from "react";
import removeMd from "remove-markdown";

type DialogProps = {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  name: string;
  onOpenChange: (open: boolean) => void;
  open: boolean;
};

export default function TaskDeletionDialog({
  handleSubmit,
  name,
  onOpenChange,
  open,
}: DialogProps) {
  const labelId = useId();
  const descriptionId = useId();

  const initialFocus = useRef<HTMLButtonElement>(null);

  const { context, refs } = useFloating({ open, onOpenChange });

  const role = useRole(context);
  const dismiss = useDismiss(context, { outsidePressEvent: "mousedown" });

  const { getFloatingProps } = useInteractions([role, dismiss]);

  const { isMounted, styles } = useTransitionStyles(context, {
    duration: 200,
    initial: { opacity: 0 },
  });

  const handleClose = () => {
    onOpenChange(false);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(e);
    onOpenChange(false);
  };

  let str = removeMd(name);
  if (str.length > 50) {
    str = str.slice(0, 50) + "…";
  }

  if (!isMounted) {
    return null;
  }

  return (
    <FloatingPortal id="root">
      <FloatingOverlay
        lockScroll
        className="z-30 flex h-full items-start justify-center bg-black/50 p-8 pt-[13vh]"
        style={styles}
      >
        <FloatingFocusManager context={context} initialFocus={initialFocus}>
          <div
            ref={refs.setFloating}
            aria-labelledby={labelId}
            aria-describedby={descriptionId}
            className={clsx(
              "flex max-h-full w-full max-w-md overflow-hidden rounded-[10px]",
              "bg-background-base-primary text-display-primary-idle-tint",
              "shadow-[0_2px_8px_rgba(0,0,0,.16)]",
            )}
            {...getFloatingProps()}
          >
            <form onSubmit={handleFormSubmit} className="flex flex-1 flex-col">
              <header className="flex items-center justify-between gap-4 p-4 pb-2">
                <Heading1
                  id={labelId}
                  overflow="truncate"
                  font="reactist"
                  size="16px"
                  weight={600}
                  height="23px"
                  color="primary"
                >
                  Delete task?
                </Heading1>
              </header>
              <div className="overflow-auto px-4">
                <Text
                  as="p"
                  id={descriptionId}
                  font="sans"
                  size="14px"
                  height={1.5}
                  spacing="-.15px"
                  color="primary"
                >
                  The <Text weight={700}>{str}</Text> task will be permanently
                  deleted.
                </Text>
              </div>
              <footer className="flex justify-end gap-2.5 p-4 pt-6">
                <button
                  type="button"
                  aria-disabled="false"
                  onClick={handleClose}
                  className={clsx(
                    "flex h-8 min-w-[68px] select-none items-center justify-center rounded-[5px] border border-transparent",
                    "bg-actionable-secondary-idle-fill px-3 text-actionable-secondary-idle-tint",
                    "transition-[border,box-shadow] duration-300 ease-[cubic-bezier(.25,.1,.25,1)]",
                    "focus-visible:border-transparent focus-visible:outline-none focus-visible:ring focus-visible:ring-outer focus-visible:ring-offset-1 focus-visible:ring-offset-inner",
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
                  ref={initialFocus}
                  type="submit"
                  aria-disabled="false"
                  className={clsx(
                    "flex h-8 min-w-[68px] select-none items-center justify-center rounded-[5px] border border-transparent",
                    "bg-actionable-primary-idle-fill px-3 text-actionable-primary-idle-tint",
                    "transition-[border,box-shadow] duration-300 ease-[cubic-bezier(.25,.1,.25,1)]",
                    "focus-visible:border-transparent focus-visible:outline-none focus-visible:ring focus-visible:ring-outer focus-visible:ring-offset-1 focus-visible:ring-offset-inner",
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
                    Delete
                  </Text>
                </button>
              </footer>
            </form>
          </div>
        </FloatingFocusManager>
      </FloatingOverlay>
    </FloatingPortal>
  );
}
