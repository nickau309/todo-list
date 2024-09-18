import { InboxIcon24, NumberSignIcon24, SelectCheckIcon12 } from "@/assets";
import { textColor } from "@/constants/color";
import type {
  CreateProjectFormType,
  ProjectPreviewType,
} from "@/types/project";
import { useListItem } from "@floating-ui/react";
import clsx from "clsx";
import { useId } from "react";
import { useWatch } from "react-hook-form";
import { useProjectDropdown } from "./project-dropdown";
import { useProjectDropdownPanel } from "./project-dropdown-panel";

type OptionProps = {
  project: ProjectPreviewType;
};

export default function ProjectDropdownOption({ project }: OptionProps) {
  const { ref, index } = useListItem();

  const id = useId();

  const query = useWatch<CreateProjectFormType>({
    name: "name",
    defaultValue: "",
  });

  const { selectedProject, setSelectedProject, setIsOpen, activeIndex } =
    useProjectDropdown("ProjectDropdownOption");

  const { getItemProps } = useProjectDropdownPanel("ProjectDropdownOption");

  const isActive = activeIndex === index;
  const isDisabled = project.isCreating;
  const isSelected = selectedProject.id === project.id;

  return (
    <button
      ref={ref}
      type="button"
      aria-disabled={isDisabled}
      aria-selected={isSelected}
      data-active={isActive}
      id={id}
      role="option"
      tabIndex={isActive ? 0 : -1}
      className={clsx(
        "flex items-center gap-2 py-1",
        project.isInboxProject || query.length > 0 ? "pl-2" : "pl-5",
        "pr-2",
        "focus-visible:outline-none",
        "aria-disabled:cursor-progress",
        "data-[active='true']:bg-option-active",
      )}
      {...getItemProps({
        onClick() {
          if (!isDisabled) {
            setSelectedProject(project);
            setIsOpen(false);
          }
        },
      })}
    >
      {project.isInboxProject ? (
        <span className="text-actionable-quaternary-idle-tint">
          <InboxIcon24 />
        </span>
      ) : (
        <span className={textColor[project.color]}>
          <NumberSignIcon24 />
        </span>
      )}
      <div className="flex min-w-0 flex-1 gap-1">
        <span className="truncate text-[13px]/[16.8px]">{project.name}</span>
        <span className="truncate text-[13px]/[16.8px] text-display-secondary-idle-tint">
          {query.length > 0 && "My Projects"}
        </span>
      </div>
      {isSelected && (
        <span className="text-actionable-primary-idle-fill">
          <SelectCheckIcon12 />
        </span>
      )}
    </button>
  );
}
