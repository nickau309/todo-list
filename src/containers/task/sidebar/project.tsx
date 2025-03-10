import { updateProjectId } from "@/actions/task";
import { DropdownIcon24, InboxIcon16, NumberSignIcon16 } from "@/assets";
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
      <div className="flex flex-col">
        <div className="flex pl-px">
          <Text
            overflow="truncate"
            font="reactist"
            size="12px"
            weight={600}
            height="28px"
            color={
              disabled
                ? "text-actionable-quaternary-disabled-tint"
                : "secondary"
            }
          >
            Project
          </Text>
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
            <Text
              overflow="truncate"
              font="reactist"
              size="12px"
              height="28px"
              className="group-aria-disabled:font-semibold"
            >
              {project.name}
            </Text>
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
