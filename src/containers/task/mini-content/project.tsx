import { updateProjectId } from "@/actions/task";
import { InboxIcon24, NumberSignIcon24 } from "@/assets";
import Text from "@/components/ui/text";
import { textColor } from "@/constants/color";
import { useProjects } from "@/contexts/projects-context";
import {
  ProjectDropdown,
  ProjectDropdownButton,
  ProjectDropdownPanel,
} from "@/features/project-dropdown";
import clsx from "clsx";
import { startTransition, useCallback } from "react";
import {
  useOptimisticTask,
  useSetOptimisticTask,
} from "../contexts/optimistic-task-context";

type ProjectProps = {
  disabled?: boolean;
};

export default function Project({ disabled = false }: ProjectProps) {
  const projects = useProjects();

  const { id, projectId } = useOptimisticTask();
  const setOptimisticTask = useSetOptimisticTask();

  const setProjectId = useCallback(
    (projectId: number) => {
      startTransition(() => {
        setOptimisticTask((optimisticTask) => ({
          ...optimisticTask,
          projectId,
        }));
      });
      const formData = new FormData();
      formData.append("projectId", String(projectId));
      void updateProjectId(id, formData);
    },
    [id, setOptimisticTask],
  );

  const project =
    projects.find((project) => project.id === projectId) ?? projects[0];

  return (
    <ProjectDropdown
      disabled={disabled}
      projectId={projectId}
      setProjectId={setProjectId}
    >
      <div className="flex items-center px-3">
        <ProjectDropdownButton
          className={clsx(
            "group",
            "flex h-10 min-w-[68px] flex-1 select-none items-center gap-3.5 rounded-[5px] pl-1.5 pr-3",
            "transition-colors duration-300",
            "aria-disabled:cursor-not-allowed aria-disabled:text-actionable-quaternary-disabled-tint",
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
              <InboxIcon24 />
            </span>
          ) : (
            <span
              className={clsx(
                textColor[project.color],
                "group-aria-disabled:opacity-60",
              )}
            >
              <NumberSignIcon24 />
            </span>
          )}
          <Text overflow="truncate" font="reactist" size="14px" height="32px">
            {project.name}
          </Text>
        </ProjectDropdownButton>
      </div>
      <ProjectDropdownPanel />
    </ProjectDropdown>
  );
}
