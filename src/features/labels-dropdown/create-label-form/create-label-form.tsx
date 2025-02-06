import { createLabel } from "@/actions/label";
import { useLabelsData } from "@/contexts/labels-data-context";
import useCombobox from "@/hooks/use-combobox";
import { LabelSchema } from "@/lib/zod";
import type { LabelOptimisticType } from "@/types/label";
import { FloatingFocusManager } from "@floating-ui/react";
import clsx from "clsx";
import type { ChangeEvent, FormEvent, KeyboardEvent } from "react";
import { startTransition, useOptimistic, useState } from "react";
import { useLabelsDropdown } from "../labels-dropdown";
import LabelsDropdownInput from "./labels-dropdown-input";
import LabelsDropdownOption from "./labels-dropdown-option";
import SubmitButton from "./submit-button";

export default function CreateLabelForm() {
  const labels = useLabelsData();

  const [optimisticLabels, addOptimisticLabels] = useOptimistic<
    LabelOptimisticType[],
    string
  >(labels, (labels, name) => {
    const newLabel: LabelOptimisticType = {
      childOrder: Number.MAX_SAFE_INTEGER,
      color: "CHARCOAL",
      id: Number.MAX_SAFE_INTEGER,
      name,
      isCreating: true,
    };
    return labels.concat(newLabel);
  });

  const { selectedLabelIds, setSelectedLabelIds } =
    useLabelsDropdown("CreateLabelForm");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState("");

  const filteredLabels = optimisticLabels.filter((label) =>
    label.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()),
  );

  const {
    activeIndex,
    listRef,
    context,
    refs,
    getComboboxProps,
    getListboxProps,
    getOptionProps,
  } = useCombobox<HTMLInputElement>({
    open: filteredLabels.length > 0,
  });

  const handleSelect = (index: number) => {
    const label = filteredLabels[index];
    const isSelected = selectedLabelIds.includes(label.id);
    if (isSelected) {
      setSelectedLabelIds(
        selectedLabelIds.filter((labelId) => labelId !== label.id),
      );
    } else {
      setSelectedLabelIds(selectedLabelIds.concat(label.id));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setIsSubmitting(true);
    startTransition(() => {
      addOptimisticLabels(name);
    });
    const formData = new FormData();
    formData.append("name", name);
    await createLabel(formData);
    setIsSubmitting(false);
  };

  const showSubmitButton =
    name.length > 0 && optimisticLabels.every((label) => label.name !== name);

  const parsed = LabelSchema.shape.name.safeParse(name);
  const isValid = parsed.success;

  return (
    <form
      onSubmit={(e) => {
        void handleSubmit(e);
      }}
      className="divide-y divide-divider-secondary"
    >
      <div className="p-2">
        <div
          className={clsx(
            "flex h-8 cursor-text items-center overflow-hidden rounded-[5px] border border-input-idle",
            "focus-within:border-input-focus",
          )}
        >
          <LabelsDropdownInput
            ref={refs.setReference}
            aria-autocomplete="list"
            value={name}
            {...getComboboxProps({
              onChange(e: ChangeEvent<HTMLInputElement>) {
                setName(e.target.value);
              },
              onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (activeIndex !== null) {
                    handleSelect(activeIndex);
                  }
                }
              },
            })}
          />
        </div>
      </div>
      <div
        className={clsx(
          "box-content",
          "max-h-[300px] w-full overflow-y-auto overflow-x-hidden",
        )}
        tabIndex={-1}
      >
        {filteredLabels.length > 0 ? (
          <FloatingFocusManager context={context} initialFocus={-1}>
            <div ref={refs.setFloating} {...getListboxProps()}>
              {filteredLabels.map((label, index) => {
                const disabled = !!label.isCreating;
                return (
                  <LabelsDropdownOption
                    key={label.id}
                    ref={(node) => {
                      listRef.current[index] = node;
                    }}
                    active={activeIndex === index}
                    aria-disabled={disabled}
                    color={label.color}
                    name={label.name}
                    selected={selectedLabelIds.includes(label.id)}
                    {...getOptionProps({
                      onClick() {
                        if (!disabled) {
                          handleSelect(index);
                        }
                      },
                    })}
                  />
                );
              })}
            </div>
          </FloatingFocusManager>
        ) : (
          <div className="flex px-2.5 py-[7px]">
            <span className="truncate font-sans text-[13px]/[17.6px] text-[#555]">
              Label not found
            </span>
          </div>
        )}
        {showSubmitButton && (
          <SubmitButton name={name} disabled={isSubmitting || !isValid} />
        )}
      </div>
    </form>
  );
}
