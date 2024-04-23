"use client";

import { initLocalSettings } from "@/constants/user";
import useLocalStorage from "@/hooks/use-local-storage";
import { LocalSettingsSchema } from "@/lib/zod";
import type { LocalSettingsType } from "@/types/user";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { createContext, useContext } from "react";

type SetStateContextType = Dispatch<SetStateAction<LocalSettingsType>>;

type ProviderProps = {
  children: ReactNode;
};

const deserializer = (value: string) => {
  try {
    const state: unknown = JSON.parse(value);
    const data = LocalSettingsSchema.parse(state);
    return { ...initLocalSettings, ...data };
  } catch {
    return initLocalSettings;
  }
};

const StateContext = createContext<LocalSettingsType | null>(null);
const SetStateContext = createContext<SetStateContextType | null>(null);

export function LocalSettingsProvider({ children }: ProviderProps) {
  const [localSettings, setLocalSettings] = useLocalStorage(
    "localSettings",
    initLocalSettings,
    { deserializer },
  );

  return (
    <StateContext.Provider value={localSettings}>
      <SetStateContext.Provider value={setLocalSettings}>
        {children}
      </SetStateContext.Provider>
    </StateContext.Provider>
  );
}

export function useLocalSettings() {
  const context = useContext(StateContext);

  if (context === null) {
    throw new Error(
      "useLocalSettings has to be used within <LocalSettingsProvider />",
    );
  }

  return context;
}

export function useSetLocalSettings() {
  const context = useContext(SetStateContext);

  if (context === null) {
    throw new Error(
      "useSetLocalSettings has to be used within <LocalSettingsProvider />",
    );
  }

  return context;
}
