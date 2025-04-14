import { DropdownIcon16, InboxIcon16, NumberSignIcon16 } from "@/assets";
import Text from "@/components/ui/text";
import { textColor } from "@/constants/color";
import { useProjects } from "@/contexts/projects-context";
import { useStore } from "@/contexts/store-context";
import {
  ProjectDropdown,
  ProjectDropdownButton,
  ProjectDropdownPanel,
} from "@/features/project-dropdown";
import clsx from "clsx";

type ProjectProps = {
  disabled?: boolean;
};

export default function Project({ disabled = false }: ProjectProps) {
  const projects = useProjects();

  const { projectId, setProjectId } = useStore((state) => ({
    projectId: state.quickAddForm.inputValues.projectId,
    setProjectId: state.quickAddForm.setProjectId,
  }));

  const project =
    projects.find((project) => project.id === projectId) ?? projects[0];

  return (
    <ProjectDropdown
      disabled={disabled}
      projectId={projectId ?? projects[0].id}
      setProjectId={setProjectId}
    >
      <ProjectDropdownButton
        className={clsx(
          "group",
          "flex h-8 min-w-[68px] select-none items-center gap-1 rounded-[5px] border border-transparent",
          "pl-1 pr-2",
          "text-actionable-quaternary-idle-tint",
          "transition-[border,box-shadow] duration-300 ease-[cubic-bezier(.25,.1,.25,1)]",
          "focus-visible:border-transparent focus-visible:outline-none focus-visible:ring focus-visible:ring-outer focus-visible:ring-offset-1 focus-visible:ring-offset-inner",
          "aria-disabled:cursor-not-allowed aria-disabled:text-actionable-quaternary-disabled-tint",
          "custom-active:scale-[.97] custom-active:transition-transform custom-active:duration-200 custom-active:ease-[cubic-bezier(.02,1.505,.745,1.235)]",
          "custom-hocus:bg-actionable-quaternary-hover-fill custom-hocus:text-actionable-quaternary-hover-tint",
        )}
      >
        {project.isInboxProject ? (
          <span
            className={clsx(
              "text-actionable-quaternary-idle-tint",
              "group-aria-disabled:opacity-60",
            )}
          >
            <InboxIcon16 />
          </span>
        ) : (
          <span
            className={clsx(
              textColor[project.color],
              "group-aria-disabled:opacity-60",
            )}
          >
            <NumberSignIcon16 />
          </span>
        )}
        <Text
          overflow="truncate"
          font="reactist"
          size="13px"
          weight={600}
          height="32px"
        >
          {project.name}
        </Text>
        <span>
          <DropdownIcon16 />
        </span>
      </ProjectDropdownButton>
      <ProjectDropdownPanel />
    </ProjectDropdown>
  );
}
