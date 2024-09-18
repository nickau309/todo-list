import { useOptimisticUser } from "@/contexts/optimistic-user-context";
import { CreateProjectSchema } from "@/lib/zod";
import type {
  UseInteractionsReturn,
  UseListNavigationProps,
} from "@floating-ui/react";
import {
  FloatingFocusManager,
  FloatingList,
  FloatingOverlay,
  FloatingPortal,
  useInteractions,
  useListNavigation,
} from "@floating-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { createContext, useContext, useId, useMemo, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import CreateProjectForm from "./create-project-form";
import { useProjectDropdown } from "./project-dropdown";
import ProjectDropdownInput from "./project-dropdown-input";
import ProjectDropdownOptions from "./project-dropdown-options";
import ResetAfterSubmission from "./reset-after-submission";

type PanelContextType = {
  id: string;
} & UseInteractionsReturn;

const PanelContext = createContext<PanelContextType | null>(null);

export default function ProjectDropdownPanel() {
  const id = useId();

  const listRef: UseListNavigationProps["listRef"] = useRef([]);

  const {
    isOpen,
    activeIndex,
    setActiveIndex,
    context,
    floatingStyles,
    refs,
    getFloatingProps,
  } = useProjectDropdown("ProjectDropdownPanel");

  const listNavigation = useListNavigation(context, {
    listRef,
    activeIndex,
    onNavigate: isOpen ? setActiveIndex : undefined,
    loop: true,
    virtual: true,
  });

  const interactionsReturn = useInteractions([listNavigation]);

  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
    },
    shouldUnregister: true,
    resolver: zodResolver(CreateProjectSchema),
  });

  const { projects } = useOptimisticUser();

  const query = methods.watch("name", "");

  const filteredProjects = useMemo(() => {
    return projects
      .filter((project) =>
        project.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
      )
      .sort((a, b) => {
        if (a.name.length === b.name.length) {
          return a.name.localeCompare(b.name, "en", { sensitivity: "base" });
        }
        return a.name.length - b.name.length;
      });
  }, [projects, query]);

  const value = useMemo(
    () => ({ id, ...interactionsReturn }),
    [id, interactionsReturn],
  );

  return (
    <PanelContext.Provider value={value}>
      <FloatingList elementsRef={listRef}>
        <FormProvider {...methods}>
          <ResetAfterSubmission />
          {isOpen && (
            <FloatingPortal id="root">
              <FloatingOverlay lockScroll className="z-40">
                <FloatingFocusManager context={context}>
                  <div
                    ref={refs.setFloating}
                    style={floatingStyles}
                    className={clsx(
                      "box-content flex w-[300px] flex-col overflow-hidden rounded-[10px]",
                      "border border-dropdown bg-dropdown text-dropdown shadow-dropdown",
                      "focus-visible:outline-none",
                    )}
                    {...getFloatingProps()}
                  >
                    <CreateProjectForm>
                      <div className="p-2">
                        <div
                          className={clsx(
                            "flex h-8 cursor-text items-center overflow-hidden rounded-[5px] border border-input-idle",
                            "focus-within:border-input-focus",
                          )}
                        >
                          <ProjectDropdownInput
                            filteredProjects={filteredProjects}
                          />
                        </div>
                      </div>
                      <ProjectDropdownOptions
                        filteredProjects={filteredProjects}
                      />
                    </CreateProjectForm>
                  </div>
                </FloatingFocusManager>
              </FloatingOverlay>
            </FloatingPortal>
          )}
        </FormProvider>
      </FloatingList>
    </PanelContext.Provider>
  );
}

export function useProjectDropdownPanel(component: string) {
  const context = useContext(PanelContext);

  if (context === null) {
    throw new Error(
      `<${component} /> is missing a parent <ProjectDropdownPanel /> component.`,
    );
  }

  return context;
}
