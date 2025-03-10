import { AddTaskIcon24 } from "@/assets";
import Text from "@/components/ui/text";
import clsx from "clsx";
import { useQuickAddDialog } from "./quick-add-dialog";

export default function QuickAddDialogButton() {
  const { refs, getReferenceProps } = useQuickAddDialog("QuickAddDialogButton");

  return (
    <button
      ref={refs.setReference}
      type="button"
      aria-disabled="false"
      className={clsx(
        "flex h-[34px] w-full min-w-[68px] select-none items-center gap-1.5 rounded-[5px] border border-transparent pl-1 pr-2.5",
        "text-selectable-secondary-selected-tint",
        "transition-colors duration-300",
        "custom-active:scale-[.97] custom-active:transition-transform custom-active:duration-200 custom-active:ease-[cubic-bezier(.02,1.505,.745,1.235)]",
        "custom-hocus:bg-selectable-secondary-hover-fill",
      )}
      {...getReferenceProps()}
    >
      <span className="text-actionable-primary-idle-fill">
        <AddTaskIcon24 />
      </span>
      <Text
        overflow="truncate"
        font="reactist"
        size="14px"
        weight={600}
        height="32px"
      >
        Add task
      </Text>
    </button>
  );
}
