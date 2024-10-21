import { useSyncExternalStore } from "react";

function subscribe(onHashChange: () => void) {
  window.addEventListener("hashchange", onHashChange);
  return () => {
    window.removeEventListener("hashchange", onHashChange);
  };
}

export default function useHash() {
  const hash = useSyncExternalStore(
    subscribe,
    () => window.location.hash,
    () => "",
  );

  return hash;
}
