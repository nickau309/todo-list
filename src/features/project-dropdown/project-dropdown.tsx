import { useDialog } from "@/lib/floating-ui";
import type {
  UseFloatingData,
  UseInteractionsReturn,
} from "@floating-ui/react";
import { autoUpdate, flip, shift, useFloating } from "@floating-ui/react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { createContext, useContext, useMemo, useState } from "react";

type DropdownContextType = {
  disabled: boolean;
  selectedProjectId: number;
  setSelectedProjectId: (projectId: number) => void;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
} & Pick<UseFloatingData, "context" | "floatingStyles" | "refs"> &
  Pick<UseInteractionsReturn, "getReferenceProps" | "getFloatingProps">;

type DropdownProps = {
  children: ReactNode;
  projectId: number;
  setProjectId: (projectId: number) => void;
  disabled?: boolean;
};

const DropdownContext = createContext<DropdownContextType | null>(null);

export default function ProjectDropdown({
  children,
  projectId: selectedProjectId,
  setProjectId: setSelectedProjectId,
  disabled = false,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { context, floatingStyles, refs } = useFloating<HTMLButtonElement>({
    middleware: [
      flip({ fallbackAxisSideDirection: "start" }),
      shift({ padding: 8 }),
    ],
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
  });

  const { getReferenceProps, getFloatingProps } = useDialog(context, {
    enabled: !disabled,
  });

  const value = useMemo<DropdownContextType>(
    () => ({
      disabled,
      selectedProjectId,
      setSelectedProjectId,
      isOpen,
      setIsOpen,
      context,
      floatingStyles,
      refs,
      getReferenceProps,
      getFloatingProps,
    }),
    [
      context,
      disabled,
      floatingStyles,
      getFloatingProps,
      getReferenceProps,
      isOpen,
      refs,
      selectedProjectId,
      setSelectedProjectId,
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
