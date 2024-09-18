import { useOptimisticUser } from "@/contexts/optimistic-user-context";
import type {
  CreateProjectFormType,
  ProjectPreviewType,
} from "@/types/project";
import Image from "next/image";
import { useWatch } from "react-hook-form";
import ProjectDropdownOption from "./project-dropdown-option";
import { useProjectDropdownPanel } from "./project-dropdown-panel";
import SubmitButton from "./submit-button";

type OptionsProps = {
  filteredProjects: ProjectPreviewType[];
};

export default function ProjectDropdownOptions({
  filteredProjects,
}: OptionsProps) {
  const { name, projects } = useOptimisticUser();

  const query = useWatch<CreateProjectFormType>({
    name: "name",
    defaultValue: "",
  });

  const { id, getFloatingProps } = useProjectDropdownPanel(
    "ProjectDropdownOptions",
  );

  if (query === "") {
    const initLetter = name?.at(0)?.toUpperCase() ?? "";

    return (
      <div
        id={id}
        role="listbox"
        className="box-content flex max-h-[300px] flex-col overflow-y-auto overflow-x-hidden"
        {...getFloatingProps()}
      >
        <ProjectDropdownOption key={projects[0].id} project={projects[0]} />
        <div className="flex items-center gap-2 py-[7px] pl-2 pr-3">
          <span className="size-[18px] overflow-hidden rounded-full">
            <Image
              src={`https://d1nbslm0j6pual.cloudfront.net?text=${initLetter}&size=195&bg=ffffff`}
              alt={name ?? ""}
              width="18"
              height="18"
            />
          </span>
          <span className="truncate text-[13px]/[16.8px] font-bold">
            My Projects
          </span>
        </div>
        {projects.slice(1).map((project) => (
          <ProjectDropdownOption key={project.id} project={project} />
        ))}
      </div>
    );
  }

  if (filteredProjects.length > 0) {
    return (
      <div
        id={id}
        role="listbox"
        className="box-content flex max-h-[300px] flex-col overflow-y-auto overflow-x-hidden"
        {...getFloatingProps()}
      >
        {filteredProjects.map((project) => (
          <ProjectDropdownOption key={project.id} project={project} />
        ))}
      </div>
    );
  }

  return (
    <div className="box-content flex max-h-[300px] flex-col overflow-y-auto overflow-x-hidden">
      <div className="px-2 py-[7px] font-sans text-sm/[18.4px] text-[#555]">
        Project not found
      </div>
      <SubmitButton />
    </div>
  );
}
