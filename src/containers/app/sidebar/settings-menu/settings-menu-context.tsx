import { useSidebarControl, useSidebarState } from "@/contexts/sidebar-context";
import type {
  UseFloatingData,
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
import type { ReactNode } from "react";
import { createContext, useContext, useMemo, useRef, useState } from "react";

type MenuContextType = {
  activeIndex: number | null;
  elementsRef: UseListNavigationProps["listRef"];
  labelsRef: UseTypeaheadProps["listRef"];
} & Pick<UseFloatingData, "context" | "floatingStyles" | "refs"> &
  ReturnType<typeof useInteractions>;

type ProviderProps = {
  children: ReactNode;
};

const MenuContext = createContext<MenuContextType | null>(null);

export function SettingsMenuProvider({ children }: ProviderProps) {
  const { isSettingsMenuOpen } = useSidebarState();
  const { setIsSettingsMenuOpen } = useSidebarControl();

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const elementsRef = useRef([]);
  const labelsRef = useRef([]);

  const { context, floatingStyles, refs } = useFloating({
    placement: "bottom-start",
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
    open: isSettingsMenuOpen,
    onOpenChange: setIsSettingsMenuOpen,
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const role = useRole(context, { role: "menu" });
  const dismiss = useDismiss(context, { outsidePressEvent: "mousedown" });
  const listNavigation = useListNavigation(context, {
    listRef: elementsRef,
    activeIndex,
    onNavigate: setActiveIndex,
    loop: true,
  });
  const typeahead = useTypeahead(context, {
    listRef: labelsRef,
    activeIndex,
    onMatch: isSettingsMenuOpen ? setActiveIndex : undefined,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [click, role, dismiss, listNavigation, typeahead],
  );

  const value = useMemo<MenuContextType>(
    () => ({
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
      floatingStyles,
      getFloatingProps,
      getItemProps,
      getReferenceProps,
      refs,
    ],
  );

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}

export function useSettingsMenu(component: string) {
  const context = useContext(MenuContext);

  if (context === null) {
    throw new Error(
      `<${component} /> is missing a parent <SettingsMenuProvider /> component.`,
    );
  }

  return context;
}
