import { CheckSmIcon24 } from "@/assets";
import clsx from "clsx";
import { KeyboardEvent, MouseEvent, useRef } from "react";
import { CSSTransition } from "react-transition-group";

const BORDER_WIDTH = {
  1: "border-2",
  2: "border-2",
  3: "border-2",
  4: "border",
} as Record<number, string>;

const BORDER_COLOR = {
  1: "border-priorities-p1-idle-tint",
  2: "border-priorities-p2-idle-tint",
  3: "border-priorities-p3-idle-tint",
  4: "border-priorities-p4-idle-tint",
} as Record<number, string>;

const DISABLED_BORDER_COLOR = {
  1: "peer-aria-disabled:border-priorities-p1-disabled-tint",
  2: "peer-aria-disabled:border-priorities-p2-disabled-tint",
  3: "peer-aria-disabled:border-priorities-p3-disabled-tint",
  4: "peer-aria-disabled:border-priorities-p4-disabled-tint",
} as Record<number, string>;

const BG_COLOR = {
  1: "bg-priorities-p1-idle-fill",
  2: "bg-priorities-p2-idle-fill",
  3: "bg-priorities-p3-idle-fill",
  4: "bg-transparent",
} as Record<number, string>;

const CHECKED_BG_COLOR = {
  1: "bg-priorities-p1-idle-fill",
  2: "bg-priorities-p2-idle-fill",
  3: "bg-priorities-p3-idle-fill",
  4: "bg-priorities-p4-idle-fill",
} as Record<number, string>;

const DISABLED_BG_COLOR = {
  1: "peer-aria-disabled:bg-priorities-p1-disabled-fill",
  2: "peer-aria-disabled:bg-priorities-p2-disabled-fill",
  3: "peer-aria-disabled:bg-priorities-p3-disabled-fill",
  4: "peer-aria-disabled:bg-transparent",
} as Record<number, string>;

const DISABLED_CHECKED_BG_COLOR = {
  1: "peer-aria-disabled:bg-priorities-p1-disabled-fill",
  2: "peer-aria-disabled:bg-priorities-p2-disabled-fill",
  3: "peer-aria-disabled:bg-priorities-p3-disabled-fill",
  4: "peer-aria-disabled:bg-priorities-p4-disabled-fill",
} as Record<number, string>;

const CHECKED_TEXT_COLOR = {
  1: "text-background-base-secondary",
  2: "text-background-base-secondary",
  3: "text-background-base-secondary",
  4: "text-background-base-secondary",
} as Record<number, string>;

const TEXT_COLOR = {
  1: "text-priorities-p1-idle-fill",
  2: "text-priorities-p2-idle-fill",
  3: "text-priorities-p3-idle-fill",
  4: "text-priorities-p4-idle-fill",
} as Record<number, string>;

function NewBorder({
  checked,
  priority,
}: {
  checked: boolean;
  priority: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  return (
    <CSSTransition
      in={checked}
      nodeRef={ref}
      timeout={250}
      classNames={{
        appear: "",
        appearActive: "",
        appearDone: "",
        enter: "",
        enterActive: "animate-[scale_.25s_linear_forwards]",
        enterDone: "",
        exit: "",
        exitActive: "animate-[scale_.25s_linear_forwards]",
        exitDone: "",
      }}
    >
      <span
        ref={ref}
        className={clsx(
          "pointer-events-none size-[18px] rounded-full",
          BORDER_WIDTH[priority],
          BORDER_COLOR[priority],
          "[grid-area:center]",
          DISABLED_BORDER_COLOR[priority],
        )}
      />
    </CSSTransition>
  );
}

function NewBackground({
  checked,
  priority,
}: {
  checked: boolean;
  priority: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  return (
    <CSSTransition
      in={!checked}
      unmountOnExit
      nodeRef={ref}
      timeout={250}
      classNames={{
        appear: "",
        appearActive: "",
        appearDone: "",
        enter: "",
        enterActive: "",
        enterDone: "",
        exit: "",
        exitActive: "",
        exitDone: "",
      }}
    >
      <span
        ref={ref}
        className={clsx(
          "pointer-events-none size-[18px] rounded-full",
          BORDER_WIDTH[priority],
          "border-transparent",
          BG_COLOR[priority],
          "opacity-10",
          "transition-opacity duration-150 ease-in",
          "[grid-area:center]",
          DISABLED_BG_COLOR[priority],
          "peer-custom-hover:opacity-20",
        )}
      />
    </CSSTransition>
  );
}

function NewColoredBackground({
  checked,
  priority,
}: {
  checked: boolean;
  priority: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  return (
    <CSSTransition
      in={checked}
      unmountOnExit
      nodeRef={ref}
      timeout={250}
      classNames={{
        appear: "",
        appearActive: "",
        appearDone: "",
        enter: "",
        enterActive:
          "animate-[scale_.25s_linear_forwards,fade-in_.25s_linear_forwards]",
        enterDone: "",
        exit: "",
        exitActive:
          "animate-[scale_.25s_linear_forwards,fade-in_.25s_linear_forwards_reverse]",
        exitDone: "",
      }}
    >
      <span
        ref={ref}
        className={clsx(
          "pointer-events-none size-[18px] rounded-full",
          BORDER_WIDTH[priority],
          "border-transparent",
          CHECKED_BG_COLOR[priority],
          "[grid-area:center]",
          DISABLED_CHECKED_BG_COLOR[priority],
        )}
      />
    </CSSTransition>
  );
}

function NewCheck({
  checked,
  priority,
}: {
  checked: boolean;
  priority: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  return (
    <CSSTransition
      in={checked}
      unmountOnExit
      nodeRef={ref}
      timeout={250}
      classNames={{
        appear: "",
        appearActive: "",
        appearDone: "",
        enter: "",
        enterActive: "animate-[fade-in_.25s_linear_forwards]",
        enterDone: "",
        exit: "",
        exitActive: "animate-[fade-in_.25s_linear_forwards_reverse]",
        exitDone: "",
      }}
    >
      <span
        ref={ref}
        className={clsx(
          "pointer-events-none",
          CHECKED_TEXT_COLOR[priority],
          "[grid-area:center]",
        )}
      >
        <CheckSmIcon24 />
      </span>
    </CSSTransition>
  );
}

function NewColoredCheck({
  checked,
  priority,
}: {
  checked: boolean;
  priority: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  return (
    <CSSTransition
      in={!checked}
      unmountOnExit
      nodeRef={ref}
      timeout={250}
      classNames={{
        appear: "",
        appearActive: "",
        appearDone: "",
        enter: "",
        enterActive: "",
        enterDone: "",
        exit: "",
        exitActive: "animate-[fade-out_.25s_linear_forwards]",
        exitDone: "",
      }}
    >
      <span
        ref={ref}
        className={clsx(
          "pointer-events-none",
          TEXT_COLOR[priority],
          "opacity-0",
          "transition-opacity duration-150 ease-in",
          "[grid-area:center]",
          "peer-custom-hover:opacity-100",
        )}
      >
        <CheckSmIcon24 />
      </span>
    </CSSTransition>
  );
}

export default function CheckboxButton({
  checked,
  disabled = false,
  priority,
  setChecked,
}: {
  checked: boolean;
  disabled?: boolean;
  priority: number;
  setChecked: (checked: boolean) => void;
}) {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!disabled) {
      setChecked(!checked);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.stopPropagation();
    }
  };

  return (
    <div
      className={clsx(
        "grid size-6 place-items-center",
        "[grid-template-areas:'center']",
      )}
    >
      <button
        type="button"
        aria-checked={checked}
        aria-disabled={disabled}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="checkbox"
        className={clsx(
          "peer size-[18px] cursor-pointer appearance-none rounded-full",
          "transition-[border,box-shadow] duration-300 ease-[cubic-bezier(.25,.1,.25,1)]",
          "[grid-area:center]",
          "focus-visible:border-transparent focus-visible:outline-none focus-visible:ring focus-visible:ring-outer focus-visible:ring-offset-1 focus-visible:ring-offset-inner",
          "aria-disabled:cursor-not-allowed",
        )}
      />
      <NewBorder checked={checked} priority={priority} />
      <NewBackground checked={checked} priority={priority} />
      <NewColoredBackground checked={checked} priority={priority} />
      <NewColoredCheck checked={checked} priority={priority} />
      <NewCheck checked={checked} priority={priority} />
    </div>
  );
}

function NewBorderDisplay({ priority }: { priority: number }) {
  return (
    <span
      className={clsx(
        "pointer-events-none size-[18px] rounded-full",
        BORDER_WIDTH[priority],
        BORDER_COLOR[priority],
        "[grid-area:center]",
      )}
    />
  );
}

function NewBackgroundDisplay({
  checked,
  priority,
}: {
  checked: boolean;
  priority: number;
}) {
  if (checked) {
    return null;
  }

  return (
    <span
      className={clsx(
        "pointer-events-none size-[18px] rounded-full",
        BORDER_WIDTH[priority],
        "border-transparent",
        BG_COLOR[priority],
        "opacity-10",
        "[grid-area:center]",
      )}
    />
  );
}

function NewColoredBackgroundDisplay({
  checked,
  priority,
}: {
  checked: boolean;
  priority: number;
}) {
  if (!checked) {
    return null;
  }

  return (
    <span
      className={clsx(
        "pointer-events-none size-[18px] rounded-full",
        BORDER_WIDTH[priority],
        "border-transparent",
        CHECKED_BG_COLOR[priority],
        "[grid-area:center]",
      )}
    />
  );
}

function NewCheckDisplay({
  checked,
  priority,
}: {
  checked: boolean;
  priority: number;
}) {
  if (!checked) {
    return null;
  }

  return (
    <span
      className={clsx(
        "pointer-events-none",
        CHECKED_TEXT_COLOR[priority],
        "[grid-area:center]",
      )}
    >
      <CheckSmIcon24 />
    </span>
  );
}

export function CheckboxDisplay({
  checked,
  priority,
}: {
  checked: boolean;
  priority: number;
}) {
  return (
    <div
      className={clsx(
        "grid size-6 place-items-center",
        "[grid-template-areas:'center']",
      )}
    >
      <div
        className={clsx(
          "size-[18px] cursor-not-allowed rounded-full",
          "[grid-area:center]",
        )}
      />
      <NewBorderDisplay priority={priority} />
      <NewBackgroundDisplay checked={checked} priority={priority} />
      <NewColoredBackgroundDisplay checked={checked} priority={priority} />
      <NewCheckDisplay checked={checked} priority={priority} />
    </div>
  );
}
