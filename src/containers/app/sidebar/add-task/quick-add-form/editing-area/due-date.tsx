import {
  DueDateOutlineIcon16,
  DueDateSolidIcon16,
  RemoveIcon16,
} from "@/assets";
import Text from "@/components/ui/text";
import { useStore } from "@/contexts/store-context";
import {
  DueDatePopover,
  DueDatePopoverButton,
  DueDatePopoverPanel,
} from "@/features/due-date-popover";
import getDueDateString from "@/utils/getDueDateString";
import getDueDateTextColor from "@/utils/getDueDateTextColor";
import clsx from "clsx";

type DueDateProps = {
  disabled?: boolean;
};

export default function DueDate({ disabled = false }: DueDateProps) {
  const { dueDate, setDueDate } = useStore((state) => ({
    dueDate: state.quickAddForm.inputValues.dueDate,
    setDueDate: state.quickAddForm.setDueDate,
  }));

  const removeDueDate = () => {
    setDueDate(null);
  };

  const hasDueDate = dueDate !== null;

  return (
    <DueDatePopover
      dueDate={dueDate}
      setDueDate={setDueDate}
      disabled={disabled}
    >
      {hasDueDate ? (
        <div className="relative flex items-center">
          <DueDatePopoverButton
            className={clsx(
              "flex h-7 items-center gap-1 rounded-[5px] border border-input-idle",
              "pl-1.5 pr-[30px]",
              "text-actionable-quaternary-idle-tint",
              "transition-[border,box-shadow] duration-300 ease-[cubic-bezier(.25,.1,.25,1)]",
              "focus-visible:border-transparent focus-visible:outline-none focus-visible:ring focus-visible:ring-outer focus-visible:ring-offset-1 focus-visible:ring-offset-inner",
              "aria-disabled:cursor-not-allowed aria-disabled:text-actionable-quaternary-disabled-tint",
              "custom-hocus:bg-actionable-quaternary-hover-fill custom-hocus:text-actionable-quaternary-hover-tint",
            )}
          >
            <span className={getDueDateTextColor(dueDate) ?? ""}>
              <DueDateSolidIcon16 />
            </span>
            <Text
              overflow="truncate"
              font="reactist"
              size="13px"
              height={1.5}
              color={getDueDateTextColor(dueDate) ?? "text-[#808080]"}
            >
              {getDueDateString(dueDate)}
            </Text>
          </DueDatePopoverButton>
          <button
            type="button"
            aria-disabled={disabled}
            aria-label="Remove due date"
            onClick={removeDueDate}
            className={clsx(
              "absolute right-[6.8px]",
              "grid size-4 place-items-center rounded-[5px] border border-transparent",
              "text-actionable-quaternary-idle-tint",
              "transition-[border,box-shadow] duration-300 ease-[cubic-bezier(.25,.1,.25,1)]",
              "focus-visible:border-transparent focus-visible:outline-none focus-visible:ring focus-visible:ring-outer focus-visible:ring-offset-1 focus-visible:ring-offset-inner",
              "aria-disabled:cursor-not-allowed aria-disabled:text-actionable-quaternary-disabled-tint",
              "custom-active:scale-[.97] custom-active:transition-transform custom-active:duration-200 custom-active:ease-[cubic-bezier(.02,1.505,.745,1.235)]",
              "custom-hocus:bg-actionable-quaternary-hover-fill custom-hocus:text-actionable-quaternary-hover-tint",
            )}
          >
            <RemoveIcon16 className="h-full w-full" />
          </button>
        </div>
      ) : (
        <div className="relative flex items-center">
          <DueDatePopoverButton
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
              <DueDateOutlineIcon16 />
            </span>
            <Text
              overflow="truncate"
              font="reactist"
              size="13px"
              height="16.8px"
              color="secondary"
            >
              Due date
            </Text>
          </DueDatePopoverButton>
        </div>
      )}
      <DueDatePopoverPanel />
    </DueDatePopover>
  );
}
