import type { LabelType } from "@/types/label";
import type {
  UseFloatingData,
  UseInteractionsReturn,
  UseListNavigationProps,
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
} from "@floating-ui/react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { CreateLabelFormProvider } from "./context/create-label-form-context";

type DropdownContextType = {
  disabled: boolean;
  selectedLabels: LabelType[];
  toggleSelectedLabel: (label: LabelType) => void;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  activeIndex: number | null;
  setActiveIndex: Dispatch<SetStateAction<number | null>>;
  listRef: UseListNavigationProps["listRef"];
} & Pick<UseFloatingData, "context" | "floatingStyles" | "refs"> &
  Pick<UseInteractionsReturn, "getReferenceProps" | "getFloatingProps"> & {
    getInputProps: UseInteractionsReturn["getReferenceProps"];
    getListboxProps: UseInteractionsReturn["getFloatingProps"];
    getListboxItemProps: UseInteractionsReturn["getItemProps"];
  };

type DropdownProps = {
  children: ReactNode;
  disabled?: boolean;
  labels: LabelType[];
  toggleLabel: (label: LabelType) => void;
};

const DropdownContext = createContext<DropdownContextType | null>(null);

export default function LabelsDropdown({
  children,
  disabled = false,
  labels: selectedLabels,
  toggleLabel: toggleSelectedLabel,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const listRef: UseListNavigationProps["listRef"] = useRef([]);

  const onOpenChange = useCallback((open: boolean) => {
    setIsOpen(open);
    setActiveIndex(null);
  }, []);

  const { context, floatingStyles, refs } = useFloating<HTMLButtonElement>({
    middleware: [
      shift({ padding: 8 }),
      flip({
        fallbackAxisSideDirection: "start",
        fallbackStrategy: "initialPlacement",
      }),
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

  const listNavigation = useListNavigation(context, {
    listRef,
    activeIndex,
    onNavigate: isOpen ? setActiveIndex : undefined,
    loop: true,
    virtual: true,
  });

  const {
    getReferenceProps: getInputProps,
    getFloatingProps: getListboxProps,
    getItemProps: getListboxItemProps,
  } = useInteractions([listNavigation]);

  const value = useMemo<DropdownContextType>(
    () => ({
      disabled,
      selectedLabels,
      toggleSelectedLabel,
      isOpen,
      setIsOpen,
      activeIndex,
      setActiveIndex,
      listRef,
      context,
      floatingStyles,
      refs,
      getReferenceProps,
      getFloatingProps,
      getInputProps,
      getListboxProps,
      getListboxItemProps,
    }),
    [
      activeIndex,
      context,
      disabled,
      floatingStyles,
      getFloatingProps,
      getInputProps,
      getListboxItemProps,
      getListboxProps,
      getReferenceProps,
      isOpen,
      refs,
      selectedLabels,
      toggleSelectedLabel,
    ],
  );

  return (
    <CreateLabelFormProvider>
      <DropdownContext.Provider value={value}>
        {children}
      </DropdownContext.Provider>
    </CreateLabelFormProvider>
  );
}

export function useLabelsDropdown(component: string) {
  const context = useContext(DropdownContext);

  if (context === null) {
    throw new Error(
      `<${component} /> is missing a parent <LabelsDropdown /> component.`,
    );
  }

  return context;
}
