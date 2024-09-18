import { useOptimisticUser } from "@/contexts/optimistic-user-context";
import type { LabelOptimisticType } from "@/types/label";
import clsx from "clsx";
import type { ChangeEvent, FocusEvent, KeyboardEvent } from "react";
import {
  useCreateLabelFormContext,
  useCreateLabelFormWatch,
} from "./context/create-label-form-context";
import { useLabelsDropdown } from "./labels-dropdown";

type InputProps = {
  filteredLabels: LabelOptimisticType[];
  id: string;
};

export default function LabelsDropdownInput({
  filteredLabels,
  id,
}: InputProps) {
  const { labels } = useOptimisticUser();

  const { register } = useCreateLabelFormContext();
  const query = useCreateLabelFormWatch({
    name: "name",
    defaultValue: "",
  });

  const {
    toggleSelectedLabel,
    activeIndex,
    setActiveIndex,
    getInputProps: getReferenceProps,
  } = useLabelsDropdown("LabelsDropdownInput");

  const { name, onBlur, onChange, ref } = register("name");

  const showListbox = query === "" || filteredLabels.length > 0;

  return (
    <input
      ref={ref}
      type="text"
      aria-autocomplete="list"
      aria-controls={showListbox ? id : undefined}
      aria-expanded={showListbox}
      aria-haspopup="listbox"
      aria-label="Type a label"
      autoComplete="off"
      name={name}
      placeholder="Type a label"
      role="combobox"
      className={clsx(
        "flex-1 bg-transparent px-2 py-1.5 font-sans text-sm/[18px]",
        "placeholder:text-display-tertiary-idle-tint",
        "focus-visible:outline-none",
      )}
      {...getReferenceProps({
        onBlur(e: FocusEvent<HTMLInputElement>) {
          void onBlur(e);
        },
        onChange(e: ChangeEvent<HTMLInputElement>) {
          void onChange(e);
          setActiveIndex(null);
        },
        onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
          if (e.key === "Enter") {
            e.preventDefault();
            if (activeIndex !== null) {
              if (query === "") {
                toggleSelectedLabel(labels[activeIndex]);
              } else if (filteredLabels.length > 0) {
                toggleSelectedLabel(filteredLabels[activeIndex]);
              }
            }
          }
        },
      })}
    />
  );
}
