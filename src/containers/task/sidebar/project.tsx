import { updateProjectId } from "@/actions/task";
import { DropdownIcon24, InboxIcon16, NumberSignIcon16 } from "@/assets";
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
      <div className="flex flex-col">
        <div
          className={clsx(
            "pl-px text-xs/7 font-semibold",
            disabled
              ? "text-actionable-quaternary-disabled-tint"
              : "text-display-secondary-idle-tint",
          )}
        >
          Project
        </div>
        <div className="relative -mx-2 flex flex-col">
          <ProjectDropdownButton
            type="button"
            className={clsx(
              "group peer flex h-7 min-w-[68px] select-none items-center gap-2 rounded-[5px] border border-transparent px-2",
              "transition-colors duration-300",
              "aria-disabled:cursor-not-allowed aria-disabled:text-actionable-quaternary-disabled-tint",
              "custom-active:scale-[.97] custom-active:transition-transform custom-active:duration-200 custom-active:ease-[cubic-bezier(.02,1.505,.745,1.235)]",
              "custom-hocus:bg-selectable-secondary-selected-fill custom-hocus:pr-7",
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
            <span className="truncate text-xs/7 group-aria-disabled:font-semibold">
              {project.name}
            </span>
          </ProjectDropdownButton>
          <span
            className={clsx(
              "pointer-events-none absolute right-[3px] top-1/2 hidden -translate-y-1/2",
              "peer-custom-hocus:block",
            )}
          >
            <DropdownIcon24 />
          </span>
        </div>
      </div>
      <ProjectDropdownPanel />
    </ProjectDropdown>
  );
}
