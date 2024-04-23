import type { Dispatch, SetStateAction } from "react";
import { useCallback, useMemo, useSyncExternalStore } from "react";

type OptionsType<T> = {
  serializer?: (value: T) => string;
  deserializer?: (value: string) => T;
};

function getInitialState<T>(initialState: T | (() => T)) {
  return initialState instanceof Function ? initialState() : initialState;
}

function setItem(key: string, newValue: string) {
  window.localStorage.setItem(key, newValue);
  window.dispatchEvent(new StorageEvent("storage", { key, newValue }));
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("storage", callback);
  };
}

export default function useLocalStorage<T>(
  key: string,
  initialState: T | (() => T),
  options?: OptionsType<T>,
): [T, Dispatch<SetStateAction<T>>] {
  const deserializer = useMemo(
    () => options?.deserializer ?? (JSON.parse as (value: string) => T),
    [options?.deserializer],
  );

  const serializer = useMemo(
    () => options?.serializer ?? (JSON.stringify as (value: T) => string),
    [options?.serializer],
  );

  const value = useSyncExternalStore(
    subscribe,
    () => {
      let value = window.localStorage.getItem(key);
      if (value === null) {
        const state = getInitialState(initialState);
        value = serializer(state);
        window.localStorage.setItem(key, value);
      }
      return value;
    },
    () => null,
  );

  const state = useMemo(
    () => (value !== null ? deserializer(value) : value),
    [deserializer, value],
  );

  const setState: Dispatch<SetStateAction<T>> = useCallback(
    (stateOrFn) => {
      if (stateOrFn instanceof Function) {
        const item = window.localStorage.getItem(key);
        if (item !== null) {
          const prevState = deserializer(item);
          const state = stateOrFn(prevState);
          const value = serializer(state);
          setItem(key, value);
        }
      } else {
        const value = serializer(stateOrFn);
        setItem(key, value);
      }
    },
    [deserializer, key, serializer],
  );

  return [state ?? getInitialState(initialState), setState];
}

// export default function useLocalStorage<T>(
//   key: string,
//   initialState: T | (() => T),
//   options?: OptionsType<T>,
// ): [T, Dispatch<SetStateAction<T>>] {
//   const value = useSyncExternalStore(
//     subscribe,
//     () => window.localStorage.getItem(key),
//     () => null,
//   );

//   const [state, setState] = useState<T | null>(null);

//   // Set state on client side only
//   useEffect(() => {
//     if (value !== null) {
//       const deserializer =
//         options?.deserializer ?? (JSON.parse as (value: string) => T);
//       setState(deserializer(value));
//     }
//   }, [options?.deserializer, value]);

//   // Trigger on `state` change
//   useEffect(() => {
//     // On initial render it wont add item to localstorage
//     if (state !== null) {
//       const serializer =
//         options?.serializer ?? (JSON.stringify as (value: T) => string);
//       const value = serializer(state);
//       window.localStorage.setItem(key, value);
//     }
//   }, [key, options?.serializer, state]);

//   const memoSetState: Dispatch<SetStateAction<T>> = useCallback((value) => {
//     if (value instanceof Function) {
//       setState((prevState) => {
//         if (prevState !== null) {
//           return value(prevState);
//         }
//         return null;
//       });
//     } else {
//       setState(value);
//     }
//   }, []);

//   return [state ?? getInitialState(initialState), memoSetState];
// }
