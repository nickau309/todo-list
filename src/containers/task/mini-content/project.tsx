import { updateProjectId } from "@/actions/task";
import { InboxIcon24, NumberSignIcon24 } from "@/assets";
import { textColor } from "@/constants/color";
import {
  ProjectDropdown,
  ProjectDropdownButton,
  ProjectDropdownPanel,
} from "@/features/project-dropdown";
import type { ProjectPreviewType } from "@/types/project";
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
  const { id, project } = useOptimisticTask();
  const setOptimisticTask = useSetOptimisticTask();

  const setProject = useCallback(
    (project: ProjectPreviewType) => {
      startTransition(() => {
        setOptimisticTask((optimisticTask) => ({
          ...optimisticTask,
          project,
        }));
      });
      const formData = new FormData();
      formData.append("projectId", String(project.id));
      void updateProjectId(id, formData);
    },
    [id, setOptimisticTask],
  );

  return (
    <ProjectDropdown
      disabled={disabled}
      project={project}
      setProject={setProject}
    >
      <div className="flex items-center px-3">
        <ProjectDropdownButton
          type="button"
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
          <span className="truncate text-sm/8">{project.name}</span>
        </ProjectDropdownButton>
      </div>
      <ProjectDropdownPanel />
    </ProjectDropdown>
  );
}
