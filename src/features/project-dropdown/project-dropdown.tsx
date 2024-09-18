import type { ProjectPreviewType } from "@/types/project";
import type {
  UseFloatingData,
  UseInteractionsReturn,
} from "@floating-ui/react";
import {
  autoUpdate,
  flip,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type DropdownContextType = {
  disabled: boolean;
  selectedProject: ProjectPreviewType;
  setSelectedProject: (project: ProjectPreviewType) => void;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  activeIndex: number | null;
  setActiveIndex: Dispatch<SetStateAction<number | null>>;
} & Pick<UseFloatingData, "context" | "floatingStyles" | "refs"> &
  Pick<UseInteractionsReturn, "getReferenceProps" | "getFloatingProps">;

type DropdownProps = {
  children: ReactNode;
  disabled?: boolean;
  project: ProjectPreviewType;
  setProject: (project: ProjectPreviewType) => void;
};

const DropdownContext = createContext<DropdownContextType | null>(null);

export default function ProjectDropdown({
  children,
  disabled = false,
  project: selectedProject,
  setProject: setSelectedProject,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const onOpenChange = useCallback((open: boolean) => {
    setIsOpen(open);
    setActiveIndex(null);
  }, []);

  const { context, floatingStyles, refs } = useFloating<HTMLButtonElement>({
    middleware: [
      flip({ fallbackAxisSideDirection: "start" }),
      shift({ padding: 8 }),
    ],
    open: isOpen,
    onOpenChange,
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context, { enabled: !disabled });
  const role = useRole(context);
  const dismiss = useDismiss(context, { outsidePressEvent: "mousedown" });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    role,
    dismiss,
  ]);

  const value = useMemo(
    () => ({
      disabled,
      selectedProject,
      setSelectedProject,
      isOpen,
      setIsOpen,
      activeIndex,
      setActiveIndex,
      context,
      floatingStyles,
      refs,
      getReferenceProps,
      getFloatingProps,
    }),
    [
      activeIndex,
      context,
      disabled,
      floatingStyles,
      getFloatingProps,
      getReferenceProps,
      isOpen,
      refs,
      selectedProject,
      setSelectedProject,
    ],
  );

  return (
    <DropdownContext.Provider value={value}>
      {children}
    </DropdownContext.Provider>
  );
}

export function useProjectDropdown(component: string) {
  const context = useContext(DropdownContext);

  if (context === null) {
    throw new Error(
      `<${component} /> is missing a parent <ProjectDropdown /> component.`,
    );
  }

  return context;
}
