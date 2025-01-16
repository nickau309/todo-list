import type {
  UseFloatingData,
  UseInteractionsReturn,
  UseListNavigationProps,
  UseTypeaheadProps,
} from "@floating-ui/react";
import {
  autoUpdate,
  flip,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
  useTypeahead,
} from "@floating-ui/react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { createContext, useContext, useMemo, useRef, useState } from "react";

type DropdownContextType = {
  selectedPriority: number;
  setSelectedPriority: (priority: number) => void;
  disabled: boolean;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  activeIndex: number | null;
  elementsRef: UseListNavigationProps["listRef"];
  labelsRef: UseTypeaheadProps["listRef"];
} & Pick<UseFloatingData, "context" | "floatingStyles" | "refs"> &
  UseInteractionsReturn;

type DropdownProps = {
  children: ReactNode;
  priority: number;
  setPriority: (priority: number) => void;
  disabled?: boolean;
};

const DropdownContext = createContext<DropdownContextType | null>(null);

export default function PriorityDropdown({
  children,
  priority: selectedPriority,
  setPriority: setSelectedPriority,
  disabled = false,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const elementsRef: UseListNavigationProps["listRef"] = useRef([]);
  const labelsRef: UseTypeaheadProps["listRef"] = useRef([]);

  const { context, floatingStyles, refs } = useFloating({
    middleware: [
      flip({ fallbackAxisSideDirection: "start" }),
      shift({ padding: 16 }),
    ],
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context, { enabled: !disabled });
  const role = useRole(context, { role: "listbox" });
  const dismiss = useDismiss(context, { outsidePressEvent: "mousedown" });
  const listNavigation = useListNavigation(context, {
    listRef: elementsRef,
    activeIndex,
    onNavigate: isOpen ? setActiveIndex : undefined,
    loop: true,
    virtual: true,
  });
  const typeahead = useTypeahead(context, {
    listRef: labelsRef,
    activeIndex,
    onMatch: isOpen ? setActiveIndex : undefined,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [click, role, dismiss, listNavigation, typeahead],
  );

  const contextValue = useMemo<DropdownContextType>(
    () => ({
      selectedPriority,
      setSelectedPriority,
      disabled,
      isOpen,
      setIsOpen,
      activeIndex,
      elementsRef,
      labelsRef,
      context,
      floatingStyles,
      refs,
      getReferenceProps,
      getFloatingProps,
      getItemProps,
    }),
    [
      activeIndex,
      context,
      disabled,
      floatingStyles,
      getFloatingProps,
      getItemProps,
      getReferenceProps,
      isOpen,
      refs,
      selectedPriority,
      setSelectedPriority,
    ],
  );

  return (
    <DropdownContext.Provider value={contextValue}>
      {children}
    </DropdownContext.Provider>
  );
}

export function usePriorityDropdown(component: string) {
  const context = useContext(DropdownContext);

  if (context === null) {
    throw new Error(
      `<${component} /> is missing a parent <PriorityDropdown /> component.`,
    );
  }

  return context;
}
