"use client";

import type { UserType } from "@/types/user";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { createContext, useContext, useOptimistic } from "react";

type SetStateContextType = Dispatch<SetStateAction<UserType>>;

type ProviderProps = {
  children: ReactNode;
  user: UserType;
};

const StateContext = createContext<UserType | null>(null);
const SetStateContext = createContext<SetStateContextType | null>(null);

export function OptimisticUserProvider({ children, user }: ProviderProps) {
  const [optimisticUser, setOptimisticUser] = useOptimistic(
    user,
    (prevState, stateOrFn: SetStateAction<UserType>) => {
      if (stateOrFn instanceof Function) {
        return stateOrFn(prevState);
      }
      return stateOrFn;
    },
  );

  // console.log(optimisticUser);

  return (
    <StateContext.Provider value={optimisticUser}>
      <SetStateContext.Provider value={setOptimisticUser}>
        {children}
      </SetStateContext.Provider>
    </StateContext.Provider>
  );
}

export function useOptimisticUser() {
  const context = useContext(StateContext);

  if (context === null) {
    throw new Error(
      "useOptimisticUser has to be used within <OptimisticUserProvider />",
    );
  }

  return context;
}

export function useSetOptimisticUser() {
  const context = useContext(SetStateContext);

  if (context === null) {
    throw new Error(
      "useSetOptimisticUser has to be used within <OptimisticUserProvider />",
    );
  }

  return context;
}
