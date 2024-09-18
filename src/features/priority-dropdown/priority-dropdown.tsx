import type { PriorityItemType } from "@/types/task";
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
  disabled: boolean;
  selectedItem: PriorityItemType;
  setSelectedItem: (item: PriorityItemType) => void;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  activeIndex: number | null;
  elementsRef: UseListNavigationProps["listRef"];
  labelsRef: UseTypeaheadProps["listRef"];
} & Pick<UseFloatingData, "context" | "floatingStyles" | "refs"> &
  UseInteractionsReturn;

type DropdownProps = {
  children: ReactNode;
  disabled?: boolean;
  item: PriorityItemType;
  setItem: (item: PriorityItemType) => void;
};

const DropdownContext = createContext<DropdownContextType | null>(null);

export default function PriorityDropdown({
  children,
  disabled = false,
  item: selectedItem,
  setItem: setSelectedItem,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const elementsRef: UseListNavigationProps["listRef"] = useRef([]);
  const labelsRef: UseTypeaheadProps["listRef"] = useRef([]);

  const { context, floatingStyles, refs } = useFloating<HTMLButtonElement>({
    middleware: [
      flip({ fallbackAxisSideDirection: "start" }),
      shift({ padding: 8 }),
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

  const contextValue = useMemo(
    () => ({
      disabled,
      selectedItem,
      setSelectedItem,
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
      selectedItem,
      setSelectedItem,
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
