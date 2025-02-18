"use client";

import { useProjects } from "@/contexts/projects-context";
import type {
  UseFloatingData,
  UseInteractionsReturn,
  UseListNavigationProps,
  UseTypeaheadProps,
} from "@floating-ui/react";
import {
  autoUpdate,
  flip,
  offset,
  shift,
  size,
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
import { useOptimisticTask } from "../../contexts/optimistic-task-context";

type MenuContextType = {
  disabled: boolean;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  activeIndex: number | null;
  disabledIndices: number[];
  elementsRef: UseListNavigationProps["listRef"];
  labelsRef: UseTypeaheadProps["listRef"];
} & Pick<UseFloatingData, "context" | "floatingStyles" | "refs"> &
  UseInteractionsReturn;

type MenuProps = {
  children: ReactNode;
  disabled?: boolean;
};

const MenuContext = createContext<MenuContextType | null>(null);

const disabledIndicesWhenProjectIsArchived = [0, 1];

const disabledIndicesWhenProjectIsNotArchived = [1, 2, 3, 4];

export default function MoreActionMenu({
  children,
  disabled = false,
}: MenuProps) {
  const projects = useProjects();

  const { projectId } = useOptimisticTask();

  const project =
    projects.find((project) => project.id === projectId) ?? projects[0];
  const { isArchived } = project;

  const disabledIndices = isArchived
    ? disabledIndicesWhenProjectIsArchived
    : disabledIndicesWhenProjectIsNotArchived;

  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const elementsRef: UseListNavigationProps["listRef"] = useRef([]);
  const labelsRef: UseTypeaheadProps["listRef"] = useRef([]);

  const { context, floatingStyles, refs } = useFloating<HTMLButtonElement>({
    placement: "bottom-end",
    middleware: [
      offset({ mainAxis: 4 }),
      flip(),
      shift({ padding: 4 }),
      size({
        apply({ availableHeight, elements }) {
          Object.assign(elements.floating.style, {
            maxHeight: `${availableHeight}px`,
          });
        },
      }),
    ],
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context, { enabled: !disabled });
  const role = useRole(context, { role: "menu" });
  const dismiss = useDismiss(context, { outsidePressEvent: "mousedown" });
  const listNavigation = useListNavigation(context, {
    listRef: elementsRef,
    activeIndex,
    onNavigate: setActiveIndex,
    loop: true,
    disabledIndices,
  });
  const typeahead = useTypeahead(context, {
    listRef: labelsRef,
    activeIndex,
    onMatch: isOpen ? setActiveIndex : undefined,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [click, role, dismiss, listNavigation, typeahead],
  );

  const value = useMemo<MenuContextType>(
    () => ({
      disabled,
      isOpen,
      setIsOpen,
      activeIndex,
      disabledIndices,
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
      disabledIndices,
      floatingStyles,
      getFloatingProps,
      getItemProps,
      getReferenceProps,
      isOpen,
      refs,
    ],
  );

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}

export function useMoreActionMenu(component: string) {
  const context = useContext(MenuContext);

  if (context === null) {
    throw new Error(
      `<${component} /> is missing a parent <MoreActionMenu /> component.`,
    );
  }

  return context;
}
