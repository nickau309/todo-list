import { useOptimisticUser } from "@/contexts/optimistic-user-context";
import {
  FloatingFocusManager,
  FloatingList,
  FloatingOverlay,
  FloatingPortal,
} from "@floating-ui/react";
import clsx from "clsx";
import { useId, useMemo } from "react";
import { useCreateLabelFormWatch } from "./context/create-label-form-context";
import CreateLabelForm from "./create-label-form";
import { useLabelsDropdown } from "./labels-dropdown";
import LabelsDropdownInput from "./labels-dropdown-input";
import LabelsDropdownOptions from "./labels-dropdown-options";
import ResetAfterSubmission from "./reset-after-submission";
import SubmitButton from "./submit-button";

export default function LabelsDropdownPanel() {
  const id = useId();

  const { isOpen, listRef, context, floatingStyles, refs, getFloatingProps } =
    useLabelsDropdown("LabelsDropdownPanel");

  const { labels } = useOptimisticUser();

  const query = useCreateLabelFormWatch({
    name: "name",
    defaultValue: "",
  });

  const filteredLabels = useMemo(() => {
    return labels.filter((label) =>
      label.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
    );
  }, [labels, query]);

  const showSubmitButton =
    query.length > 0 && labels.every((label) => label.name !== query);

  return (
    <FloatingList elementsRef={listRef}>
      <ResetAfterSubmission />
      {isOpen && (
        <FloatingPortal id="root">
          <FloatingOverlay lockScroll className="z-40">
            <FloatingFocusManager context={context}>
              <div
                ref={refs.setFloating}
                style={floatingStyles}
                className={clsx(
                  "box-content w-full max-w-[300px] overflow-hidden rounded-[10px]",
                  "border border-dropdown bg-dropdown text-dropdown shadow-dropdown",
                  "focus-visible:outline-none",
                )}
                {...getFloatingProps()}
              >
                <CreateLabelForm>
                  <div className="p-2">
                    <div
                      className={clsx(
                        "flex h-8 cursor-text items-center overflow-hidden rounded-[5px] border border-input-idle",
                        "focus-within:border-input-focus",
                      )}
                    >
                      <LabelsDropdownInput
                        filteredLabels={filteredLabels}
                        id={id}
                      />
                    </div>
                  </div>
                  <div className="box-content flex max-h-[300px] flex-col overflow-y-auto overflow-x-hidden">
                    {filteredLabels.length > 0 ? (
                      <LabelsDropdownOptions
                        filteredLabels={filteredLabels}
                        id={id}
                      />
                    ) : (
                      <div className="px-2.5 py-[7px] font-sans text-[13px]/[17.6px] text-[#555]">
                        Label not found
                      </div>
                    )}
                    {showSubmitButton && <SubmitButton />}
                  </div>
                </CreateLabelForm>
              </div>
            </FloatingFocusManager>
          </FloatingOverlay>
        </FloatingPortal>
      )}
    </FloatingList>
  );
}
