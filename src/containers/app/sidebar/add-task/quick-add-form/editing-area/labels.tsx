import { LabelIconOutline16, LabelIconSolid12, RemoveIcon16 } from "@/assets";
import { useStore } from "@/contexts/store-context";
import {
  LabelsDropdown,
  LabelsDropdownButton,
  LabelsDropdownPanel,
} from "@/features/labels-dropdown";
import clsx from "clsx";

type LabelsProps = {
  disabled?: boolean;
};

export default function Labels({ disabled = false }: LabelsProps) {
  const { labelIds, setLabelIds } = useStore((state) => ({
    labelIds: state.quickAddForm.inputValues.labelIds,
    setLabelIds: state.quickAddForm.setLabelIds,
  }));

  const removeAllLabels = () => {
    setLabelIds([]);
  };

  return (
    <LabelsDropdown
      labelIds={labelIds}
      setLabelIds={setLabelIds}
      disabled={disabled}
    >
      {labelIds.length > 0 ? (
        <div className="relative flex items-center">
          <LabelsDropdownButton
            className={clsx(
              "flex h-7 items-center gap-1 rounded-[5px] border border-input-idle",
              "pl-1.5 pr-[26px]",
              "text-actionable-quaternary-idle-tint",
              "transition-[border,box-shadow] duration-300 ease-[cubic-bezier(.25,.1,.25,1)]",
              "focus-visible:border-transparent focus-visible:outline-none focus-visible:ring focus-visible:ring-outer focus-visible:ring-offset-1 focus-visible:ring-offset-inner",
              "aria-disabled:cursor-not-allowed aria-disabled:text-actionable-quaternary-disabled-tint",
              "custom-hocus:bg-actionable-quaternary-hover-fill custom-hocus:text-actionable-quaternary-hover-tint",
            )}
          >
            <span className="grid size-4 place-items-center">
              <LabelIconSolid12 />
            </span>
            <span
              className={clsx(
                "truncate text-[13px]/[16.8px]",
                "text-display-secondary-idle-tint",
              )}
            >
              {labelIds.length}
            </span>
          </LabelsDropdownButton>
          <button
            type="button"
            aria-disabled={disabled}
            aria-label="Remove all labels"
            onClick={removeAllLabels}
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
          <LabelsDropdownButton
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
              <LabelIconOutline16 />
            </span>
            <span
              className={clsx(
                "truncate text-[13px]/[16.8px]",
                "text-display-secondary-idle-tint",
              )}
            >
              Labels
            </span>
          </LabelsDropdownButton>
        </div>
      )}
      <LabelsDropdownPanel />
    </LabelsDropdown>
  );
}
