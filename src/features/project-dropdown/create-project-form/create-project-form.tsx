import { createProject } from "@/actions/project";
import { useOptimisticUser } from "@/contexts/optimistic-user-context";
import {
  useDispatchOptimisticProjects,
  useOptimisticProjects,
} from "@/contexts/projects-context";
import useCombobox from "@/hooks/use-combobox";
import { ProjectSchema } from "@/lib/zod";
import { FloatingFocusManager, FloatingList } from "@floating-ui/react";
import clsx from "clsx";
import Image from "next/image";
import type { ChangeEvent, FormEvent, KeyboardEvent } from "react";
import { startTransition, useState } from "react";
import { useProjectDropdown } from "../project-dropdown";
import ProjectDropdownInput from "./project-dropdown-input";
import ProjectDropdownOption from "./project-dropdown-option";
import SubmitButton from "./submit-button";

export default function CreateProjectForm() {
  const optimisticUser = useOptimisticUser();

  const optimisticProjects = useOptimisticProjects();
  const dispatchOptimisticProjects = useDispatchOptimisticProjects();

  const { selectedProjectId, setSelectedProjectId, setIsOpen } =
    useProjectDropdown("CreateProjectForm");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState("");

  const filteredProjects = optimisticProjects
    .filter((project) => {
      return project.name
        .toLocaleLowerCase()
        .includes(name.toLocaleLowerCase());
    })
    .sort((a, b) => {
      if (a.name.length === b.name.length) {
        return a.name.localeCompare(b.name, "en", { sensitivity: "base" });
      }
      return a.name.length - b.name.length;
    });

  const {
    activeIndex,
    listRef,
    context,
    refs,
    getComboboxProps,
    getListboxProps,
    getOptionProps,
  } = useCombobox<HTMLInputElement>({
    open: filteredProjects.length > 0,
  });

  const username = optimisticUser.name ?? "";
  const initLetter = username.at(0)?.toUpperCase() ?? "";

  const handleSelect = (index: number) => {
    if (name === "") {
      const project = optimisticProjects[index];
      setSelectedProjectId(project.id);
      setIsOpen(false);
    } else if (filteredProjects.length > 0) {
      const project = filteredProjects[index];
      setSelectedProjectId(project.id);
      setIsOpen(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setIsSubmitting(true);
    startTransition(() => {
      dispatchOptimisticProjects({ type: "create", name });
    });
    const formData = new FormData();
    formData.append("name", name);
    await createProject(formData);
    setIsSubmitting(false);
  };

  const parsed = ProjectSchema.shape.name.safeParse(name);
  const isValid = parsed.success;

  return (
    <form
      onSubmit={(e) => {
        void handleSubmit(e);
      }}
      className="flex flex-col divide-y divide-divider-secondary"
    >
      <div className="p-2">
        <div
          className={clsx(
            "flex h-8 cursor-text items-center overflow-hidden rounded-[5px] border border-input-idle",
            "focus-within:border-input-focus",
          )}
        >
          <ProjectDropdownInput
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
      <FloatingList elementsRef={listRef}>
        <div
          className={clsx(
            "box-content",
            "max-h-[300px] w-full overflow-y-auto overflow-x-hidden",
          )}
          tabIndex={-1}
        >
          {name === "" ? (
            <FloatingFocusManager context={context} initialFocus={-1}>
              <div ref={refs.setFloating} {...getListboxProps()}>
                <ProjectDropdownOption
                  key={optimisticProjects[0].id}
                  activeIndex={activeIndex}
                  color={optimisticProjects[0].color}
                  getOptionProps={getOptionProps}
                  handleSelect={handleSelect}
                  indentation={0}
                  isInboxProject={optimisticProjects[0].isInboxProject}
                  name={optimisticProjects[0].name}
                  searching={name.length > 0}
                  selected={selectedProjectId === optimisticProjects[0].id}
                />
                <div className="flex items-center gap-2 py-[7px] pl-2 pr-3">
                  <span className="size-[18px] overflow-hidden rounded-full">
                    <Image
                      src={`https://d1nbslm0j6pual.cloudfront.net?text=${initLetter}&size=195&bg=ffffff`}
                      alt={username}
                      width="18"
                      height="18"
                    />
                  </span>
                  <span className="truncate text-[13px]/[16.8px] font-bold">
                    My Projects
                  </span>
                </div>
                {optimisticProjects.slice(1).map((project) => (
                  <ProjectDropdownOption
                    key={project.id}
                    activeIndex={activeIndex}
                    color={project.color}
                    getOptionProps={getOptionProps}
                    handleSelect={handleSelect}
                    indentation={1}
                    isInboxProject={project.isInboxProject}
                    name={project.name}
                    searching={name.length > 0}
                    selected={selectedProjectId === project.id}
                    disabled={project.isCreating}
                  />
                ))}
              </div>
            </FloatingFocusManager>
          ) : filteredProjects.length > 0 ? (
            <FloatingFocusManager context={context} initialFocus={-1}>
              <div ref={refs.setFloating} {...getListboxProps()}>
                {filteredProjects.map((project) => (
                  <ProjectDropdownOption
                    key={project.id}
                    activeIndex={activeIndex}
                    color={project.color}
                    getOptionProps={getOptionProps}
                    handleSelect={handleSelect}
                    indentation={0}
                    isInboxProject={project.isInboxProject}
                    name={project.name}
                    searching={name.length > 0}
                    selected={selectedProjectId === project.id}
                    disabled={project.isCreating}
                  />
                ))}
              </div>
            </FloatingFocusManager>
          ) : (
            <div className="flex flex-col">
              <div className="flex px-2 py-[7px]">
                <span className="truncate font-sans text-sm/[18.4px] text-[#555]">
                  Project not found
                </span>
              </div>
              <SubmitButton name={name} disabled={isSubmitting || !isValid} />
            </div>
          )}
        </div>
      </FloatingList>
    </form>
  );
}
