import type { LabelOptimisticType } from "@/types/label";
import { useLabelsDropdown } from "./labels-dropdown";
import LabelsDropdownOption from "./labels-dropdown-option";

type OptionsProps = {
  filteredLabels: LabelOptimisticType[];
  id: string;
};

export default function LabelsDropdownOptions({
  filteredLabels,
  id,
}: OptionsProps) {
  const { getListboxProps: getFloatingProps } = useLabelsDropdown(
    "LabelsDropdownOptions",
  );

  return (
    <div
      id={id}
      role="listbox"
      className="flex flex-col"
      {...getFloatingProps()}
    >
      {filteredLabels.map((label) => (
        <LabelsDropdownOption key={label.id} label={label} />
      ))}
    </div>
  );
}
