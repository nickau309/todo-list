import { useDialog } from "@/lib/floating-ui";
import type {
  UseFloatingData,
  UseInteractionsReturn,
  UseListNavigationProps,
} from "@floating-ui/react";
import { autoUpdate, flip, shift, useFloating } from "@floating-ui/react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { createContext, useContext, useMemo, useRef, useState } from "react";

type DropdownContextType = {
  disabled: boolean;
  selectedLabelIds: number[];
  setSelectedLabelIds: (labelIds: number[]) => void;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  listRef: UseListNavigationProps["listRef"];
} & Pick<UseFloatingData, "context" | "floatingStyles" | "refs"> &
  Pick<UseInteractionsReturn, "getReferenceProps" | "getFloatingProps">;

type DropdownProps = {
  children: ReactNode;
  labelIds: number[];
  setLabelIds: (labelIds: number[]) => void;
  disabled?: boolean;
};

const DropdownContext = createContext<DropdownContextType | null>(null);

export default function LabelsDropdown({
  children,
  labelIds: selectedLabelIds,
  setLabelIds: setSelectedLabelIds,
  disabled = false,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const listRef: UseListNavigationProps["listRef"] = useRef([]);

  const { context, floatingStyles, refs } = useFloating<HTMLButtonElement>({
    middleware: [
      shift({ padding: 8 }),
      flip({
        fallbackAxisSideDirection: "start",
        fallbackStrategy: "initialPlacement",
      }),
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
      selectedLabelIds,
      setSelectedLabelIds,
      isOpen,
      setIsOpen,
      listRef,
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
      selectedLabelIds,
      setSelectedLabelIds,
    ],
  );

  return (
    <DropdownContext.Provider value={value}>
      {children}
    </DropdownContext.Provider>
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
