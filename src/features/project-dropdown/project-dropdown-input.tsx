import { useOptimisticUser } from "@/contexts/optimistic-user-context";
import type {
  CreateProjectFormType,
  ProjectPreviewType,
} from "@/types/project";
import clsx from "clsx";
import type { ChangeEvent, FocusEvent, KeyboardEvent } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useProjectDropdown } from "./project-dropdown";
import { useProjectDropdownPanel } from "./project-dropdown-panel";

type InputProps = {
  filteredProjects: ProjectPreviewType[];
};

export default function ProjectDropdownInput({ filteredProjects }: InputProps) {
  const { projects } = useOptimisticUser();

  const { register } = useFormContext<CreateProjectFormType>();
  const query = useWatch<CreateProjectFormType>({
    name: "name",
    defaultValue: "",
  });

  const { setSelectedProject, setIsOpen, activeIndex, setActiveIndex } =
    useProjectDropdown("ProjectDropdownInput");

  const { id, getReferenceProps } = useProjectDropdownPanel(
    "ProjectDropdownInput",
  );

  const { name, onBlur, onChange, ref } = register("name");

  const showListbox = query === "" || filteredProjects.length > 0;

  return (
    <input
      ref={ref}
      type="text"
      aria-autocomplete="list"
      aria-controls={showListbox ? id : undefined}
      aria-expanded={showListbox}
      aria-haspopup="listbox"
      aria-label="Type a project name"
      autoComplete="off"
      name={name}
      placeholder="Type a project name"
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
                setSelectedProject(projects[activeIndex]);
                setIsOpen(false);
              } else if (filteredProjects.length > 0) {
                setSelectedProject(filteredProjects[activeIndex]);
                setIsOpen(false);
              }
            }
          }
        },
      })}
    />
  );
}
