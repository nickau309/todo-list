"use client";

import {
  FloatingFocusManager,
  FloatingList,
  FloatingNode,
  FloatingOverlay,
  FloatingPortal,
  FloatingTree,
  UseFloatingData,
  UseListNavigationProps,
  UseTypeaheadProps,
  autoUpdate,
  flip,
  limitShift,
  offset,
  safePolygon,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useFloatingNodeId,
  useFloatingParentNodeId,
  useFloatingTree,
  useHover,
  useInteractions,
  useListItem,
  useListNavigation,
  useMergeRefs,
  useRole,
  useTypeahead,
} from "@floating-ui/react";
import {
  ComponentPropsWithoutRef,
  Dispatch,
  ElementType,
  FocusEvent,
  MouseEvent,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type MenuContextType = {
  isOpen: boolean;
  setHasFocusInside: Dispatch<SetStateAction<boolean>>;
  activeIndex: number | null;
  elementsRef: UseListNavigationProps["listRef"];
  labelsRef: UseTypeaheadProps["listRef"];
  parent: MenuContextType | null;
  nodeId: string;
  isNested: boolean;
} & Pick<UseFloatingData, "context" | "floatingStyles" | "refs"> &
  ReturnType<typeof useInteractions>;

const MenuContext = createContext<MenuContextType | null>(null);

function useMenuContext(component: string) {
  const context = useContext(MenuContext);

  if (context === null) {
    throw new Error(`<${component} /> is missing a parent <Menu /> component.`);
  }

  return context;
}

function useParentMenuContext() {
  return useContext(MenuContext);
}

function MenuContextProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasFocusInside, setHasFocusInside] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const elementsRef: UseListNavigationProps["listRef"] = useRef([]);
  const labelsRef: UseTypeaheadProps["listRef"] = useRef([]);

  const parent = useParentMenuContext();

  const nodeId = useFloatingNodeId();
  const parentId = useFloatingParentNodeId();
  const tree = useFloatingTree();

  const isNested = parentId !== null;

  const { context, floatingStyles, refs } = useFloating<HTMLButtonElement>({
    placement: isNested ? "right-start" : "bottom-start",
    middleware: [
      offset({ mainAxis: 4 }),
      flip(),
      shift({ limiter: limitShift() }),
    ],
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    nodeId,
  });

  const hover = useHover(context, {
    enabled: isNested && !hasFocusInside,
    handleClose: safePolygon({ blockPointerEvents: true }),
  });
  const click = useClick(context, {
    toggle: !isNested,
    ignoreMouse: isNested,
  });
  const role = useRole(context, { role: "menu" });
  const dismiss = useDismiss(context, { bubbles: true });
  const listNavigation = useListNavigation(context, {
    listRef: elementsRef,
    activeIndex,
    onNavigate: setActiveIndex,
    loop: true,
    nested: isNested,
  });
  const typeahead = useTypeahead(context, {
    listRef: labelsRef,
    activeIndex,
    onMatch: isOpen ? setActiveIndex : undefined,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [hover, click, role, dismiss, listNavigation, typeahead],
  );

  useEffect(() => {
    if (!tree) {
      return;
    }

    const handleTreeClick = () => {
      setIsOpen(false);
    };

    const onSubMenuOpen = (event: { nodeId: string; parentId: string }) => {
      if (event.nodeId !== nodeId && event.parentId === parentId) {
        setIsOpen(false);
      }
    };

    const onParentMenuFocus = (event: { parentId: string }) => {
      if (event.parentId === parentId) {
        setIsOpen(false);
      }
    };

    tree.events.on("click", handleTreeClick);
    tree.events.on("menuopen", onSubMenuOpen);
    tree.events.on("parentmenufocus", onParentMenuFocus);

    return () => {
      tree.events.off("click", handleTreeClick);
      tree.events.off("menuopen", onSubMenuOpen);
      tree.events.off("parentmenufocus", onParentMenuFocus);
    };
  }, [nodeId, parentId, tree]);

  useEffect(() => {
    if (isOpen && tree) {
      tree.events.emit("menuopen", { nodeId, parentId });
    }
  }, [isOpen, nodeId, parentId, tree]);

  const value = useMemo(
    () => ({
      isOpen,
      setHasFocusInside,
      activeIndex,
      elementsRef,
      labelsRef,
      parent,
      nodeId,
      isNested,
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
      isNested,
      isOpen,
      nodeId,
      parent,
      refs,
    ],
  );

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}

function MenuRoot(props: { children: ReactNode }) {
  const parentId = useFloatingParentNodeId();

  if (parentId === null) {
    return (
      <FloatingTree>
        <MenuContextProvider {...props} />
      </FloatingTree>
    );
  }

  return <MenuContextProvider {...props} />;
}

type MenuButtonProps = {
  label?: string;
} & ComponentPropsWithoutRef<"button">;

function MenuButton({ label, ...props }: MenuButtonProps) {
  const { setHasFocusInside, parent, refs, getReferenceProps } =
    useMenuContext("Menu.Button");
  const item = useListItem({ label });

  const isNested = !!parent;

  const ref = useMergeRefs([refs.setReference, item.ref]);

  return (
    <button
      ref={ref}
      tabIndex={
        !isNested ? undefined : parent.activeIndex === item.index ? 0 : -1
      }
      {...getReferenceProps(
        parent?.getItemProps({
          ...props,
          onFocus(e: FocusEvent<HTMLButtonElement>) {
            props.onFocus?.(e);
            setHasFocusInside(false);
            parent.setHasFocusInside(true);
          },
        }) ?? props,
      )}
    />
  );
}

function MenuItems({ style = {}, ...props }: ComponentPropsWithoutRef<"div">) {
  const {
    isOpen,
    activeIndex,
    elementsRef,
    labelsRef,
    nodeId,
    isNested,
    context,
    floatingStyles,
    refs,
    getFloatingProps,
  } = useMenuContext("Menu.Items");

  return (
    <FloatingNode id={nodeId}>
      <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
        {isOpen && (
          <FloatingPortal id="root">
            {isNested || <FloatingOverlay lockScroll className="z-20" />}
            <FloatingFocusManager
              context={context}
              initialFocus={isNested ? -1 : 0}
              returnFocus={!isNested}
              visuallyHiddenDismiss
            >
              <div
                ref={refs.setFloating}
                style={Object.assign(style, floatingStyles)}
                {...getFloatingProps(props)}
              />
            </FloatingFocusManager>
          </FloatingPortal>
        )}
      </FloatingList>
    </FloatingNode>
  );
}

type MenuItemOwnProps<E extends ElementType = ElementType> = {
  as?: E;
  label?: string;
};

type MenuItemProps<E extends ElementType = ElementType> = MenuItemOwnProps<E> &
  Omit<ComponentPropsWithoutRef<E>, keyof MenuItemOwnProps<E>>;

function MenuItem<E extends ElementType = "button">({
  as,
  label,
  ...props
}: MenuItemProps<E>) {
  const { setHasFocusInside, activeIndex, nodeId, getItemProps } =
    useMenuContext("Menu.Item");
  const { ref, index } = useListItem({ label });
  const tree = useFloatingTree();

  const Component = as ?? "button";

  return (
    <Component
      ref={ref}
      {...props}
      role="menuitem"
      tabIndex={activeIndex === index ? 0 : -1}
      {...getItemProps({
        onClick(e: MouseEvent<HTMLButtonElement>) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          props.onClick?.(e);
          tree?.events.emit("click");
        },
        onFocus(e: FocusEvent<HTMLButtonElement>) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          props.onFocus?.(e);
          setHasFocusInside(true);
          tree?.events.emit("parentmenufocus", { parentId: nodeId });
        },
      })}
    />
  );
}

const Menu = Object.assign(MenuRoot, {
  Button: MenuButton,
  Items: MenuItems,
  Item: MenuItem,
});

export default Menu;
