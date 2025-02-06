import type {
  ReferenceType,
  UseFloatingOptions,
  UseInteractionsReturn,
  UseListNavigationProps,
} from "@floating-ui/react";
import {
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
} from "@floating-ui/react";
import { useCallback, useMemo, useRef, useState } from "react";

export default function useCombobox<RT extends ReferenceType = ReferenceType>(
  options?: UseFloatingOptions,
) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const listRef: UseListNavigationProps["listRef"] = useRef([]);

  const { context, refs } = useFloating<RT>(options);

  const role = useRole(context, { role: "listbox" });
  const listNavigation = useListNavigation(context, {
    listRef,
    activeIndex,
    onNavigate: setActiveIndex,
    loop: true,
    virtual: true,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [role, listNavigation],
  );

  const getComboboxProps = useCallback<
    UseInteractionsReturn["getReferenceProps"]
  >(
    ({ onChange, ...props } = {}) => {
      return getReferenceProps({
        onChange(e) {
          setActiveIndex(null);
          onChange?.(e);
        },
        ...props,
      });
    },
    [getReferenceProps],
  );

  const getOptionProps = useCallback(
    (props: Omit<React.HTMLProps<HTMLElement>, "selected" | "active">) => {
      return getItemProps(props);
    },
    [getItemProps],
  );

  const value = useMemo(
    () => ({
      activeIndex,
      listRef,
      context,
      refs,
      getComboboxProps,
      getListboxProps: getFloatingProps,
      getOptionProps,
    }),
    [
      activeIndex,
      context,
      getComboboxProps,
      getFloatingProps,
      getOptionProps,
      refs,
    ],
  );

  return value;
}
