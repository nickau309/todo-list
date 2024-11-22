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
  safePolygon,
  shift,
  size,
  useClick,
  useDismiss,
  useFloating,
  useHover,
  useInteractions,
  useListNavigation,
  useRole,
  useTypeahead,
} from "@floating-ui/react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { createContext, useContext, useMemo, useRef, useState } from "react";

type MenuContextType = {
  disabled: boolean;
  setHasFocusInside: Dispatch<SetStateAction<boolean>>;
  activeIndex: number | null;
  elementsRef: UseListNavigationProps["listRef"];
  labelsRef: UseTypeaheadProps["listRef"];
} & Pick<UseFloatingData, "context" | "floatingStyles" | "refs"> &
  ReturnType<typeof useInteractions>;

type ProviderProps = {
  children: ReactNode;
  disabled?: boolean;
};

const MenuContext = createContext<MenuContextType | null>(null);

export function ResourcesMenuProvider({
  children,
  disabled = false,
}: ProviderProps) {
  const { isResourcesMenuOpen } = useSidebarState();
  const { setIsResourcesMenuOpen } = useSidebarControl();

  const [hasFocusInside, setHasFocusInside] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const elementsRef = useRef([]);
  const labelsRef = useRef([]);

  const { context, floatingStyles, refs } = useFloating({
    placement: "right-start",
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
    open: isResourcesMenuOpen,
    onOpenChange: setIsResourcesMenuOpen,
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context, {
    enabled: !disabled && !hasFocusInside,
    handleClose: safePolygon({ blockPointerEvents: true }),
  });
  const click = useClick(context, {
    enabled: !disabled,
    toggle: false,
    ignoreMouse: true,
  });
  const role = useRole(context, { role: "menu" });
  const dismiss = useDismiss(context, { bubbles: true });
  const listNavigation = useListNavigation(context, {
    listRef: elementsRef,
    activeIndex,
    onNavigate: setActiveIndex,
    loop: true,
    nested: true,
  });
  const typeahead = useTypeahead(context, {
    listRef: labelsRef,
    activeIndex,
    onMatch: isResourcesMenuOpen ? setActiveIndex : undefined,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [hover, click, role, dismiss, listNavigation, typeahead],
  );

  const value = useMemo<MenuContextType>(
    () => ({
      disabled,
      setHasFocusInside,
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
      refs,
    ],
  );

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}

export function useResourcesMenu(component: string) {
  const context = useContext(MenuContext);

  if (context === null) {
    throw new Error(
      `<${component} /> is missing a parent <ResourcesMenuProvider /> component.`,
    );
  }

  return context;
}
