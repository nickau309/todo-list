"use client";

import useBeforeUnload from "@/hooks/use-before-unload";
import type { SettingsType } from "@/types/settings";
import type { UserType } from "@/types/user";
import equal from "fast-deep-equal";
import type { Route } from "next";
import { usePathname, useRouter } from "next/navigation";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useOptimistic,
  useState,
} from "react";

type StateContextType = {
  inputValues: SettingsType;
  isOpen: boolean;
  nextHref: Route | null;
  optimisticSettings: SettingsType;
  prevHref: Route;
  showNavMenu: boolean;
};

type ControlContextType = {
  setInputValues: Dispatch<SetStateAction<SettingsType>>;
  setIsOpen: (open: boolean) => void;
  setNextHref: Dispatch<SetStateAction<Route | null>>;
  setOptimisticSettings: Dispatch<SetStateAction<SettingsType>>;
  setPrevHref: Dispatch<SetStateAction<Route>>;
  setShowNavMenu: Dispatch<SetStateAction<boolean>>;
};

type ProviderProps = {
  children: ReactNode;
  user: UserType;
};

const StateContext = createContext<StateContextType | null>(null);
const ControlContext = createContext<ControlContextType | null>(null);

export function SettingsDialogProvider({ children, user }: ProviderProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [prevHref, setPrevHref] = useState<Route>("/app/today");
  const [nextHref, setNextHref] = useState<Route | null>(null);

  const settings = useMemo<SettingsType>(
    () => ({
      "confirm-email": "",
      "confirm-password": "",
      email: "",
      name: user.name,
      "new-email": "",
      "new-password": "",
      password: "",
      reason: "",
      theme: user.theme,
    }),
    [user.name, user.theme],
  );

  const [optimisticSettings, setOptimisticSettings] = useOptimistic<
    SettingsType,
    SetStateAction<SettingsType>
  >(settings, (prevState, stateOrFn) => {
    if (stateOrFn instanceof Function) {
      return stateOrFn(prevState);
    }
    return stateOrFn;
  });

  const [inputValues, setInputValues] = useState(settings);

  const [showNavMenu, setShowNavMenu] = useState(false);

  useBeforeUnload(!equal(optimisticSettings, inputValues));

  const isOpen = pathname.startsWith("/app/settings");
  const setIsOpen = useCallback(
    (open: boolean) => {
      if (!open) {
        if (!equal(optimisticSettings, inputValues)) {
          setNextHref(prevHref);
        } else {
          router.push(prevHref);
        }
      }
    },
    [inputValues, optimisticSettings, prevHref, router],
  );

  console.log({
    isOpen,
    inputValues,
    optimisticSettings,
    nextHref,
  });

  const state = useMemo<StateContextType>(
    () => ({
      inputValues,
      isOpen,
      nextHref,
      optimisticSettings,
      prevHref,
      showNavMenu,
    }),
    [inputValues, isOpen, nextHref, optimisticSettings, prevHref, showNavMenu],
  );

  const control = useMemo<ControlContextType>(
    () => ({
      setInputValues,
      setIsOpen,
      setNextHref,
      setOptimisticSettings,
      setPrevHref,
      setShowNavMenu,
    }),
    [setIsOpen, setOptimisticSettings],
  );

  return (
    <StateContext.Provider value={state}>
      <ControlContext.Provider value={control}>
        {children}
      </ControlContext.Provider>
    </StateContext.Provider>
  );
}

export function useSettingsDialogState() {
  const context = useContext(StateContext);

  if (context === null) {
    throw new Error(
      "useSettingsDialogState has to be used within <SettingsDialogProvider />",
    );
  }

  return context;
}

export function useSettingsDialogControl() {
  const context = useContext(ControlContext);

  if (context === null) {
    throw new Error(
      "useSettingsDialogControl has to be used within <SettingsDialogProvider />",
    );
  }

  return context;
}
